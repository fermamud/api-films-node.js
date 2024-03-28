// import { Form } from "react-router-dom";
import './FormFilm.css';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// baixar react developer tools

function FormFilm() {

    const location = useLocation();
    const id = location.state;
    console.log(location.state);

    useEffect(() => {
        if (id !== null) {
            console.log('yes baby');
            const urlFilm = `https://demo-en-classe.onrender.com/api/films/${id}`;
    
            fetch(urlFilm)
            .then((reponse) => reponse.json())
            .then((data) => {
                console.log(data);
                setFormData(data);
            });  
        }
    }, [id]);

    const [formData, setFormData] = useState({
        titre: "",
        description: "",
        realisation: "",
        annee: "",
        genres: [],
        titreVignette: "vide.jpg"
    });

    const genres = [
        "Action",
        "Aventure",
        "Comédie",
        "Drame",
        "Fantaisie",
        "Horreur",
        "Policier",
        "Science-fiction",
        "Thriller",
        "Western"
    ];

    const [formValidity, setFormValidity] = useState("invalid");
    // const navigate = useNavigate();

    function onFormDataChange(evenement) {
        const name = evenement.target.name;
        const value = evenement.target.value;
        // const {name, value} = evenement.target;

        if (name.startsWith("genre")) {
            const estCoche = evenement.target.checked;
            let genres = formData.genres || [];

            // Si on decoche, on enleve
            if (!estCoche && genres.includes(value)) {
                genres = genres.filter((genre, index) => {
                    return genre !== value;
                })
            } else if (estCoche && !genres.includes(value)) {
                genres.push(value);
            }
            const donneeModifiee = {...formData, "genres":genres};
            setFormData(donneeModifiee);
        } else if (name === "titreVignette") {
            const nomFichier = evenement.target.files[0].name;
            // como ele fez na aula
            // const donneeModifiee = {...formData, titreVignette: nomFichier};
            const donneeModifiee = {...formData, [name]:nomFichier}; //teste Fernanda
            setFormData(donneeModifiee);
        } else {
            const estValide = evenement.target.form.checkValidity() ? "valid" : "invalid";
            setFormValidity(estValide);
            
            // On clone la donnee dans un nouvel objet
            const donneeModifiee = {...formData, [name]:value};
            setFormData(donneeModifiee);
        }
            
    }

    async function onFormSubmit(evenement) {
        evenement.preventDefault();

        // Véfifier si le formulaire est valide
        if (formValidity === "invalid") {
            // Afficher la message d'erreur
            evenement.target.reportValidity();
            return;
        }

        // Prépare la donnée
        const data = {
            method: (location.state !== null ? "PUT" : "POST"),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("api-film")}`
            },
            body: JSON.stringify(formData)
        };

        // On récupere le token
        // On soumet
        let request = '';
        if (id !== null) {
            request = await fetch(`http://localhost:3301/api/films/${id}`, data);
        } else{
            request = await fetch("http://localhost:3301/api/films", data);
        } 
        const response = await request.json();

        // On gere la réponse du formulaire
        if (request.status === 200) {
            // Afficher un message de success
            console.log("SUPER");

            // Vider le formulaire
            setFormData({
                titre: "",
                description: "",
                realisation: "",
                annee: "",
                genres: [],
                titreVignette: "vide.jpg"
            });

            setFormValidity("invalid");
        } else {
            const messageErreur = response.message;
            console.log("erreur", messageErreur);
        }
    }

    return (
        <main>
            <div className="wrapper">
                <h1>Ajouter un film</h1>
                <form className={formValidity} onSubmit={onFormSubmit}>
                    <div className="input-group">
                        <label htmlFor="titre">Titre</label>
                        <input type="text" id="titre" name="titre" value={formData.titre} onChange={onFormDataChange} required minLength="1" maxLength="150"></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <textarea type="text" id="description" name="description" value={formData.description} onChange={onFormDataChange} required minLength="1" maxLength="500"></textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="realisation">Realisation</label>
                        <input type="text" id="realisation" name="realisation" value={formData.realisation} onChange={onFormDataChange} required minLength="1" maxLength="150"></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="annee">Annee</label>
                        <input type="text" id="annee" name="annee" value={formData.annee} onChange={onFormDataChange} required minLength="1" maxLength="4"></input>
                    </div>


                    <div className="input-group">
                        <p>Genres</p>
                        {
                            genres.map((element, index) => {
                                return (
                                    <div key={index}>
                                        <input type="checkbox" id={element} name={`genre-${element}`} value={element} onChange={onFormDataChange} checked={formData.genres.includes(element)} />
                                        <label htmlFor={element}>{element}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="input-group">
                        <label htmlFor="titreVignette">Vignette</label>
                        <input type="file" name="titreVignette" id="titreVignette" accept=".jpeg, .jpg, .png, .webp" onChange={onFormDataChange}/>
                    </div>
                    <input type="submit" value="Envoyer" disabled={ formValidity === "invalid" ? "disabled" : ""}></input>
                </form>
                {/* olhar no codigo dele a continuacao
                {
                    messageErreur !== "" ? (<div></div>)
                } */}
            </div>
        </main>
    )
}

export default FormFilm;