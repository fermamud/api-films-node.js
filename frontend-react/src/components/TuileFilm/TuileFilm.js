import './TuileFilm.css';

function TuileFilm(props) {

  return (
    <article className="container-image m-small">
      <img className="image" src={`img/${props.data.titreVignette}`} alt={props.data.titre} />
      <div className="info-film mt-small">
        <h2>{props.data.titre}</h2>
        {(props.tri === 'annee') ? <p className="m-xsmall">{props.data.annee}</p> : ''}
        {(props.tri
           === 'realisation') ? <p className="m-xsmall">{props.data.realisation}</p> : ''}
      </div>
    </article>
  );
  
}

export default TuileFilm;
