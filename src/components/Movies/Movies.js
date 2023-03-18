import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { movies } from '../../utils/movies';
let shortMoviesArray = movies.filter((movie) =>
    movie.duration <= 40
)

function Movies({ child }) {

    const [isShortMovies, setIsShortMovies] = useState(false);

    function handleIsShortMovies() {
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
    }

    return (
        <div className="movies">
            <SearchForm handleShort={handleIsShortMovies} />
            <MoviesCardList moviesArray={!isShortMovies ? movies : shortMoviesArray} />
            {child}
        </div>
    )
}

export default Movies;