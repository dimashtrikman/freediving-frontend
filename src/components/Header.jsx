import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        Freediving course
      </Link>
    </header>
  );
};

export default Header;
