import './App.css';
import './style.css';
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
import Messenger from './pages/Messenger/Messenger';



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
        <Route path="/demo" 
          element={
            <PrivateRoute>
              <DemoAccessPage />
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
        <Route
          path="/dashboard"
          element={
            <PrivateRoute requireAccess={true}>
              <DashboardPage component={<Forum />}/>
            </PrivateRoute>
          }
        />
        <Route
          path="/lessons"
          element={
            <PrivateRoute requireAccess={true}>
              <LessonsPage component={<LessonPage />}/>
            </PrivateRoute>
          }
        />
        <Route
          path="/lesson/:id"
          element={
            <PrivateRoute requireAccess={true}>
              <LessonPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:id"
          element={
            <PrivateRoute requireAccess={true}>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/final-test"
          element={
            <PrivateRoute requireAccess={true}>
              <FinalTestPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/marketing"
          element={
            <PrivateRoute requireAccess={true}>
              <MarketingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/static-apnea"
          element={
            <PrivateRoute requireAccess={true}>
              <StaticApneaApp />
            </PrivateRoute>
          }
        />
                <Route
          path="/messenger"
          element={
            <PrivateRoute requireAccess={true}>
              <Messenger />
            </PrivateRoute>
          }
        />
        <Route path="*" element={
          <NotFoundPage />
        } />
      </Routes>
    </div>
  );
}

export default App;
