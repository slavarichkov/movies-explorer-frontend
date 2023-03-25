import MoviesCard from "../MoviesCard/MoviesCard";
import React, { useState, useEffect } from 'react';

function MoviesCardList({ moviesArray, handleClick }) {

    const [isQuantityMovies, setIsQuantityMovies] = useState(12); // отображение количества фильмов на странице
    const [width, setWidth] = useState(window.innerWidth); // ширина экрана
    const [isLengthMoviesArray, setIsLengthMoviesArray] = useState(false); // cледить все ли фильмы отображены на странице

    let moviesPart = moviesArray.slice(0, isQuantityMovies); // скорректировать массив фильмов для отображения


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
    }, [width, moviesArray.length])

    useEffect(() => {
        moviesArray.length <= isQuantityMovies ? setIsLengthMoviesArray(true) : setIsLengthMoviesArray(false)
    }, [isQuantityMovies, moviesArray.length])

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
                            id={movie.id}
                            src={movie.image.formats.thumbnail.url}
                            duration={getTimeFromMins(movie.duration)}
                            alt={movie.image.name}
                            handleClick={handleClick}
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