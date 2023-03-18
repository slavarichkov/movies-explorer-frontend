import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({moviesArray}) {
    return (
        <div className="saved-movies">
            <SearchForm />
            <MoviesCardList moviesArray={moviesArray} />
        </div>
    )
}

export default SavedMovies;