const takeMovies = (setLoading, MovieApi, setIsMoviesArray) => {
    setLoading(true);
    MovieApi.getMovies()
        .then((data) => {
            setLoading(false);
            setIsMoviesArray(data);
        })
}

const takeMoviesSaved = (apiMain, setIsSavedMoviesArray) => {
    apiMain.getMovies()
        .then((data) => {
            setIsSavedMoviesArray(data);
        })
}

export { takeMovies, takeMoviesSaved };