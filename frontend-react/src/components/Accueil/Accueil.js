import { motion } from 'framer-motion'; 
import data from './Accueil.json';
import './Accueil.css';

function Accueil() {

  // Affichage chaque paragraph
  const dataAffichage = data.map((section, index) => {
    return <p className="m-xsmall" key={index}>{section}</p>;
  });

  // Animation main
  const transition = { duration: 1, ease: 'easeInOut' };
  const variant = {
    hidden: {opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 1, y: 25, transition }
  }

  // Animation incones
  const variantIcones = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeInOut' } },
    exit: { opacity: 0, x: 100, transition: { duration: 1, ease: 'easeInOut' } }
  }

  return (
    <motion.main
      key='accueil'
      initial= 'hidden'
      animate='visible'
      exit='exit'
      variants={variant}
    >
        <div className="container-imgs-accueil mt-normal mb-normal">
            <div className="container-image">
                <img className="image" src="img/accueil_2.jpg" alt="" />
                <div className="info-film">
                    <motion.div
                        key='accueil-icones-1'
                        initial= 'hidden'
                        animate='visible'
                        exit='exit'
                        variants={variantIcones}
                        className="all-film"
                    >
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                    </motion.div>
                        {dataAffichage[0]}
                    <motion.div
                        key='accueil-icones-2'
                        initial= 'hidden'
                        animate='visible'
                        exit='exit'
                        variants={variantIcones}
                        className="all-film"
                    >
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                        <img className="icone-cinema" src="icones/star.svg" alt="icone-star" />
                    </motion.div>
                </div>
            </div>
            <div className="container-image">
                <div className="info-film">
                    <motion.div
                        key='accueil-icones-3'
                        initial= 'hidden'
                        animate='visible'
                        exit='exit'
                        variants={variantIcones}
                        className="all-film"
                    >
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                    </motion.div>
                        {dataAffichage[1]}
                    <motion.div
                        key='accueil-icones-4'
                        initial= 'hidden'
                        animate='visible'
                        exit='exit'
                        variants={variantIcones}
                        className="all-film"
                    >
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                        <img className="icone-cinema" src="icones/film_strip.svg" alt="icone-film" />
                    </motion.div>
                </div>
                <img className="image" src="img/accueil_1.jpg" alt="" />
            </div>
            <div className="container-image">
                <img className="image" src="img/accueil_3.jpg" alt="" />
                <div className="info-film">
                    <motion.div
                        key='accueil-icones-5'
                        initial= 'hidden'
                        animate='visible'
                        exit='exit'
                        variants={variantIcones}
                        className="all-film"
                    >
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                    </motion.div>  
                        {dataAffichage[2]}
                    <motion.div
                        key='accueil-icones-6'
                        initial= 'hidden'
                        animate='visible'
                        exit='exit'
                        variants={variantIcones}
                        className="all-film"
                    >
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                        <img className="icone-cinema" src="icones/popcorn.svg" alt="icone-popcorn" />
                    </motion.div>
                </div>
            </div>
        </div>
    </motion.main>
  );
}

export default Accueil;