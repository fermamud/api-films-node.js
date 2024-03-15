import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Accueil from './Accueil';
import data from './Accueil.json';



describe('Composant Accueil', () => {

    test('Vérifie la gestion d\'affichage de chaque section', async () => {

        render(<Accueil />);

        data.forEach(section => {

            waitFor(() => {
                expect(screen.getByText(section)).toBeInTheDocument();
            });

        });

    }); 
      
});