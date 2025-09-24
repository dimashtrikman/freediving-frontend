import React from 'react';
import Header from '../../components/Header';

export const FinalTestPage = ({component}) => {
  return (
    <>
      <title>Final test — Freediving</title>
      <meta name="robots" content="noindex, nofollow" />
      <Header />
      <main className="dashboard-main">
        <h1>FinalTestPage</h1>
        {component}
      </main>
    </>
  );
};

export default FinalTestPage;
