import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <div className="not-found-page__content">
                <h2 className="not-found-page__title">404</h2>
                <p className="not-found-page__subtitle">Страница не найдена</p>
                <Link className="not-found-page__link" to={"/"}>Назад</Link>
            </div>
        </div>
    )
}

export default NotFoundPage;