import React, { useState } from 'react';

function MoviesCard({ nameFilm, duration, src, id, alt }) {

    const [isCheckFavorites, setIsCheckFavorites] = useState(false); // добавление в избранное

    function changeFavorites(e) {
        e.preventDefault();
        isCheckFavorites ? setIsCheckFavorites(false) : setIsCheckFavorites(true)
    }

    return (
        <div className="movies-card" id={id}>
            <div className="movies-card__header">
                <div className="movies-card__title-container">
                    <h2 className="movies-card__title">{nameFilm}</h2>
                    <p className="movies-card__duration">{duration}</p>
                </div>
                <button
                    className={`movies-card__favourites_off ${isCheckFavorites ? "movies-card__favourites_on" : ""}`} onClick={changeFavorites}></button>
            </div>
            <img className="movies-card__img" src={`https://api.nomoreparties.co${src}`} alt={alt} />
        </div >
    )
}

export default MoviesCard;