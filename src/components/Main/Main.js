import AboutProject from "../AboutProject/AboutProject";
import Navigation from "../Navigation/Navigation";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import NavTab from "../NavTab/NavTab";

function Main() {

    return (
        <main className="main">
            <NavTab />
            <Navigation />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    )
}

export default Main;