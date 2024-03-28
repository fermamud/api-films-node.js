import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ModifierFormFilm.css';

function ModifierFormFilm() {

    const navigate = useNavigate(); 

    const filmId = useParams();
    const urlFilm = `https://demo-en-classe.onrender.com/api/films/${filmId.id}`;
    const [infoFilm, setInfoFilm] = useState({});
    
    //const [messageErreur, setMessageErreur] = useState('');

    console.log(filmId);
    
    useEffect(() => {
        fetch(urlFilm)
        .then((reponse) => reponse.json())
        .then((data) => {
            console.log(data);
            setInfoFilm(data);
        });
    }, []);

    function onFormDataChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        const donneeModifiee = {...infoFilm, [name]:value};
        setInfoFilm(donneeModifiee);
    }

    async function onFormSubmit(e) {
        console.log('entrei aqui');
        e.preventDefault();

        // Prépare la donnée
        const data = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("api-film")}`
            },
            body: JSON.stringify(infoFilm)
        };

        const request = await fetch(`http://localhost:3301/api/films/${filmId.id}`, data);
        const response = await request.json();

        if (request.status === 200) {
            navigate("/admin/ajout-film");
            console.log("SUPER");
            // setMessageErreur('Modification Réussie');
        } else {
            const messageErreur = response.message;
            console.log("erreur", messageErreur);
        }
    }

    return(
        <main>
        <div className="wrapper">
            <h1>Modifierr un film</h1>
            <form onSubmit={onFormSubmit}>
                <div className="input-group">
                    <label htmlFor="titre">Titre</label>
                    <input type="text" id="titre" name="titre" required minLength="1" maxLength="150" value={infoFilm.titre} onChange={onFormDataChange}></input>
                    <span className="error-message">Titre est requis</span>
                </div>
                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" id="description" name="description"  required minLength="1" maxLength="500" value={infoFilm.description} onChange={onFormDataChange}></textarea>
                    <span className="error-message">Description est requis</span>
                </div>
                <div className="input-group">
                    <label htmlFor="realisation">Realisation</label>
                    <input type="text" id="realisation" name="realisation" required minLength="1" maxLength="150" value={infoFilm.realisation} onChange={onFormDataChange}></input>
                    <span className="error-message">Realisation est requis</span>
                </div>
                <div className="input-group">
                    <label htmlFor="annee">Année</label>
                    <input type="text" id="annee" name="annee"  required minLength="1" maxLength="4" value={infoFilm.annee} onChange={onFormDataChange}></input>
                    <span className="error-message">Année est requis</span>
                </div>
                <input type="submit" value="Envoyer" ></input>
            </form>
            {/* <div>
                {messageErreur}
            </div> */}
        </div>
    </main>
    );
}

export default ModifierFormFilm;