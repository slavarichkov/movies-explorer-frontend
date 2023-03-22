import AboutProject from "../AboutProject/AboutProject";
import Navigation from "../Navigation/Navigation";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {

    return (
        <section className="main">
            <Navigation />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </section>
    )
}

export default Main;