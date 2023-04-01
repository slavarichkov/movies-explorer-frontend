import MoviesCard from "../MoviesCard/MoviesCard";
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function MoviesCardList({ moviesArray, handleClick, isListIdMoviesFavorite }) {

    const [isQuantityMovies, setIsQuantityMovies] = useState(12); // отображение количества фильмов на странице
    const [width, setWidth] = useState(window.innerWidth); // ширина экрана
    const [isLengthMoviesArray, setIsLengthMoviesArray] = useState(false); // cледить все ли фильмы отображены на странице
    const [isSavedMoviesArray, setSavedMovies] = useState(true) // отследить чей массив фильмов 
    const [moviesPart, setMoviesPart] = useState([]);// массив фильмов для отображения
    const location = useLocation();

    useEffect(() => { // проверка приходящего массива фильмов
        if (moviesArray !== null) {
            setMoviesPart(moviesArray.slice(0, isQuantityMovies))
        }
    }, [moviesArray, isQuantityMovies])

    useEffect(() => { // отследить url для корректной отрисовки карточек из массива
        location.pathname.toString() === '/saved-movies' ? setSavedMovies(true) : setSavedMovies(false)
    }, [location, moviesPart])

    useEffect(() => { // отследить ширину экрана 
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => { // отследить ширину экрана и изначальное количество карточек для отображения
        if (width > 769 && moviesArray.length > 11) {
            setIsQuantityMovies(12);
        } else if (width < 769 && moviesArray.length > 7) {
            setIsQuantityMovies(8);
        } else if (width < 500 && moviesArray.length > 4) {
            setIsQuantityMovies(5);
        } else {
            setIsQuantityMovies(moviesArray.length);
        }
    }, [width, moviesArray])

    useEffect(() => {
        if (moviesArray !== null) {
            moviesArray.length <= isQuantityMovies ? setIsLengthMoviesArray(true) : setIsLengthMoviesArray(false)
        }
    }, [isQuantityMovies, moviesArray])

    function showMoreMovies() { // добавить количество отображаемых фильмов на странице
        if (width > 769) {
            isQuantityMovies < moviesArray.length ?
                setIsQuantityMovies(isQuantityMovies + 3) : setIsQuantityMovies(isQuantityMovies)
        } else if (width < 769) {
            isQuantityMovies < moviesArray.length ?
                setIsQuantityMovies(isQuantityMovies + 2) : setIsQuantityMovies(isQuantityMovies)
        } else if (width < 500) {
            isQuantityMovies < moviesArray.length ?
                setIsQuantityMovies(isQuantityMovies + 2) : setIsQuantityMovies(isQuantityMovies)
        }
    }

    function getTimeFromMins(mins) { // минуты в часы:минуты
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    };

    return (
        <div className="movies-card-list">
            <div className="movies-card-list__container">
                {moviesPart.map((movie) => {
                    return (
                        <MoviesCard
                            nameFilm={movie.nameRU}
                            id={isSavedMoviesArray ? movie._id : movie.id}
                            src={isSavedMoviesArray ? movie.image : movie.image.formats.thumbnail.url}
                            trailLink={movie.trailerLink}
                            duration={getTimeFromMins(movie.duration)}
                            alt={isSavedMoviesArray ? movie.nameRu : movie.image.name}
                            handleClick={handleClick}
                            isListIdMoviesFavorite={isListIdMoviesFavorite}
                        />
                    )
                })}
            </div>{
                !isLengthMoviesArray ? <button className="movies-card__still" onClick={showMoreMovies}>Ещё</button>
                    : <></>
            }
        </div>
    )
}

export default MoviesCardList;