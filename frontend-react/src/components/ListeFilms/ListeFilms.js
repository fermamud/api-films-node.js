import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../App/App';
import TuileFilm from '../TuileFilm/TuileFilm';
import Filtre from '../Filtre/Filtre';
import './ListeFilms.css';
//import ModifierFormFilm from '../ModifierFormFilm/ModifierFormFilm';

function ListeFilms() {

    const context = useContext(AppContext);
    console.log(context);

    const urlListeFilms = 'https://demo-en-classe.onrender.com/api/films';
    const [urlFiltre, setUrlFiltre] = useState([urlListeFilms]);

    const [tri, setTri] = useState('');
    
    const [listeFilms, setListeFilms] = useState([]);

    const [estCharge, setEstCharge] = useState(false);

    useEffect(() => {
      fetch(urlFiltre)
        .then((reponse) => reponse.json())
        .then((data) => {
          setListeFilms(data);
          setEstCharge(true);
        });
    }, [urlFiltre]);

    async function deleteFilm(id) {
        console.log('entrei aqui');
          const data = {
              method: "delete",
              headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${localStorage.getItem("api-film")}`,
                  body: JSON.stringify(id)
              }
          };
          console.log(data);
          const request = await fetch(`http://localhost:3301/api/films/${id}`, data);
          const response = await request.json();  
    
          if (request.status === 200) {
              // Afficher un message de success
              console.log("SUPER");
              await fetch(urlFiltre) 
                  .then((reponse) => reponse.json())
                  .then((data) => {
                    setListeFilms(data);
                    setEstCharge(true);
                  });
          } else {
            const messageErreur = response.message;
            console.log("erreur", messageErreur);
        }
    }

    // Gestion d'affichage du film
    const tuilesFilm = listeFilms.map((film, index) => {
      return <div key={index}>
                  <Link key={index} data={film} to={`/film/${film.id}`}>
                      <TuileFilm key={index} tri={tri} data={film}/>
                  </Link>
                  {(context) ?   
                    <div className='buttons'>
                      <button className="button__delete" onClick = {() => deleteFilm(film.id)}>Delete</button>
                        {/* <Link key={index} to={`/admin/modification-film/${film.id}`} data={film} > */}
                        <Link key={index} to={'/admin/ajout-film'} state={film.id} >
                          <button className="button button__modification">Modifier</button>
                        </Link>
                    </div>
                    :
                    ''
                  }
              </div>
    });

  // Gestion d'url avec filtre
  function filtre(tri, orderBy) {
      setUrlFiltre(`${urlListeFilms}?tri=${tri}&ordre=${orderBy}`);
  }

  // Gestion du tri
  function triActif(tri) {
    setTri(tri);
  }
 
  // Gestion animation
  const transition = { duration: 1, ease: 'easeInOut' };
  const variant = {
    hidden: {opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 1, y: -25, transition }
  }

  return (
    <main>
        <motion.div
            key='filtre'
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0, transition }}
            exit={{ opacity: 1, x: -25, transition }}
            className="filtre"
        >
            <Filtre handleTri={triActif} handleFiltre={filtre}/>
        </motion.div>
        {estCharge ? 
            <motion.div
              key={urlFiltre}
              initial= 'hidden'
              animate='visible'
              exit='exit'
              variants={variant}
              className="container-imgs"
            >
              {tuilesFilm}
            </motion.div>
            : ( '' )
        }
    </main>
  );
}

export default ListeFilms;
