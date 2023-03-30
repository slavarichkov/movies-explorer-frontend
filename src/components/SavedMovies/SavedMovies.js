import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from '../Preloader/Preloader';

let test = localStorage.getItem('moviesFind')
console.log(JSON.parse(test))

function SavedMovies({ movies, handleClickFavoriteMovies, onSubmitSearch, isURL }) {
    const [isShortMovies, setIsShortMovies] = useState(false);
    let shortMoviesArray = movies.filter((movie) =>
        movie.duration <= 40
    )

    function handleIsShortMovies() { // вкл выкл короткометражки
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
    }

    return (
        <section className="saved-movies">
            <SearchForm handleShort={handleIsShortMovies} onSubmit={onSubmitSearch} isURL={isURL} />
            <MoviesCardList
                moviesArray={!isShortMovies ? movies : shortMoviesArray}
                handleClick={handleClickFavoriteMovies}
            />
        </section>
    )
}

export default SavedMovies;