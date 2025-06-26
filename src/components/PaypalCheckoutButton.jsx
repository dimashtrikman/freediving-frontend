import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const PaypalCheckoutButton = ({ amount = '49.99' }) => {
  const paypalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const container = paypalRef.current;

    if (container && container.children.length > 0) {
      container.innerHTML = '';
    }

    if (!window.paypal) return;

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(() => {
          navigate('/dashboard');
        });
      },
      onError: err => {
        console.error('PayPal Error:', err);
        alert('Что-то пошло не так.');
      }
    }).render(container);

  }, [amount, navigate]);

  return (
    <div className="paypal-button-container" ref={paypalRef}></div>
  );
};
