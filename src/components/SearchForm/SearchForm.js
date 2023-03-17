
import { useState } from 'react';
import submit from './../../images/find.svg';

function SearchForm() {

    const [isCheckMovies, setIsCheckMovies] = useState(false); // переключение на короткометражки

    function changeFilms(e) {
        e.preventDefault();
        isCheckMovies ? setIsCheckMovies(false) : setIsCheckMovies(true);
    }

    return (
        <form className="movies__form">
            <div className="movies__form__container">
                <div className="movies__form__container-find">
                    <div className="movies__form__container__icon" alt="картинка поиска" />
                    <input className="movies__form__container__input" type="text" name="name" placeholder="Фильм"></input>
                    <button className="movies__form__container__input-button">
                        <div className="movies__form__container__input-button__border-show">
                            <img className="movies__form__container__input-button__img" src={submit} alt="изибражение стрелки" />
                        </div>
                    </button>
                </div>
                <div className="movies__form__container-checkbox">
                    <button className={`movies__form__change-button_off ${isCheckMovies ? 'movies__form__button_on' : ''}`}
                        onClick={changeFilms} />
                    <p className="movies__form__change-button-name">Короткометражки</p>
                </div>
            </div>
        </form>
    )
}

export default SearchForm;