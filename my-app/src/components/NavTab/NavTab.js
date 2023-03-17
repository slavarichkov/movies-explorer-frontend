import { useNavigate } from "react-router-dom";

function NavTab() {

    const navigate = useNavigate();

    function redirectPage(url) {
        navigate(url);
        closeNavTab();
    }
    //свернуть попап
    function closeNavTab() {
        document.querySelector('.navtab').classList.remove('navtab__visible')
    }

    return (
        <div className="navtab">
            <button className="navtab__button">
                <div className="navtab__button_close" onClick={closeNavTab}></div>
            </button>
            <button className="navtab__button" onClick={() => redirectPage('/')}>Главная</button>
            <button className="navtab__button" onClick={() => redirectPage('/movies')}>Фильмы</button>
            <button className="navtab__button" onClick={() => redirectPage('/saved-movies')}>Сохранённые фильмы</button>
            <button className="navtab__button" onClick={() => redirectPage('/profile')}>Аккаунт</button>
        </div>
    )
}

export default NavTab;