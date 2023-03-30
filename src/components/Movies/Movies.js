import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ handleClickFavoriteMovies, movies, onSubmitSearch, loading, isURL, handleIsShortMovies }) {

    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isClickShortMovies, setIsClickShortMovies] = useState(false);
    let shortMoviesArray = movies.filter((movie) =>
        movie.duration <= 40
    )

    function handleIsShortMovies() {
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
    }

    // function handleIsShortMoviestest() {
    //     handleIsShortMovies();
    //     isClickShortMovies ? setIsClickShortMovies(false) : setIsClickShortMovies(true)
    // }

    return (
        <section className="movies">
            <SearchForm handleShort={handleIsShortMovies} onSubmit={onSubmitSearch} isURL={isURL} />
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