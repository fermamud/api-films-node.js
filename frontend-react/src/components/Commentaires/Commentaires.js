import './Commentaires.css';

function Commentaires(props) {

    // Gestion du commentaire suite au click
    function setCommentaire(e) {
        e.preventDefault();
        const commentaire = e.target.commentaire.value;
        props.handleCommentaire(commentaire);
    }

    return ( 
        <form className="form-commentaire" onSubmit={setCommentaire}>
            <textarea name="commentaire" placeholder='Ajouter votre commentaire' className="p-xsmall"></textarea>
            <button className="mt-small mb-small p-small">Soumettre</button>
        </form>
    )
}

export default Commentaires;