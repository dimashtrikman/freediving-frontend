import React from 'react';
import Header from '../../components/Header';

export const LessonsPage = ({component}) => {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <h1>LessonsPage</h1>
        {component}
      </main>
    </>
  );
};

export default LessonsPage;
