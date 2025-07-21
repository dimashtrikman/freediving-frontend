import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthStore from '../stores/AuthStore';

export const PaypalCheckoutButton = ({ amount = '49.99' }) => {
  const paypalRef = useRef(null);
  const navigate = useNavigate();
  const currentUser = AuthStore.user;

  useEffect(() => {
    let isMounted = true;
    let paypalButtonsInstance;

    const loadPayPalScript = () => {
      return new Promise((resolve, reject) => {
        if (window.paypal) return resolve();

        const existingScript = document.querySelector(
          'script[src*="paypal.com/sdk/js"]'
        );
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve());
          return;
        }

        const script = document.createElement('script');
        script.src =
          'https://www.paypal.com/sdk/js?client-id=AfpFi7maHwhLSRYVcbioiOYTE-5lhKQcuOePnoNx1oNq2PoczNxja5K-0zFDBY888o2bn4afNa85Y4sd&currency=USD';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve();
        script.onerror = () => reject('Ошибка загрузки PayPal SDK');
        document.body.appendChild(script);
      });
    };

    const initializeButton = () => {
      const container = paypalRef.current;
      if (!container || !window.paypal) return;

      container.innerHTML = '';

      paypalButtonsInstance = window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            // Отправка данных об оплате на сервер
            fetch(`${process.env.REACT_APP_SERVER_API_URL}/payment/success`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                orderId: details.id,
                payerId: data.payerID,
                payerEmail: details.payer.email_address,
                userEmail: currentUser?.email,
                amount: details.purchase_units[0].amount.value,
                currency: details.purchase_units[0].amount.currency_code,
              }),
            })
              .then(() => {
                if (isMounted) navigate('/dashboard');
              })
              .catch((err) => {
                console.error('Ошибка при отправке на сервер:', err);
                alert('Оплата прошла, но возникла ошибка на сервере.');
              });
          });
        },
        onError: (err) => {
          console.error('PayPal Error:', err);
          if (isMounted) alert('Что-то пошло не так.');
        },
      });

      paypalButtonsInstance.render(container).catch((err) => {
        console.error('PayPal render error:', err);
      });
    };

    loadPayPalScript()
      .then(() => {
        if (isMounted) initializeButton();
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      isMounted = false;
      try {
        paypalButtonsInstance?.close?.();
      } catch (e) {
        console.warn('PayPal cleanup error:', e);
      }
    };
  }, [amount, navigate, currentUser]);

  return <div className="paypal-button-container" ref={paypalRef}></div>;
};
