import { useState } from 'react';
import './Filtre.css';


function Filtre(props) {
    const [activeItem, setActiveItem] = useState('inactif');

    // Gestion du tri e du order by
    function setParams(tri, orderBy) {
        props.handleFiltre(tri, orderBy);
        props.handleTri(tri);
    }

    // Gestion du filtre actif
    function maDeuxiemeFunction(filtreActif) {
        setActiveItem(filtreActif);
    }


    return (
        <ul className="liste-filtres m-lateral-normal mt-small mb-small">
            <li className={`${activeItem === 'titreAsc' ? 'actif' : 'inactif'} cool-link`} onClick = {() => {setParams('titre', 'asc'); maDeuxiemeFunction('titreAsc')}}>Titre alphabétique (A-Z)</li>
            <li className={`${activeItem === 'titreDesc' ? 'actif' : 'inactif'} cool-link`} onClick = {() => {setParams('titre', 'desc'); maDeuxiemeFunction('titreDesc')}}>Titre alphabétique (Z-A)</li>
            <li className={`${activeItem === 'realisationAsc' ? 'actif' : 'inactif'} cool-link`} onClick = {() => {setParams('realisation', 'asc'); maDeuxiemeFunction('realisationAsc')}}>Réalisateur alphabétique (A-Z)</li>
            <li className={`${activeItem === 'realisationDesc' ? 'actif' : 'inactif'} cool-link`} onClick = {() => {setParams('realisation', 'desc'); maDeuxiemeFunction('realisationDesc')}}>Réalisateur alphabétique (Z-A)</li>
            <li className={`${activeItem === 'anneeDesc' ? 'actif' : 'inactif'} cool-link`} onClick = {() => {setParams('annee', 'desc'); maDeuxiemeFunction('anneeDesc')}}>Par année (du plus récent)</li>
            <li className={`${activeItem === 'anneeAsc' ? 'actif' : 'inactif'} cool-link`} onClick = {() => {setParams('annee', 'asc'); maDeuxiemeFunction('anneeAsc')}}>Par année (du plus ancien)</li>
        </ul>
    )
}

export default Filtre;
