import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ nameFilm, duration, src, trailLink, id, alt, handleClick, isListIdMoviesFavorite }) {

    const [isCheckFavorites, setIsCheckFavorites] = useState(false); // добавление в избранное
    const [isSavedMoviesPage, setIsSavedMoviesPage] = useState(false); // открыта страница сохраненных фильмов
    const location = useLocation();

    function changeFavorites(e) {
        e.preventDefault();
        isCheckFavorites ? setIsCheckFavorites(false) : setIsCheckFavorites(true);
        handleClick(id);
    }

    useEffect(() => {
        location.pathname.toString() === "/saved-movies" ? setIsSavedMoviesPage(true) :
            setIsSavedMoviesPage(false)
    }, [location])


    useEffect(() => {
        if (location.pathname === "/movies") {
            let movies = JSON.parse(localStorage.getItem('savedMovies'))
            let moviesId = movies.map((movie) => movie.movieId);
            if (moviesId.includes(id)) {
                setIsCheckFavorites(true);
            }
        }
    }, [location, id])


    return (
        <div className="movies-card" id={id} key={id}>
            <div className="movies-card__header">
                <div className="movies-card__title-container">
                    <h2 className="movies-card__title">{nameFilm}</h2>
                    <p className="movies-card__duration">{duration}</p>
                </div>
                <button
                    className={`movies-card__favourites ${isCheckFavorites || isSavedMoviesPage ? "movies-card__favourites_on" : "movies-card__favourites_off"}`}
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