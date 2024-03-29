import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppContext } from '../App/App';
import './Entete.css';

function Entete(props) {

  const context = useContext(AppContext);
  const location = useLocation();

  // Si la page est l'accueil, le header sera modifié
  const estAccueil = location.pathname === "/" ? true : false; 

  return (
    <header className={estAccueil ? "accueil-header" : ""}>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Accueil</NavLink>
                </li>
                <li>
                    <NavLink to="/liste-films">Liste des Films</NavLink>
                </li>
                {context ?
                    <div className='entete-prive'>
                        <li>
                            <NavLink to="/admin/ajout-film">
                                Ajouter un film
                            </NavLink>
                        </li>
                    </div> : 
                    ''
                }
                <form className="form-login" data-connexion={context} onSubmit={props.handleLogin}>
                    {!context ? <input type='text' name="courriel" placeholder="Courriel" ></input> : ""}
                    {!context ? <input type='password' name="mdp" placeholder="Mot de passe" ></input> : ""}
                    <button>{context ? "Logout" : "Login"}</button>
                </form>
            </ul>
        </nav>
    </header>
  );
}

export default Entete;
