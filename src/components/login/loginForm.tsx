import { useState } from 'react';

const API_BASE_URL = '';

const FinvoLogo = () => (
  <div className="w-[89.63px] h-[89.63px] relative overflow-hidden flex justify-center items-center">
    <img
      src="src/assets/jira_ops.svg"
      alt="Logo Finvo"
      className="w-full h-full object-contain"
    />
  </div>
);


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');
    setIsError(false);

    const credentials = { email, password };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/connexion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatusMessage('Connexion réussie ! Bienvenue.');
        setIsError(false);
        console.log('Réponse de connexion reçue:', responseData);
        setEmail('');
        setPassword('');
      } else {
        const errorMessage = responseData.detail || 'Identifiants ou mot de passe incorrects.';
        setStatusMessage(`Erreur de connexion: ${errorMessage}`);
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
    <div className="min-h-screen w-full flex flex-row bg-white font-sans">

      <div className="w-1/2 flex justify-center items-center p-8 lg:p-16">

        <div
          className="w-[341.83px] flex flex-col justify-start items-start gap-6"
          style={{
            maxWidth: '100%',
            minWidth: '341.83px'
          }}
        >

          <div className="flex items-center gap-[11.95px] py-3">
            <FinvoLogo />
            <div className="text-[47.80px] font-semibold text-[#142F2C] uppercase leading-[76.48px] font-['PolySans_Qonto']">
              Finvo
            </div>
          </div>

          <div className="self-stretch flex flex-col justify-start items-start gap-4 py-4">
            <h2 className="self-stretch text-2xl font-bold text-[#142F2C] leading-[33.60px]">
              Content de vous revoir !
            </h2>
            <p className="self-stretch text-base font-semibold text-[#142F2C] leading-[22.40px]">
              Connectez vous à votre compte
            </p>
          </div>

          <div className="self-stretch border-t border-[#142F2C]/50 my-2"></div>

          {statusMessage && (
            <div className={`w-full p-3 rounded-lg text-sm font-medium ${isError ? 'bg-red-100 text-red-700' : 'bg-[#58C5C3]/10 text-[#142F2C]'}`}>
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">

            {/* Champ Email */}
            <div className="w-full flex flex-col justify-end items-start gap-[6.71px] py-2">
              <label htmlFor="email" className="block text-[11.75px] font-semibold text-[#2D3648] leading-[13.42px] uppercase">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[40.27px] px-4 py-3 border border-[#CBD2E0] rounded-[5.03px] outline-none focus:ring-1 focus:ring-[#58C5C3]"
                placeholder="votre.email@exemple.com"
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="w-full flex flex-col justify-end items-start gap-[6.71px] py-2">
              <label htmlFor="password" className="block text-[11.75px] font-semibold text-[#2D3648] leading-[13.42px] uppercase">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[40.27px] px-4 py-3 border border-[#CBD2E0] rounded-[5.03px] outline-none focus:ring-1 focus:ring-[#58C5C3]"
                placeholder="********"
              />
            </div>

            {/* Bouton Se connecter + Mot de passe oublié */}
            <div className="inline-flex justify-start items-center gap-[20.63px] pt-4 py-3">
              <button
                type="submit"
                disabled={loading}
                className="w-[114.43px] px-[17.47px] py-[11.65px] bg-[#58C5C3] hover:bg-[#459998] text-[#142F2C] font-bold text-[13.10px] rounded-[4.37px] shadow-md transition disabled:opacity-50 flex justify-center items-center leading-[17.47px]"
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
              <a href="#" className="text-center text-[#A0ABC0] text-[7.86px] font-normal leading-[11.79px] hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
          </form>

          <div className="self-stretch border-t border-[#142F2C]/50 my-2"></div>

          {/* Lien d'inscription */}
          <div className="w-[231.32px] inline-flex justify-start items-center gap-[20.63px] text-[7.86px] leading-[11.79px] py-3">
            <span className="text-center text-[#A0ABC0] font-normal">
              Pas encore de compte ?
            </span>
            <a href="#" className="text-center text-[#3F9392] font-normal hover:underline">
              Ouvrez un compte
            </a>
          </div>

        </div>
      </div>

      <div
        data-layer="Frame 14"
        className="w-1/2 flex relative overflow-hidden min-h-screen"
      >
        <img
          src="/src/assets/loginBackground.png"
          alt="Décoration Financière"
          className="w-full h-full object-cover"
        />

        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #459998 100%)',
            opacity: 0.9
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoginForm;