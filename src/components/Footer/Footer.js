import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

function Footer() {

    const [stateShowFooter, setStateShowFooter] = useState(true);
    const location = useLocation();

   useEffect(() => {
        location.pathname.toString() === "/profile" ? setStateShowFooter(false) : 
        location.pathname.toString() === "/signin" ? setStateShowFooter(false) :
        location.pathname.toString() === "/sign-up" ? setStateShowFooter(false) :
        setStateShowFooter(true)
    }, [location])

    return (

        stateShowFooter ?
            <div className="footer">
                < h3 className="footer__title" > Учебный проект Яндекс.Практикум х BeatFilm.</h3 >
                <div className="footer__container">
                    <p className="footer__container__date">&copy; 2023</p>
                    <div className="footer__container__element">
                        <a className="footer__container__element__link" href={'https://practicum.yandex.ru/'} target="blank">Яндекс.Практикум</a>
                        <a className="footer__container__element__link" href={'https://github.com/slavarichkov'} target="blank">Github</a>
                    </div>
                </div>
            </div > : <></>
    )
}

export default Footer;