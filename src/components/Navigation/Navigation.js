import { useEffect, useState } from "react";

function Navigation() {

    const [width, setWidth] = useState(window.innerWidth); // ширина экрана
    const [scrollProject, setScrollProject] = useState(null);
    const [scrollTech, setScrollTech] = useState(null);
    const [scrollStudent, setScrollStudent] = useState(null)

    function scroller(top) { // перместиться по высоте окна
        window.scrollTo({
            top: top,
            left: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => { // отследить ширину экрана 
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (width > 768) { setScrollProject(600); setScrollTech(1100); setScrollStudent(1800) }
        else if (width < 769 && width > 475) { setScrollProject(900); setScrollTech(1200); setScrollStudent(2100) }
        else if (width < 476) { setScrollProject(500); setScrollTech(1300); setScrollStudent(1950) }
    },[width])


    return (
        <section className="navigation">
            <h1 className="navigation__title">Учебный проект студента факультета Веб-разработки.</h1>
            <div className="navigation__buttons">
                <button className="navigation__button" onClick={() => scroller(scrollProject)} type="button">О проекте</button>
                <button className="navigation__button" onClick={() => scroller(scrollTech)}>Технология</button>
                <button className="navigation__button" onClick={() => scroller(scrollStudent)}>Студент</button>
            </div>
        </section>
    )
}

export default Navigation;