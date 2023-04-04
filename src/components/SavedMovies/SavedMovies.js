import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from '../Preloader/Preloader';
import { useEffect } from "react";

function SavedMovies({ movies, handleClickFavoriteMovies, onSubmitSearch, isURL }) {
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [shortMoviesArray, setIsShortMoviesArray] = useState([]);

    useEffect(() => {
        if (movies !== null && movies.length > 0) {  
            setIsShortMoviesArray(movies.filter((movie) =>
                movie.duration <= 40))
        }
    }, [movies])

    function handleIsShortMovies() { // вкл выкл короткометражки
        isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true)
        if (JSON.parse(localStorage.getItem('isCheckSavedMovies')) === true) {
            localStorage.setItem('isCheckSavedMovies', JSON.stringify(false))
        } else if (JSON.parse(localStorage.getItem('isCheckSavedMovies')) === false) {
            localStorage.setItem('isCheckSavedMovies', JSON.stringify(true))
        } else {
            localStorage.setItem('isCheckSavedMovies', JSON.stringify(true))
        }
    }

    useEffect(() => {
        setIsShortMovies(JSON.parse(localStorage.getItem('isCheckSavedMovies')))
    }, [])

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