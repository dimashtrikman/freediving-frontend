import React from 'react';
import Header from '../../components/Header';

export const FinalTestPage = ({component}) => {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <h1>FinalTestPage</h1>
        {component}
      </main>
    </>
  );
};

export default FinalTestPage;
