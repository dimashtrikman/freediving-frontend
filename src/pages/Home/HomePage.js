import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import logo from '../../assets/molchanovs_logo.png';
import Header from '../../components/Header';
import AuthStore from '../../stores/AuthStore';

export const HomePage = observer(() => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (AuthStore.isAuth) {
      navigate('/dashboard'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <header className="home-header">
          <img src={logo} alt="Логотип платформы" className="home-logo" />
          <h1>Добро пожаловать на нашу обучающую платформу!</h1>
          <p>
            Погрузитесь в мир знаний и начните обучение с бесплатного демо-доступа.
          </p>
          <div className="home-buttons">
            <button onClick={handleStartClick} className="btn btn-primary">
              Начать обучение
            </button>
          </div>
        </header>
      </div>
    </>
  );
});

export default HomePage;
