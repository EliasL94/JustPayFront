import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import SignIn from './pages/signin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
