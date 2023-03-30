import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from '../Preloader/Preloader';
import { useEffect } from "react";

function SavedMovies({ movies, handleClickFavoriteMovies, onSubmitSearch, isURL }) {
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isClickShortMovies, setIsClickShortMovies] = useState(false);
    let shortMoviesArray = movies.filter((movie) =>
        movie.duration <= 40
    )

    useEffect(() => {
        setIsShortMovies(JSON.parse(localStorage.getItem('isCheckMovies')))
    }, [])

    function handleIsShortMovies() { // вкл выкл короткометражки
         isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
        if (JSON.parse(localStorage.getItem('isCheckMovies')) === true) {
            localStorage.setItem('isCheckMovies', JSON.stringify(false))
        } else if (JSON.parse(localStorage.getItem('isCheckMovies')) === false) {
            localStorage.setItem('isCheckMovies', JSON.stringify(true))
        }
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