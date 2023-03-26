function handleSearchMoviesSub(nameMovie, setIsLoggin, isMoviesArray, openInfoTool, setIsMoviesArray, MovieApi) { // вернуть массив фильмов с совпадением из инпута
    setIsLoggin(true);
    if (nameMovie.length > 0) { // проверить пустой или нет запрос на поиск
      let movies = isMoviesArray.filter( // если не пустой
        (movie) =>
          movie.nameRU.toLowerCase().includes(nameMovie.toLowerCase())
          || movie.nameEN.toLowerCase().includes(nameMovie.toLowerCase()))
      if (movies.length === 0) { // если ничего не найдено, то сообщить пользователю
        openInfoTool("Фильмы не найдены") // передать текст в инф.окно
      } else { // если фильмы найдены
        setIsMoviesArray(movies)
      }
    } else { //при отправке пустой формы вернуть все фильмы для просмотра на страницу
      setIsLoggin(true);
      MovieApi.getMovies()
        .then((data) => {
          setIsMoviesArray(data);
          setIsLoggin(false);
        }).catch((err) => {
          console.log(err);
          setIsLoggin(false);
        });
    }
  }

  export {handleSearchMoviesSub};