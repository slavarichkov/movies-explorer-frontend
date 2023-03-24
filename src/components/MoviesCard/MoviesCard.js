import React, { useState } from 'react';

function MoviesCard({ nameFilm, duration, src, id, alt, handleClick }) {

    const [isCheckFavorites, setIsCheckFavorites] = useState(false); // добавление в избранное

    function changeFavorites(e) {
        e.preventDefault();
        isCheckFavorites ? setIsCheckFavorites(false) : setIsCheckFavorites(true);
        handleClick(id);
    }

    return (
        <div className="movies-card" id={id} key={id}>
            <div className="movies-card__header">
                <div className="movies-card__title-container">
                    <h2 className="movies-card__title">{nameFilm}</h2>
                    <p className="movies-card__duration">{duration}</p>
                </div>
                <button
                    className={`movies-card__favourites ${isCheckFavorites ? "movies-card__favourites_on" : "movies-card__favourites_off"}`} onClick={changeFavorites}></button>
            </div>
            <img className="movies-card__img" src={`https://api.nomoreparties.co${src}`} alt={alt} />
        </div >
    )
}

export default MoviesCard;