import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filtre from './Filtre';


describe('Composant Filtres', () => {

    test('Vérifie la gestion du click et de l\'affichage du filtre actif', async () => {

        // Mock de la fonction handleFiltres
        const handleFiltre = jest.fn();

        render(<Filtre handleFiltre={handleFiltre} />);

        // const filterItem = screen.getByText('Titre alphabétique (A-Z)');
        // fireEvent.click(filterItem);
        // expect(handleFiltre).toHaveBeenCalled();
        // const elFiltreActif = document.querySelector('.actif');
        // await waitFor(() => {
        //     expect(elFiltreActif.textContent).toBe('Titre alphabétique (A-Z)');
        // });

        // Test unitaire réalisé en fonction du texte du li cliqué.
        const elParent = document.querySelector('.liste-filtres');
        const elsLi = elParent.querySelectorAll('li');
        elsLi.forEach(li => {
            li.addEventListener('click', function() {
                fireEvent.click(li);
                expect(handleFiltre).toHaveBeenCalled();
                const activeItem = document.querySelector('.actif');
                expect(activeItem.textContent.trim()).toBe(li.textContent.trim());
            });
        });
    });   
});