function handleMoviesDeleteSub(setLoading, movieId, apiMain, setIsSavedMoviesArray) {  //удаление фильма из сохраненных
    apiMain.deleteMovie(movieId)
        .then(() => {
           //setLoading(false);
            setIsSavedMoviesArray((movies) => movies.filter((m) => m._id !== movieId)) // возвращаем новый список без удаленного фильма
        }).catch((err) => {
            console.log(err);
        })
}

function handleAddMoviesSub(isMoviesArray, data, apiMain, setIsSavedMoviesArray, isSavedMoviesArray, setLoading) { //отправка фильма на сервер и обновление стейта для отрисовки 
    let savedMovie = isMoviesArray.find(movie => movie.id === data)
    let movie = {
      country: savedMovie.country,
      director: savedMovie.director,
      description: savedMovie.description,
      duration: savedMovie.duration,
      year: savedMovie.year,
      image: savedMovie.image.url,
      trailerLink: savedMovie.trailerLink,
      thumbnail: savedMovie.image.formats.thumbnail.url,
      movieId: savedMovie.id,
      nameRU: savedMovie.nameRU,
      nameEN: savedMovie.nameEN,
    }
    apiMain.sendMovies(movie)
      .then((newMovie) => {
        setIsSavedMoviesArray([newMovie, ...isSavedMoviesArray]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
}

export { handleMoviesDeleteSub, handleAddMoviesSub }