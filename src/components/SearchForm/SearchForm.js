
import { useState } from 'react';
import submit from './../../images/find.svg';

function SearchForm({ handleShort }) {

    const [isCheckMovies, setIsCheckMovies] = useState(false); // переключение на короткометражки

    function changeFilms(e) {
        e.preventDefault();
        isCheckMovies ? setIsCheckMovies(false) : setIsCheckMovies(true);
        handleShort()
    }

    return (
        <form className="search-form">
            <div className="search-form__container">
                <div className="search-form__container-input">
                    <div className="search-form__icon" alt="картинка поиска" />
                    <input className="search-form__input" type="text" name="name" placeholder="Фильм" required></input>
                    <button className="search-form__input-button">
                        <img className="search-form__img" src={submit} alt="изибражение стрелки" />
                    </button>
                </div>
                <div className="search-form__checkbox">
                    <button className={`search-form__button ${isCheckMovies ? 'search-form__button_on' : 'search-form__button_off'}`}
                        onClick={changeFilms} />
                    <p className="search-form__button-name">Короткометражки</p>
                </div>
            </div>
        </form>
    )
}

export default SearchForm;