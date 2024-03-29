import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Entete from '../Entete/Entete';
import Accueil from '../Accueil/Accueil';
import ListeFilms from '../ListeFilms/ListeFilms';
import Film from '../Film/Film';
import Admin from '../Admin/Admin';
import FormFilm from '../FormFilm/FormFilm';
import Page404 from '../Page404/Page404';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import './App.css';

export const AppContext = React.createContext();

function App() {

  const location = useLocation();

  // Variable contenant l'état de connexion
  const [estConnecte, setConnexion] = useState(false);

  // Vérification de la validité
  useEffect(() => {
    if(localStorage.getItem("api-film")) {
      // On vérifie a chaque changement dans la page si notre jeton est valide
      setConnexion(jetonValide());
    }
  },[]);

  // Gestion du login
  async function login(e) {
    // Si on est connecté et qu'on appuie sur le button    
    e.preventDefault();
    const form = e.target;

    if (form.dataset.connexion === "false") {
        const body = {
          courriel: form.courriel.value,
          mdp: form.mdp.value,
        };
    
        const data = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
        }
        const reponse = await fetch('http://localhost:3301/api/utilisateurs/connexion', data);
        const token = await reponse.json();
    
        // Si la reponse est valide, on alors créé le api-film dans le stockage local avec notre jeton et la connexion est true
        if (reponse.status === 200) {
          localStorage.setItem("api-film", token);
          setConnexion(true);
        }
        form.reset();
    } else {
      // Si la reponse est invalide, on vide le stockage local la connexion est false
      setConnexion(false);
      localStorage.removeItem("api-film");
      return;
    }
  }


  // Gestion du jeton
  function jetonValide() {
    try {
      const token = localStorage.getItem("api-film");
      const decode = jwtDecode(token);

      // On vérifie si notre jeton est expiré
      if (Date.now() < decode.exp * 1000) {
        return true;
      } else {
        // Si le jeton est invalide, on enleve le jeton du storage
        localStorage.removeItem("api-film");
        return false;
      }
    } catch(erreur) {
      return false;
    }
  }


  // Gestion du logout
  function logout(e) {
    e.preventDefault();

    // Nettoyage du localStorage
    localStorage.removeItem("api-film");
    setConnexion(false);
  }

  return (
    <AppContext.Provider value={estConnecte}>
        <Entete handleLogin={login} handleLogout={logout}/>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route element={<PrivateRoute />}>
                <Route path="/admin"  element={<Admin />}/>
                <Route path="/admin/ajout-film" element={<FormFilm />}/>
            </Route>
            <Route path="/" className="active" element={<Accueil />} />
            <Route path="/liste-films" className="active" element={<ListeFilms />} />
            <Route path="/film/:id" element={<Film />}/>
            <Route path="/*" element={<Page404 />}/>
            <Route path="/admin" element={estConnecte ? <Admin /> : <Navigate to="/" />}/>
          </Routes>
        </AnimatePresence>
    </AppContext.Provider>
  );
}

export default App;