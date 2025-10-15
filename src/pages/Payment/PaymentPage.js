import React from 'react';
import Header from '../../components/Header';
import { PaypalCheckoutButton } from '../../components/PaypalCheckoutButton';

export const PaymentPage = () => {


  return (
    <>
    <title>Payments — Freediving</title>
    <meta name="robots" content="noindex, nofollow" />
    <Header />
    <div className="payment-container">
      <h1 className="payment-title">Курс по фридайвингу</h1>
      <p className="payment-description">
        Освой базовые и продвинутые техники задержки дыхания, расслабления и ныряния на глубину.
        Видеоуроки, тренировки и тесты — всё включено.
      </p>
      <p className="payment-price">Цена: <strong>$99.99</strong></p>

      <div className="payment-buttons">
        <PaypalCheckoutButton amount="99.99" />
      </div>
    </div>
    </>
  );
};

export default PaymentPage;
