
function AboutProject() {

    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__container-info">
                <div className="about-project__info">
                    <p className="about-project__info-element">Дипломный проект включал 5 этапов</p>
                    <p className="about-project__info-element">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__info">
                    <p className="about-project__info-element">На выполнение диплома ушло 5 недель</p>
                    <p className="about-project__info-element">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__container-info about-project__container-info_progressive">
                <div className="about-project__progressive-container">
                    <p className="about-project__progressive-element">1 неделя</p>
                    <p className="about-project__progressive-element">4 недели</p>
                </div>
                <div className="about-project__progressive-container">
                    <p className="about-project__progressive-element about-project__progressive-element_background">Back-end</p>
                    <p className="about-project__progressive-element about-project__progressive-element_background">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;