import React from 'react';
import Header from '../../components/Header';

export const DemoAccessPage = ({component}) => {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <h1>DemoAccessPage</h1>
        {component}
      </main>
    </>
  );
};

export default DemoAccessPage;
