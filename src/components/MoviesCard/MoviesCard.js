import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({
    nameFilm,
    duration,
    src,
    trailLink,
    id,
    alt,
    handleClick,
    handleClickFavoriteMoviesDelete,
    SavedMoviesArray,
    isShortMovies
}) {

    const [isCheckFavorites, setIsCheckFavorites] = useState(false); // добавление в избранное
    const [isSavedMoviesPage, setIsSavedMoviesPage] = useState(false); // открыта страница сохраненных фильмов
    const [moviesId, setMoviesId] = useState([]);
    const location = useLocation();

    function changeFavorites(e) {
        e.preventDefault();
        isCheckFavorites ? setIsCheckFavorites(false) : setIsCheckFavorites(true);
        if // проверить главная страница активна и активна кнопка избранного
            (
            location.pathname === "/movies" &&
            document.getElementById(id).querySelector(".movies-card__favourites").classList.contains("movies-card__favourites_on")
        ) { // получить айди фильма из сохраненных и передать в метод АПИ удаления, переданный отдельно через пропс
            let movie = SavedMoviesArray.find((movie) => movie.movieId === id)
            handleClickFavoriteMoviesDelete(movie._id)
            isCheckFavorites ? setIsCheckFavorites(false) : setIsCheckFavorites(true);
        } else {
            handleClick(id);
        }
    }

    useEffect(() => {
        location.pathname.toString() === "/saved-movies" ? setIsSavedMoviesPage(true) :
            setIsSavedMoviesPage(false)
    }, [location])


    useEffect(() => { // получить фильмы из хранилища и проставить избранное
        if (location.pathname === "/movies" && SavedMoviesArray !== null) {
            setMoviesId(SavedMoviesArray.map((movie) => movie.movieId)) // вернуть новый массив из айди добавленных в избранное фильмов
            if (moviesId.includes(id)) {
                setIsCheckFavorites(true);
            }
            else if (!moviesId.includes(id)) { setIsCheckFavorites(false) }
        }
    }, [location, SavedMoviesArray, id, isShortMovies, isCheckFavorites, changeFavorites])


    return (
        <div className="movies-card" id={id} key={id}>
            <div className="movies-card__header">
                <div className="movies-card__title-container">
                    <h2 className="movies-card__title">{nameFilm}</h2>
                    <p className="movies-card__duration">{duration}</p>
                </div>
                <button
                    className={`movies-card__favourites ${isSavedMoviesPage ? "movies-card__favourites-saved"
                        :
                        isCheckFavorites ? "movies-card__favourites_on"
                            :
                            "movies-card__favourites_off"
                        }`}
                    onClick={changeFavorites}>
                </button>
            </div>
            <a className="movies-card__trailer" href={trailLink} target="blank">
                <img className="movies-card__img" src={`https://api.nomoreparties.co${src}`} alt={alt} />
            </a>
        </div >
    )
}

export default MoviesCard;