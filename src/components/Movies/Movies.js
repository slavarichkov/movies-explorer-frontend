import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ handleClickFavoriteMovies, movies, onSubmitSearch }) {

    const [isShortMovies, setIsShortMovies] = useState(false);
    let shortMoviesArray = movies.filter((movie) =>
        movie.duration <= 40
    )

    function handleIsShortMovies() {
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
    }


    return (
        <section className="movies">
            <SearchForm handleShort={handleIsShortMovies} onSubmit = {onSubmitSearch}/>
            <MoviesCardList
                moviesArray={!isShortMovies ? movies : shortMoviesArray}
                handleClick={handleClickFavoriteMovies}
            />
        </section>
    )
}

export default Movies;