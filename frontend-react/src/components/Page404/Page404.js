import './Page404.css';
import { useEffect } from 'react';

function Page404() {

    // Gestion d'affichage GIF (element externe)
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://tenor.com/embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    return (
        <main>
            <div className="page404">
                <div className="tenor-gif-embed" data-postid="3579864" data-share-method="host" data-aspect-ratio="1.33758" data-width="100%">
                    <a href="https://tenor.com/view/movie-time-movie-theater-watching-michael-jackson-gif-3579864">Michael Jackson Watching A Movie And Eating Popcorn GIF</a>from <a href="https://tenor.com/search/movie+time-gifs">Movie Time GIFs</a>
                </div>
                <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
                <section>
                    <p className="m-xsmall">Coucou !
                        <img src="icones/404.svg" alt="icone_404" />
                    </p>
                    <p className="m-xsmall">Nous n'avons pas pu trouver votre page !
                        <img src="icones/triste.svg" alt="icone_emoji_triste" />
                    </p>
                    <p className="m-xsmall">Il semble qu'elle ait acheté les premiers billets disponibles pour regarder les nouveautés du cinéma et
                        n'a pas voulu travailler !
                        <img src="icones/billet.svg" alt="icone_billet" />
                    </p>
                    <p className="m-xsmall">Mais, pas de soucis ! Le Vidéo Club est toujours là pour vous aider à trouver un bon film à regarder, prenez votre popcorn !
                        <img src="icones/popcorn.svg" alt="icone_popcorn" />
                    </p>
                </section>
            </div>
        </main>
    );
}

export default Page404;