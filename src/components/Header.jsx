import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem('token');
    setMenuOpen(false);
    // Перенаправляем на главную или страницу логина
    navigate('/');
  };

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
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/demo" onClick={() => setMenuOpen(false)}>Demo Access</Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/payment" onClick={() => setMenuOpen(false)}>Payment</Link>
            <Link to="/lessons" onClick={() => setMenuOpen(false)}>Lessons</Link>
            <Link to="/final-test" onClick={() => setMenuOpen(false)}>Final Test</Link>
            <Link to="/marketing" onClick={() => setMenuOpen(false)}>Marketing</Link>
            <Link to="/static-apnea" onClick={() => setMenuOpen(false)}>Static Apnea</Link>
            <button
              onClick={handleLogout}
              className="logout-button"
              style={{ cursor: 'pointer', marginTop: '10px', background: 'none', border: 'none', color: 'red' }}
            >
              Log Out
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
