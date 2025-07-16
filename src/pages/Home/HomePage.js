import { NavLink } from 'react-router-dom';
import logo from '../../assets/molchanovs_logo.png';
import Header from '../../components/Header'; 

export const HomePage = () => {
  
    return (
    <>
     <Header />
    <div className="home-container">
      <div className="home-card">
        <header className="home-header">
          <img src={logo} alt="Логотип платформы" className="home-logo" />
          <h1>Добро пожаловать на нашу обучающую платформу!</h1>
          <p>
            Погрузитесь в мир знаний и начните обучение с бесплатного демо-доступа.
          </p>
          <div className="home-buttons">
            <NavLink to="/login" className="btn btn-primary">Начать обучение</NavLink>
            <NavLink to="/forum" className="btn btn-secondary" style={{marginLeft: 8}}>Forum Chat</NavLink>
          </div>
        </header>
      </div>
    </div>
    </>
    )
}

export default HomePage;