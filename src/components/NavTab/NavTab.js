import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NavTab() {

    const navigate = useNavigate();
    const location = useLocation();
    const [isMain, setIsMain] = useState(false);
    const [isMovies, setIsMovies] = useState(false);
    const [isSavedMovies, setIsSavedMovies] = useState(false);

    function redirectPage(url) { // переадресовать
        navigate(url);
        closeNavTab();
    }

    function handleClick(e) {
        e.preventDefault();
    }

    useEffect(() => {
        location.pathname.toString() === "/" ? setIsMain(true) :
            location.pathname.toString() === "/movies" ? setIsMovies(true) :
                location.pathname.toString() === "/saved-movies" ? setIsSavedMovies(true) :
                    <></>
    }, [location])

    useEffect(() => {
        if (isMain) {
            setIsMovies(false);
            setIsSavedMovies(false);
        } else if (isMovies) {
            setIsMain(false);
            setIsSavedMovies(false);
        } else if (isSavedMovies) {
            setIsMain(false);
            setIsMovies(false);
        }
    }, [isMain, isMovies, isSavedMovies])

    function closeNavTab() {  //свернуть попап
        document.querySelector('.navtab').classList.remove('navtab_visible')
    }

    return (
        <div className="navtab">
            <button className="navtab__button">
                <div className="navtab__button-close" onClick={closeNavTab}></div>
            </button>
            <button className={`navtab__button ${isMain ? "navtab__button-border_show" : ""}`} onClick={(e) => { redirectPage('/'); handleClick(e) }}>Главная</button>
            <button className={`navtab__button ${isMovies ? "navtab__button-border_show" : ""}`} onClick={(e) => { redirectPage('/movies'); handleClick(e) }}>Фильмы</button>
            <button className={`navtab__button ${isSavedMovies ? "navtab__button-border_show" : ""}`} onClick={(e) => { redirectPage('/saved-movies'); handleClick(e) }}>Сохранённые фильмы</button>
            <button className="navtab__button " onClick={(e) => { redirectPage('/profile'); handleClick(e) }}>Аккаунт</button>
        </div>
    )
}

export default NavTab;