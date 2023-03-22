import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Header({ loggedInState }) {

    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth); // ширина экрана
    const [stateShowHeader, setStateShowHeader] = useState(true);
    const location = useLocation()

    useEffect(() => { // отследить url для хедера в целом
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
        document.querySelector('.navtab').classList.add('navtab_visible');
    }

    return (
        stateShowHeader ?
            < header className="header" >
                <div className="header__container">
                    <div className="header__container-element" >
                        <Link to={"/"} className="header__logo" />
                        {loggedInState && width > 769 ?
                            <div className="header__links-container">
                                <Link
                                    className="header__link  header__link_profile header__link_notcolor"
                                    to={'/movies'}>Фильмы
                                </Link>
                                <Link className="header__link  header__link_profile header__link_notcolor"
                                    to={'/saved-movies'}>Сохраненные фильмы
                                </Link>
                            </div>
                            : <></>
                        }
                    </div>
                    <div className="header__container-element" >
                        <div className="header__element">
                            {loggedInState && width > 769 ?
                                <Link className="header__link" to={'/profile'}>Аккаунт</Link>
                                : loggedInState && width < 769 ?
                                    <>
                                        <button className="header__link-nav" onClick={openNavTab}>
                                            <span className="header__link-nav_line"></span>
                                            <span className="header__link-nav_line"></span>
                                            <span className="header__link-nav_line"></span>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <Link to={'/sign-up'} className="header__link header__link_notcolor">Регистрация</Link>
                                        <Link to={'/signin'} className="header__link header__link_color" >Войти</Link>
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
