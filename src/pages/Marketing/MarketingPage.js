import React from 'react';
import Header from '../../components/Header';

export const MarketingPage = ({component}) => {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <h1>MarketingPage</h1>
        {component}
      </main>
    </>
  );
};

export default MarketingPage;
