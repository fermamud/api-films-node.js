import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App/App';
import { motion } from 'framer-motion';
import Note from '../Note/Note'; 
import Commentaires from '../Commentaires/Commentaires';
import './Film.css';

function Film() {

    const context = useContext(AppContext);

    // Recuperer l'id du film
    const filmId = useParams();
    const urlFilm = `https://demo-en-classe.onrender.com/api/films/${filmId.id}`;
    
    // Recuperer les infos du film
    const [infoFilm, setInfoFilm] = useState({});
    const [nbVotes, setNbVote] = useState('Aucun vote enregistré');
    const [average, setAverage] = useState(0); 
    
    useEffect(() => {
        fetch(urlFilm)
        .then((reponse) => reponse.json())
        .then((data) => {
            setInfoFilm(data);
            if (data.notes) {
                setNbVote(data.notes.length);
                setMoyenne(data.notes, data.notes.length);
            }
        });
    }, [urlFilm]);
    
    // Gestion affichage des genres
    const tableauGenres = infoFilm.genres || []; 
    const genres = tableauGenres.join(', ');

    // Gestion de calcul de moyenne de vote
    function setMoyenne(tableauNotes, nbNotesDonnees) {
        const total = tableauNotes.reduce((somme, note) => {
            return somme += note;
        }, 0);

        const average = (total / nbNotesDonnees).toFixed(2);
        setAverage(average);
    }
    
    // Appel async pour les notes e les commentaires
    async function appelAsync(array, cle) {
        // Requete pour la creation de "notes" ou "commentaires" dans la BD avec les donnees passé en parametre
        const requestBody = { [cle]: array };

        const oOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }

        // Execution d'appel fetch pour l'insertion des "notes" ou "commentaires" 
        let putInfo = await fetch(urlFilm, oOptions),
        getFilm = await fetch(urlFilm);

        Promise.all([putInfo, getFilm])
            .then((reponse) => reponse[1].json())
            .then((data) => {
                setInfoFilm(data);
                if (data.notes) {
                    setNbVote(data.notes.length);
                    setMoyenne(data.notes, data.notes.length);
                }
            })
    }

    // Function pour soumettre une note
    async function soumettreNote(note) {
        let aNotes;

        if(!infoFilm.notes) {
            aNotes = [note];  
        } else {
            aNotes = infoFilm.notes;
            aNotes.push(note);
        }

        appelAsync(aNotes, 'notes');
    }

    // Function pour soumettre un commentaire
    async function soumettreCommentaire(event) {
        let aCommentaires;

        if(!infoFilm.commentaires) { 
            aCommentaires = [{ commentaire: event, usager: context.usager}];  
        } else {
            aCommentaires = infoFilm.commentaires;
            aCommentaires.push({ commentaire: event, usager: context.usager });
        }

        appelAsync(aCommentaires, 'commentaires');
    }

    // Gestion affichage des commentaires
    const tableauCommentaires = infoFilm.commentaires || [];
    const chaqueCommentaire = tableauCommentaires.map((chaque, index) => {
        return  <div className="commentaire" key={index}>
                    <p className="m-normal"><strong>Auteur : </strong>{chaque.usager}</p>
                    <p className="m-normal"><strong>Commentaire : </strong>{chaque.commentaire}</p>
                </div>
    }); 

    // Transition d'animation
    const transition = { duration: 1.5, ease: 'easeInOut' };

    return (
        <main>
            <motion.div
                key='film'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 , transition }}
                exit={{ opacity: 1, transition }}
                className="container-info-film pt-normal pb-normal"
            >
                <div className="info-film">
                    <p className="info-film__genre">{genres}</p>
                    <p className="info-film__titre"><strong>{infoFilm.titre}</strong></p>
                    <p className="info-film__realisation"><strong>{infoFilm.realisation}</strong></p>
                    <p><strong>{infoFilm.annee}</strong></p>
                    <p>{infoFilm.description}</p>
                </div>
                <img className="image" src={`/img/${infoFilm.titreVignette}`} alt={infoFilm.titre} />
            </motion.div>

            <Note handleVote={nbVotes} handleAverage={average} handleNote={soumettreNote} />
            <div className="blocCommentaire mt-small mb-small">
                {(context.estLog) ?
                    <Commentaires handleCommentaire={soumettreCommentaire} /> :
                    ''
                }
            </div>
            <div className="commentaires">
                {chaqueCommentaire}
            </div>
        </main>
    )
}

export default Film;
