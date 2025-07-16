import React from 'react';
import Header from '../../components/Header';
import { NavLink } from 'react-router-dom';

export const DashboardPage = ({component}) => {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <div style={{ margin: '24px 0' }}>
          <NavLink to="/forum" className="btn btn-secondary">Forum Chat</NavLink>
        </div>
        {component}
      </main>
    </>
  );
};

export default DashboardPage;
