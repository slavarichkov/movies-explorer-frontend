import React from 'react';
import Portfolio from '../Portfolio/Portfolio';
import photo from "./../../images/image-student__ID_1.png";

function AboutMe() {

    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__conteiner-info">
                <div className="about-me__description-elemets">
                    <h2 className="about-me__name">Виталий</h2>
                    <h3 className="about-me__info">Фронтенд-разработчик, 30 лет</h3>
                    <p className="about-me__description">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a href='https://github.com/slavarichkov' className="about-me__link" target="_blank" rel="noreferrer">Github</a>
                </div>
                <div className="about-me__description-elemets">
                    <img src={photo} className="about-me__photo" alt="фото студента" />
                </div>
            </div>
        </section>
    )
}

export default AboutMe;