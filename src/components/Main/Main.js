import AboutProject from "../AboutProject/AboutProject";
import Navigation from "../Navigation/Navigation";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main() {

    return (
        <main className="main">
            <Navigation />
            <AboutProject />
            <Techs />
            <AboutMe />
        </main>
    )
}

export default Main;