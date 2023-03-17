import AboutProject from "../AboutProject/AboutProject";
import Navigation from "../Navigation/Navigation";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main() {

    return (
        <div className="main">
            <Navigation />
            <AboutProject />
            <Techs />
            <AboutMe />
        </div>
    )
}

export default Main;