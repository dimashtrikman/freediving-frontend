import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AuthStore from '../stores/AuthStore';

const Header = observer(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStore = AuthStore;
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleLogout = () => {
    authStore?.logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="header-link">
        Freediving course
      </Link>

      {authStore?.isAuth && authStore.user && (
        <div className="user-status">
          👤 {authStore.user.email} |{" "}
          {authStore.user.hasAccess ? "✅ Доступ оплачен" : "⛔ Без доступа"}
        </div>
      )}

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
            <Link to="/messenger" onClick={() => setMenuOpen(false)}>Meesenger</Link>

            {authStore?.isAuth && (
              <button
                onClick={handleLogout}
                className="logout-button"
              >
                Log Out
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
});

export default Header;
