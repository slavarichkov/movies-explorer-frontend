import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header({ loggedInState, handlePageAccaunt }) {

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
            < div className="header" >
                <div className="header__container">
                    <div className="header__container-element" >
                        <div className="header__logo" />
                        {loggedInState && width > 769 ?
                            <div className="header__buttons-container">
                                <button
                                    className="header__button  header__button-profile header__button-notcolor"
                                    onClick={() => redirectPage('/movies')}>Фильмы
                                </button>
                                <button className="header__button  header__button-profile header__button-notcolor"
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
                                        <button className="header__button header__button-notcolor">Регистрация</button>
                                        <button className="header__button header__button-color" >Войти</button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div >
            :
            <></>
    )
}

export default Header;
