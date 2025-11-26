import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [message, setMessage] = useState('Chargement...');

  useEffect(() => {
    fetch('/users/bonjour')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.message); 
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        setMessage('Erreur de connexion à l\'API.');
      });
  }, []);

  return <h1>Message de FastAPI: {message}</h1>;
}

export default App
