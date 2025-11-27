import { useState } from 'react';
import logoFinvo from '../../assets/jira_ops.svg';
import './signInForm.css';

const API_BASE_URL = 'http://localhost:8000';

const SignInForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [region, setRegion] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);

    const [statusMessage, setStatusMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatusMessage('Les mots de passe ne correspondent pas.');
            setIsError(true);
            return;
        }

        setLoading(true);
        setStatusMessage('');
        setIsError(false);

        const userData = {
            pseudo,
            name,
            firstname,
            email,
            password,
            age: parseInt(age),
            region,
            gender
        };

        console.log('Données envoyées à l\'API:', { ...userData, password: '***' });

        try {
            const response = await fetch(`${API_BASE_URL}/auth/inscription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pseudo, name, firstname, email, password, age, region, gender }),
            });

            const responseData = await response.json();

            if (response.ok) {
                setStatusMessage('Inscription réussie ! Bienvenue.');
                setIsError(false);
                console.log('Réponse d\'inscription reçue:', responseData);
                setPseudo('');
                setName('');
                setFirstname('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setAge('');
                setRegion('');
                setGender('');
            } else {
                const errorMessage = responseData.detail || 'Erreur lors de l\'inscription.';
                setStatusMessage(`Erreur d'inscription: ${errorMessage}`);
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
        <div className="signin-container">
            <div className="signin-form-section">
                <div className="signin-form-wrapper">

                    <div className="signin-logo-section">
                        <div className="w-[60px] h-[60px] relative overflow-hidden flex justify-center items-center">
                            <img
                                src={logoFinvo}
                                alt="Logo Finvo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="signin-logo-title">
                            Finvo
                        </div>
                    </div>

                    <div className="signin-title-section">
                        <h2 className="signin-title">
                            Créez votre compte
                        </h2>
                        <p className="signin-subtitle">
                            Rejoignez des milliers d'utilisateurs
                        </p>
                    </div>

                    <div className="signin-divider"></div>

                    {statusMessage && (
                        <div className={`w-full p-3 rounded-lg text-sm font-medium ${isError ? 'bg-red-100 text-red-700' : 'bg-[#58C5C3]/10 text-[#142F2C]'}`}>
                            {statusMessage}
                        </div>
                    )}

                    <form onSubmit={handleSignIn} className="signin-form">

                        <div className="signin-form-field full-width">
                            <label htmlFor="pseudo" className="signin-form-label">
                                Pseudo
                            </label>
                            <input
                                id="pseudo"
                                type="text"
                                value={pseudo}
                                onChange={(e) => setPseudo(e.target.value)}
                                required
                                className="signin-form-input"
                                placeholder="Votre pseudo"
                            />
                        </div>

                        <div className="signin-form-field">
                            <label htmlFor="name" className="signin-form-label">
                                Nom
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="signin-form-input"
                                placeholder="Votre nom"
                            />
                        </div>

                        <div className="signin-form-field">
                            <label htmlFor="firstname" className="signin-form-label w-2/5">
                                Prénom
                            </label>
                            <input
                                id="firstname"
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                                className="signin-form-input"
                                placeholder="Votre prénom"
                            />
                        </div>

                        <div className="signin-form-field full-width">
                            <label htmlFor="email" className="signin-form-label">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="signin-form-input"
                                placeholder="votre.email@exemple.com"
                            />
                        </div>

                        <div className="signin-form-field">
                            <label htmlFor="password" className="signin-form-label">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="signin-form-input"
                                placeholder="********"
                            />
                        </div>

                        <div className="signin-form-field">
                            <label htmlFor="confirmPassword" className="signin-form-label">
                                Confirmez le mot de passe
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="signin-form-input"
                                placeholder="********"
                            />
                        </div>

                        <div className="signin-form-field">
                            <label htmlFor="age" className="signin-form-label">
                                Âge
                            </label>
                            <input
                                id="age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                                min="18"
                                max="120"
                                className="signin-form-input"
                                placeholder="18"
                            />
                        </div>

                        <div className="signin-form-field">
                            <label htmlFor="region" className="signin-form-label">
                                Région
                            </label>
                            <input
                                id="region"
                                type="text"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                required
                                className="signin-form-input"
                                placeholder="Votre région"
                            />
                        </div>

                        <div className="signin-form-field">
                            <label htmlFor="gender" className="signin-form-label">
                                Genre
                            </label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                                className="signin-form-input"
                            >
                                <option value="">Sélectionnez votre genre</option>
                                <option value="male">Homme</option>
                                <option value="female">Femme</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="signin-submit-button"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-[#142F2C]" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "S'inscrire"
                            )}
                        </button>
                    </form>

                    <div className="signin-divider"></div>

                    <div className="signin-login-section">
                        <span className="signin-login-text">
                            Vous avez déjà un compte ?
                        </span>
                        <a href="/login" className="signin-login-link">
                            Se connecter
                        </a>
                    </div>

                </div>
            </div>

            <div className="signin-hero-section">
                <div className="signin-hero-content">
                    <h1 className="signin-hero-title">
                        La banque,<br />simplifiée
                    </h1>
                    <p className="signin-hero-description">
                        Dashboard tout en un pour le paiement et suivre vos transactions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
