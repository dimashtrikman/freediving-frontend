import React from 'react';
import Header from '../../components/Header';

export const DashboardPage = ({component}) => {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        {component}
      </main>
    </>
  );
};

export default DashboardPage;
