import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AuthStore from '../../stores/AuthStore';

export const HomePage = observer(() => {
  const navigate = useNavigate();

  const authStore = AuthStore;

  const handleStartClick = () => {
    if (AuthStore.isAuth) {
      navigate('/dashboard'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <>
      <section className="hero">
        {/* <Header /> */}
        <header className="hero__header">
          <div className="hero__logo">
            <p className="hero__logo-top">online course T1</p>
            <p className="hero__logo-bottom">MOLCHANOVS</p>
            <p className="hero__logo-bottom">FREEDIVING</p>
          </div>

          <nav className="hero__nav">
            <button className="nav-link">Services</button>
            <button className="nav-link">Benefits</button>
            <button className="nav-link">Process</button>
          </nav>

          <div className="hero__controls">
            <div className="hero__lang">
              <button className="lang" type="button">EN</button>
              <span className="lang__separator">|</span>
              <button className="lang lang--active" type="button">RU</button>
            </div>
            <button className="nav-link hero__login">Log in</button>
          </div>
        </header>

        {authStore?.isAuth && authStore.user && (
          <div className="user-status">
            👤 {authStore.user.email} |{" "}
            {authStore.user.hasAccess ? "✅ Доступ оплачен" : "⛔ Без доступа"}
          </div>
        )}

        <div className="hero__content">
          <div className="hero__left">
            <div className="hero__circle hero__circle--outer"></div>
            <div className="hero__circle hero__circle--inner"></div>
            <div className="hero__content__block">
              <h1 className="hero__title">
                Dive into the world <br />
                of freediving — <br />
                start right now
              </h1>
              <p className="hero__description">
                <span>Discover the world of freediving with our online platform!</span>
                <span>Get access to educational videos, interactive assignments, and special breath-hold training.</span>
              </p>            
            </div>
          </div>
        </div>
        <div className="hero__cta-wrapper">
           <button onClick={handleStartClick} className="hero__cta">START TRAINING</button>
           <p className="hero__subtitle">The first lesson is free.</p>
        </div>
      </section>
    </>
  );
});

export default HomePage;
