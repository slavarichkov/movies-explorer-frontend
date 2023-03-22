import AboutProject from "../AboutProject/AboutProject";
import Navigation from "../Navigation/Navigation";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {

    return (
        <main className="main">
            <Navigation />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    )
}

export default Main;