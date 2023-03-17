import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { moviesFavorite } from "../../utils/movies";

function SavedMovies() {
    return (
        <div className="saved-movies">
            <SearchForm />
            <MoviesCardList moviesArray={moviesFavorite} />
        </div>
    )
}

export default SavedMovies;