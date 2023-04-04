import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ handleClickFavoriteMovies, handleClickFavoriteMoviesDelete, movies, onSubmitSearch, loading, isListIdMoviesFavorite, SavedMoviesArray }) {

    const [isShortMovies, setIsShortMovies] = useState(false); // переключены ли на короткометражки
    const [shortMoviesArray, setIsShortMoviesArray] = useState([]); // список короткометражек

    useEffect(() => { // отображать список короткометражек
        if (movies !== null && movies.length > 0) {
            setIsShortMoviesArray(movies.filter((movie) =>
                movie.duration <= 40))
        }
    }, [movies])

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
                    handleClickFavoriteMoviesDelete={handleClickFavoriteMoviesDelete}
                    isListIdMoviesFavorite={isListIdMoviesFavorite}
                    SavedMoviesArray={SavedMoviesArray}
                />
                : <Preloader />}
        </section>
    )
}

export default Movies;