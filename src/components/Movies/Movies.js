import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { movies } from '../../utils/movies';
let shortMoviesArray = movies.filter((movie) =>
    movie.duration <= 40
)

function Movies() {

    const [isShortMovies, setIsShortMovies] = useState(false);

    function handleIsShortMovies() {
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
    }

    return (
        <section className="movies">
            <SearchForm handleShort={handleIsShortMovies} />
            <MoviesCardList moviesArray={!isShortMovies ? movies : shortMoviesArray} />
        </section>
    )
}

export default Movies;