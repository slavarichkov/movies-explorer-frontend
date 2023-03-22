import link from "./../../images/text__COLOR_font-main.svg";

function Portfolio() {
    return (
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li className="portfolio__list">
                    <a href='https://slavarichkov.github.io/russian-travel/index.html' target='blanc' rel="noreferrer" className="portfolio__link" >
                        <p className="portfolio__link-text">Статичный сайт</p>
                        <img className="portfolio__link-image" src={link} alt="изображение ссылки" />
                    </a>
                </li>
                <li className="portfolio__list">
                    <a href='https://slavarichkov.github.io/front-end-Mesto/' target='blanc' rel="noreferrer" className="portfolio__link">
                        <p className="portfolio__link-text">Одностраничное приложение</p>
                        <img className="portfolio__link-image" src={link} alt="изображение ссылки" />
                    </a>
                </li>
                <li className="portfolio__list">
                    <a href='https://slavarichkov.github.io/front-end-Mesto/' target='blanc' rel="noreferrer" className="portfolio__link">
                        <p className="portfolio__link-text">Адаптивный сайт</p>
                        <img className="portfolio__link-image" src={link} alt="изображение ссылки" />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Portfolio;