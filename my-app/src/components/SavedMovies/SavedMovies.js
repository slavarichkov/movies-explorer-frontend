import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesFavorite } from "../../utils/movies";

function SavedMovies() {
    return (
            <MoviesCardList moviesArray= {moviesFavorite}/>
    )
}

export default SavedMovies;