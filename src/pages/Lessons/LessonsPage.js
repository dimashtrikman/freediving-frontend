import React from 'react';
import Header from '../../components/Header';

export const LessonsPage = ({component}) => {
  return (
    <>
      <title>Lessons — Freediving</title>
      <meta name="robots" content="noindex, nofollow" />
      <Header />
      <main className="dashboard-main">
        <h1>LessonsPage</h1>
        {component}
      </main>
    </>
  );
};

export default LessonsPage;
