import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

function Movies({ child }) {

    const [isCheckMovies, setIsCheckMovies] = useState(false); // переключение на короткометражки

    function changeFilms(e) {
        e.preventDefault();
        isCheckMovies ? setIsCheckMovies(false) : setIsCheckMovies(true);
    }

    return (
        <div className="movies">
            <SearchForm changeFilms={changeFilms} isCheckMovies={isCheckMovies} />
            {child}
        </div>
    )
}

export default Movies;