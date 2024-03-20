// import { Form } from "react-router-dom";
import './FormFilm.css';
import { useState } from "react";
// baixar react developer tools

function FormFilm() {

    const [formData, setFormData] = useState({
        titre: "",
        description: "",
        realisation: "",
        annee: "",
        genres: [],
        titreVignette: "vide.jpg"
    });


    const [formValidity, setFormValidity] = useState("invalid");
    // ICI ON POURRAIT UTILISER USESTATE POUR GERER LA MESSAGE D'ERREUR (VER O CODIGO DELE)

    function onFormDataChange(evenement) {
        const name = evenement.target.name;
        const value = evenement.target.value;
        // const {name, value} = evenement.target;
        
        const estValide = evenement.target.form.checkValidity() ? "valid" : "invalid";
        setFormValidity(estValide);

        // On clone la donnee dans un nouvel objet
        const donneeModifiee = {...formData, [name]:value};
        setFormData(donneeModifiee);
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
        } else {
            const messageErreur = response.error;
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