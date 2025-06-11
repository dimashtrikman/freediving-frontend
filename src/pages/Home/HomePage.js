
import { NavLink } from 'react-router-dom';
import logo from '../../assets/molchanovs_logo.png';

export const HomePage = () => {
    return (
    <>
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="Логотип платформы" className="home-logo" />
        <h1>Добро пожаловать на нашу обучающую платформу!</h1>
        <p>
          Погрузитесь в мир знаний и начните обучение с бесплатного демо-доступа.
        </p>
        <div className="home-buttons">
          <NavLink to="/login" className="btn btn-primary">Начать обучение</NavLink>
        </div>
      </header>
    </div>
    </>
    )
}

export default HomePage;