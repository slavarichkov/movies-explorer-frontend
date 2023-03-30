

function handleSearchMoviesSub(nameMovie, isMoviesArray, openInfoTool, setIsMoviesArray, MovieApi, isURL) { // вернуть массив фильмов с совпадением из инпута
  // setIsLoggin(true);

  if (nameMovie.length > 0) { // проверить пустой или нет запрос на поиск
    let movies = isMoviesArray.filter( // если не пустой
      (movie) =>
        movie.nameRU.toLowerCase().includes(nameMovie.toLowerCase())
        || movie.nameEN.toLowerCase().includes(nameMovie.toLowerCase()))
    if (movies.length === 0) { // если ничего не найдено, то сообщить пользователю
      openInfoTool("Фильмы не найдены") // передать текст в инф.окно
    } else { // если фильмы найдены
      if (isURL === "/movies") { // если данные передаются с главной страницы
        localStorage.setItem('moviesFind', JSON.stringify(movies)); // записать в хранилище поиск по всем фильмам
      } else if (isURL === "/saved-movies") {
        localStorage.setItem('moviesSavedFind', JSON.stringify(movies)); // записать в хранилище  поиск по сохраненным фильмам
      }
    }
  } else { 
    //при отправке пустой формы вернуть все фильмы для просмотра на страницу и сообщить пользователю - на будущее исправить
    // if (isURL === "/movies") {
    //   MovieApi.getMovies()
    //     .then((data) => {
    //       localStorage.setItem('moviesFind', JSON.stringify(data));
    //       openInfoTool("Необходимо задать ключевое слово для поиска") // передать текст в инф.окно
    //     }).catch((err) => {
    //       console.log(err);
    //     })
    // } else if (isURL === "/saved-movies") {
    //   localStorage.setItem('moviesFind', JSON.stringify(isMoviesArray));
    //   openInfoTool("Необходимо задать ключевое слово для поиска") // передать текст в инф.окно
    // }
  }
}

export { handleSearchMoviesSub };