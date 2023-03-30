
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import submit from './../../images/find.svg';

function SearchForm({ handleShort, onSubmit }) {

    const location = useLocation(); // определить URL

    const [isCheckMovies, setIsCheckMovies] = useState(false); // переключение на короткометражки
    const [isName, setIsName] = useState('');
    const [validationMassegeName, setValidationMassegeName] = useState('');

    useEffect(() => {
        if (location.pathname === '/movies') {
            setIsCheckMovies(JSON.parse(localStorage.getItem('isCheckMovies')));
        } else if (location.pathname === '/saved-movies') {
            console.log(JSON.parse(localStorage.getItem('isCheckSavedMovies')))
            setIsCheckMovies(JSON.parse(localStorage.getItem('isCheckSavedMovies')));
        }
    }, [])

    function changeFilms(e) {
        e.preventDefault();
        isCheckMovies ? setIsCheckMovies(false) : setIsCheckMovies(true);
        handleShort()
    }

    //передать данные  из инпутов
    function handleChange(e) {
        setIsName(e.target.value);
        setValidationMassegeName(e.target.validationMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(isName);
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form__container">
                <div className="search-form__container-input">
                    <div className="search-form__icon" alt="картинка поиска" />
                    <input className="search-form__input" type="text" name="name" placeholder="Фильм" onChange={handleChange}></input>
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