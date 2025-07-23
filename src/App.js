import './App.css';
import { useEffect } from 'react';
import AuthStore from './stores/AuthStore';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import {LoginPage} from './pages/Auth/LoginPage';
import {RegisterPage} from './pages/Auth/RegisterPage';
import {DemoAccessPage} from './pages/DemoAccess/DemoAccessPage';
import {DashboardPage} from './pages/Dashboard/DashboardPage';
import {LessonsPage} from './pages/Lessons/LessonsPage';
import {LessonPage} from './pages/Lessons/LessonPage';
import {QuizPage} from './pages/Quiz/QuizPage';
import {FinalTestPage} from './pages/FinalTest/FinalTestPage';
import {MarketingPage} from './pages/Marketing/MarketingPage';
import {StaticApneaApp} from './pages/StaticApnea/StaticApneaApp';
import {PaymentPage} from './pages/Payment/PaymentPage';
import {NotFoundPage} from './pages/NotFoundPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import PrivateRoute from './components/PrivateRoute';
import Forum from './components/Forum';


function App() {
  const location = useLocation();

  useEffect(() => {
    // Clear auth error on route change
    AuthStore.clearError();
  }, [location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/demo" element={<DemoAccessPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
           <PrivateRoute>
              <PaymentPage />
           </PrivateRoute>
          }
        />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/final-test" element={<FinalTestPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/static-apnea" element={<StaticApneaApp />} />
        <Route
          path="/forum"
          element={
            <PrivateRoute>
              <Forum />
            </PrivateRoute>
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </div>
  );
}

export default App;
