import React from 'react';
import Header from '../../components/Header';

export const DashboardPage = () => {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </main>
    </>
  );
};

export default DashboardPage;
