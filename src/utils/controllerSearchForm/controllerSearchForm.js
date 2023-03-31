

function handleSearchMoviesSub( // вернуть массив фильмов с совпадением из инпута
  nameMovie,
  isMoviesArray,
  openInfoTool,
  setIsMoviesArray,
  MovieApi,
  isURL,
  setIsFindMovies,
  setIsSubmitFind,
  setIsLogg
) { 
  if (nameMovie.length > 0 && isURL === "/movies") { // проверить пустой или нет запрос на поиск
    setIsLogg(true);
    MovieApi.getMovies()
      .then(
        (moviesArray) => {
          setIsFindMovies(true);
          setIsSubmitFind(true);
          let movies = moviesArray.filter(
            (movie) =>
              movie.nameRU.toLowerCase().includes(nameMovie.toLowerCase())
              || movie.nameEN.toLowerCase().includes(nameMovie.toLowerCase()));
          if (movies.length > 0) {
            localStorage.setItem('moviesFind', JSON.stringify(movies)); // записать в хранилище поиск по всем фильмам
            localStorage.setItem('moviesFindInput', JSON.stringify(nameMovie)); // записать в хранилище значение инпута поиска
            setIsLogg(false)
          } else {
            openInfoTool("ничего не найдено");
            localStorage.setItem('moviesFind', JSON.stringify(movies)); // записать в хранилище поиск по всем фильмам
            localStorage.setItem('moviesFindInput', JSON.stringify(nameMovie)); // записать в хранилище значение инпута поиска
            setIsLogg(false)
          }
        }
      ).catch(err => {
        openInfoTool("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
        console.log(err);
        setIsLogg(false);
      })
  } else if (nameMovie.length > 0 && isURL === "/saved-movies") {
    setIsLogg(true);
    let movies = isMoviesArray.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(nameMovie.toLowerCase())
        || movie.nameEN.toLowerCase().includes(nameMovie.toLowerCase()));
    if (movies.length > 0) {
      setIsMoviesArray(movies);
      setIsLogg(false);
    } else {
      openInfoTool("ничего не найдено");
      setIsLogg(false);
    }
  } else if (nameMovie.length === 0) {
    openInfoTool("Введите слово для поиска")
  }
}

// if (nameMovie.length > 0) { // проверить пустой или нет запрос на поиск
//   let movies = isMoviesArray.filter( // если не пустой
//     (movie) =>
//       movie.nameRU.toLowerCase().includes(nameMovie.toLowerCase())
//       || movie.nameEN.toLowerCase().includes(nameMovie.toLowerCase()))
//   if (movies.length === 0) { // если ничего не найдено, то сообщить пользователю
//     openInfoTool("Фильмы не найдены") // передать текст в инф.окно
//   } else { // если фильмы найдены
//     if (isURL === "/movies") { // если данные передаются с главной страницы
//       localStorage.setItem('moviesFind', JSON.stringify(movies)); // записать в хранилище поиск по всем фильмам
//       localStorage.setItem('moviesFindInput', JSON.stringify(nameMovie)); // записать в хранилище значение инпута поиска
//     } else if (isURL === "/saved-movies") {
//       localStorage.setItem('moviesSavedFind', JSON.stringify(movies)); // записать в хранилище  поиск по сохраненным фильмам
//       localStorage.setItem('moviesFindSavedInput', JSON.stringify(nameMovie)); // записать в хранилище значение инпута поиска
//     }
//   }
// } else {
//   openInfoTool("Необходимо задать ключевое слово для поиска")
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
// }
// }

export { handleSearchMoviesSub };