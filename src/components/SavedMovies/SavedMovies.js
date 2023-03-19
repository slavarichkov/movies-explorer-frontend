import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { movies } from '../../utils/movies';
let shortMoviesArray = movies.filter((movie) =>
    movie.duration <= 40
)

function SavedMovies({ moviesArray }) {

    const [isShortMovies, setIsShortMovies] = useState(false);

    function handleIsShortMovies() {
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
    }

    return (
        <section className="saved-movies">
            <SearchForm handleShort={handleIsShortMovies} />
            <MoviesCardList moviesArray={!isShortMovies ? movies : shortMoviesArray} />
        </section>
    )
}

export default SavedMovies;