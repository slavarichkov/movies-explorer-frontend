import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from '../Preloader/Preloader';


function SavedMovies({ movies, handleClickFavoriteMovies, onSubmitSearch }) {
    const [isShortMovies, setIsShortMovies] = useState(false);
    let shortMoviesArray = movies.filter((movie) =>
        movie.duration <= 40
    )

    function handleIsShortMovies() { // вкл выкл короткометражки
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
    }

    return (
        <section className="saved-movies">
            <SearchForm handleShort={handleIsShortMovies} onSubmit={onSubmitSearch}/>
            <MoviesCardList
                moviesArray={!isShortMovies ? movies : shortMoviesArray}
                handleClick={handleClickFavoriteMovies}
            />
        </section>
    )
}

export default SavedMovies;