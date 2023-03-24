import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { movies, handleClickFavoriteMovies } from '../../utils/movies';
let shortMoviesArray = movies.filter((movie) =>
    movie.duration <= 40
)

function SavedMovies({ moviesArray, handleClickFavoriteMovies }) {

    const [isShortMovies, setIsShortMovies] = useState(false);

    function handleIsShortMovies() {
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
    }

    return (
        <section className="saved-movies">
            <SearchForm handleShort={handleIsShortMovies} />
            <MoviesCardList
                moviesArray={!isShortMovies ? movies : shortMoviesArray}
                handleClick={handleClickFavoriteMovies}
            />
        </section>
    )
}

export default SavedMovies;