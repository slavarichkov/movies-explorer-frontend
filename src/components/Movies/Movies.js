import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ handleClickFavoriteMovies, movies, onSubmitSearch, loading }) {

    const [isShortMovies, setIsShortMovies] = useState(false);
    let shortMoviesArray = movies.filter((movie) =>
        movie.duration <= 40
    )

    function handleIsShortMovies() { // переключение на короткометражки
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true) // cтейт для мгновенного переключения состояния кнопки
        if (JSON.parse(localStorage.getItem('isCheckMovies')) === true) { // работа с локалстор - перезапись
            localStorage.setItem('isCheckMovies', JSON.stringify(false))
        } else if (JSON.parse(localStorage.getItem('isCheckMovies')) === false) {
            localStorage.setItem('isCheckMovies', JSON.stringify(true))
        } else {
            localStorage.setItem('isCheckMovies', JSON.stringify(true))
        }
    }

    useEffect(() => { // обновить стейт переключателя
        setIsShortMovies(JSON.parse(localStorage.getItem('isCheckMovies')))
    }, [])

    return (
        <section className="movies">
            <SearchForm handleShort={handleIsShortMovies} onSubmit={onSubmitSearch} />
            {!loading ?
                <MoviesCardList
                    moviesArray={!isShortMovies ? movies : shortMoviesArray}
                    handleClick={handleClickFavoriteMovies}
                />
                : <Preloader />}
        </section>
    )
}

export default Movies;