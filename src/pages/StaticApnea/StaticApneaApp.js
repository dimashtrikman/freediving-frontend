import React from 'react';
import Header from '../../components/Header';

export const StaticApneaApp = ({component}) => {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <h1>StaticApneaApp</h1>
        {component}
      </main>
    </>
  );
};

export default StaticApneaApp;
