import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="header">
      <Link to="/" className="header-link">
        Freediving course
      </Link>

      <div className="burger-container">
        <button className="burger" onClick={toggleMenu}>
          ☰
        </button>

        {menuOpen && (
          <nav className="dropdown-menu">
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/payment" onClick={() => setMenuOpen(false)}>Payment</Link>
            <Link to="/lessons" onClick={() => setMenuOpen(false)}>Lessons</Link>
            <Link to="/final-test" onClick={() => setMenuOpen(false)}>Final Test</Link>
            <Link to="/marketing" onClick={() => setMenuOpen(false)}>Marketing</Link>
            <Link to="/static-apnea" onClick={() => setMenuOpen(false)}>Static Apnea</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
