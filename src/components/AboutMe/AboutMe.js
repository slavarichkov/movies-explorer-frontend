import React from 'react';
import { Link } from 'react-router-dom';
import photo from "./../../images/image-student__ID_1.png";
import link from "./../../images/text__COLOR_font-main.svg";

function AboutMe() {

    return (
        <div className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__conteiner-info">
                <div className="about-me__conteiner-info__element">
                    <h2 className="about-me__conteiner-info__element__name">Виталий</h2>
                    <h3 className="about-me__conteiner-info__element__info">Фронтенд-разработчик, 30 лет</h3>
                    <p className="about-me__conteiner-info__element__description">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a href='https://github.com/slavarichkov' className="about-me__conteiner-info__element__link" target="_blank">Github</a>
                </div>
                <div className="about-me__conteiner-info__element">
                    <img src={photo} className="about-me__conteiner-info__element__photo" alt="фото студента" />
                </div>
            </div>
            <div className="about-me__conteiner-links">
                <h3 className="about-me__conteiner-info__list-title">Портфолио</h3>
                <list className="about-me__conteiner-links__list">
                    <a href='https://slavarichkov.github.io/russian-travel/index.html' target='_blanc' className="about-me__conteiner-links__element">
                        <p className="about-me__conteiner-links__element-text">Статичный сайт</p>
                        <img className="about-me__conteiner-links__element-image" src={link} alt="изображение ссылки" />
                    </a>
                    <a href='https://slavarichkov.github.io/front-end-Mesto/' target='_blanc' className="about-me__conteiner-links__element">
                        <p className="about-me__conteiner-links__element-text">Адаптивный сайт</p>
                        <img className="about-me__conteiner-links__element-image" src={link} alt="изображение ссылки" />
                    </a>
                    <a href='https://slavarichkov.github.io/front-end-Mesto/' target='_blanc' className="about-me__conteiner-links__element">
                        <p className="about-me__conteiner-links__element-text">Одностраничное приложение</p>
                        <img className="about-me__conteiner-links__element-image" src={link} alt="изображение ссылки" />
                    </a>
                </list>
            </div>
        </div>
    )
}

export default AboutMe;