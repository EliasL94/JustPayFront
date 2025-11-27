import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoFinvo from '../../assets/jira_ops.svg';
import loginBackground from '../../assets/loginBackground.png';
import './loginForm.css';

const API_BASE_URL = 'http://127.0.0.1:8000';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');
    setIsError(false);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/connexion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatusMessage('Connexion réussie ! Redirection...');
        setIsError(false);
        console.log('Réponse de connexion reçue:', responseData);

        if (responseData.token) {
          localStorage.setItem('token', responseData.token);

          try {
            const meResponse = await fetch('http://127.0.0.1:8000/auth/me', {
              headers: {
                'Authorization': `Bearer ${responseData.token}`
              }
            });

            if (meResponse.ok) {
              const userData = await meResponse.json();
              console.log('Données utilisateur reçues:', userData);
              if (userData.id) {
                localStorage.setItem('user_id', userData.id);
              }
            } else {
              console.error('Erreur lors de la récupération des infos utilisateur');
            }
          } catch (error) {
            console.error('Erreur lors de l\'appel à /me:', error);
          }
        } else {
          console.error('Aucun token trouvé dans la réponse !');
        }

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        const errorMessage = responseData.detail || 'Identifiants ou mot de passe incorrects.';
        setStatusMessage(`Erreur de connexion: ${errorMessage} `);
        setIsError(true);
      }

    } catch (error) {
      console.error('Erreur réseau ou traitement:', error);
      setStatusMessage('Erreur réseau : Impossible de contacter le serveur FastAPI.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="login-form-wrapper">

          <div className="login-logo-section">
            <div className="w-[89.63px] h-[89.63px] relative overflow-hidden flex justify-center items-center">
              <img
                src={logoFinvo}
                alt="Logo Finvo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="logo-title">
              Finvo
            </div>
          </div>

          <div className="login-title-section">
            <h2 className="login-title">
              Content de vous revoir !
            </h2>
            <p className="login-subtitle">
              Connectez vous à votre compte
            </p>
          </div>

          <div className="login-divider"></div>

          {statusMessage && (
            <div className={`w-full p-3 rounded-lg text-sm font-medium ${isError ? 'bg-red-100 text-red-700' : 'bg-[#58C5C3]/10 text-[#142F2C]'}`}>
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">

            <div className="form-field">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                placeholder="votre.email@exemple.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="********"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-[#142F2C]" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Se connecter'
                )}
              </button>
              <a href="#" className="forgot-password-link">
                Mot de passe oublié ?
              </a>
            </div>
          </form>

          <div className="login-divider"></div>

          <div className="signup-section">
            <span className="signup-text">
              Pas encore de compte ?
            </span>
            <a href="/signup" className="signup-link">
              Ouvrez un compte
            </a>
          </div>

        </div>
      </div>

      <div
        className="login-image-section"
      >
        <img
          src={loginBackground}
          alt="Décoration Financière"
          className="login-background-image"
        />
      </div>
    </div>
  );
};

export default LoginForm;