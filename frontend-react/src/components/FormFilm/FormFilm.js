// import { Form } from "react-router-dom";
import './FormFilm.css';
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// baixar react developer tools

function FormFilm() {
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

    const [formData, setFormData] = useState({
        titre: "",
        description: "",
        realisation: "",
        annee: "",
        genres: [],
        titreVignette: "vide.jpg"
    });


    const [formValidity, setFormValidity] = useState("invalid");
    // const navigate = useNavigate();
    // ICI ON POURRAIT UTILISER USESTATE POUR GERER LA MESSAGE D'ERREUR (VER O CODIGO DELE)

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
        } else if (name == "titreVignette") {
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
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("api-film")}`
            },
            body: JSON.stringify(formData)
        };

        // On récupere le token

        // On soumet
        const request = await fetch("http://localhost:3301/api/films", data);
        const response = await request.json();

        // On gere la réponse du formulaire
        if (request.status === 200) {
            // Afficher un message de success
            console.log("SUPER");

            // Vide le formulaire
            setFormData({
                titre: "",
                description: "",
                realisation: "",
                annee: "",
                genres: [],
                titreVignette: "vide.jpg"
            });

            // Reinit l'état de validité
            setFormValidity("invalid");
            // navigate("/"); // Redirige vers une page en particulier
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