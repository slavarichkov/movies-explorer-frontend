import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Header({ loggedInState }) {

    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth); // ширина экрана
    const [stateShowHeader, setStateShowHeader] = useState(true);
    const location = useLocation()

    useEffect(() => { // отследить url
        location.pathname.toString() === "/signin" ? setStateShowHeader(false) :
            location.pathname.toString() === "/sign-up" ? setStateShowHeader(false) :
            setStateShowHeader(true)
    }, [location])

    useEffect(() => { // отследить ширину экрана 
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function redirectPage(url) {
        navigate(url)
    }

    function openNavTab() { // открыть навигацию
        document.querySelector('.navtab').classList.add('navtab__visible');
    }

    return (
        stateShowHeader ?
            < header className="header" >
                <div className="header__container">
                    <div className="header__container-element" >
                        <Link to={"/"} className="header__logo" />
                        {loggedInState && width > 769 ?
                            <div className="header__buttons-container">
                                <button
                                    className="header__button  header__button_profile header__button_notcolor"
                                    onClick={() => redirectPage('/movies')}>Фильмы
                                </button>
                                <button className="header__button  header__button_profile header__button_notcolor"
                                    onClick={() => redirectPage('/saved-movies')}>Сохраненные фильмы
                                </button>
                            </div>
                            : <></>
                        }
                    </div>
                    <div className="header__container-element" >
                        <div className="header__element">
                            {loggedInState && width > 769 ?
                                <button className="header__button" onClick={() => redirectPage('/profile')}>Аккаунт</button>
                                : loggedInState && width < 769 ?
                                    <>
                                        <button className="header__button-nav" onClick={openNavTab}>
                                            <div className="header__button-nav_line"></div>
                                            <div className="header__button-nav_line"></div>
                                            <div className="header__button-nav_line"></div>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className="header__button header__button_notcolor">Регистрация</button>
                                        <button className="header__button header__button_color" >Войти</button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </header >
            :
            <></>
    )
}

export default Header;
