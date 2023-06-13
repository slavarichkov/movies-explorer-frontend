import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import NavTab from '../NavTab/NavTab';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import currentUserContext from './../../utils/CurrentUserContext/CurrentUserContext';

import apiMain from '../../utils/MainApi/MainApi'; // апи с бэком
import MovieApi from '../../utils/MoviesApi/MoviesApi'; // сторонний АПИ для получения списка фильмов
import { takeMovies, takeMoviesSaved } from '../../utils/takeMovies/takeMovies'; // получить фильмы
import { handleMoviesDeleteSub, handleAddMoviesSub } from '../../utils/controllerMovies/controllerMovies'; // удалить или добавить фильмы
import { handleSearchMoviesSub } from '../../utils/controllerSearchForm/controllerSearchForm'; // отрисовать фильмы по инпуту
import { handleRegisterSub, handleLoginSub, handleChangeUserDataSub, handleLogoutSub, takeUserData } from '../../utils/controllerUser/controllerUser'; // функции для работы с данными пользователя(АПИ)
import { openInfoToolSub, closeInfoToolSub, listenInfoToolClose } from '../../utils/infoToollControl/infoToollControl'; // функции инфотула

function App() {

  const [stateAccauntActive, setStateAccauntActive] = useState(true); // для отображения футера
  const [loading, setLoading] = useState(false); // для отображения лоадера ( определять идет загрузка или нет)
  const [isTextMassageInfoTool, setTextMassageInfoTool] = useState(''); // текс в инфотул
  const [isAuth, setIsAuth] = useState(true); // проверить авторизован ли пользователь для защиты путей и отображения кнопок в хедере
  const [isLoggin, setIsLoggin] = useState(false); // проверять выполнен ли вход для редиректа после входа
  const [isRegister, setIsRegister] = useState(false); // проверять выполнена ли регистрация для редиректа на вход
  const [isInfoToolOpen, setIsInfoToolOpen] = useState(false); // стейт для открытия информационного окна
  const [isUserInfo, setIsUserInfo] = useState({}) // данные юзера
  const [isMoviesArray, setIsMoviesArray] = useState([]) // фильмы со сторонненго АПИ
  const [isSavedMoviesArray, setIsSavedMoviesArray] = useState([]) // сохраненные фильмы
  const [isFindMovies, setIsFindMovies] = useState([]) // найденные фильмы
  const [isFindMoviesOn, setIsFindMoviesOn] = useState(false); // проверить произведен или нет поиск
  const [isURL, setIsURL] = useState('') // URL 
  const [isSubmitFindMovies, setIsSubmitFindMovies] = useState(false);
  const [isDataRegister, setIsDataRegister] = useState([]); // данные для автоматического входа после регистрации
  const [test, settest] = useState([]);
  const location = useLocation();

  // общие функции
  function openInfoTool(text) { // открыть инфотул
    openInfoToolSub(text, setIsInfoToolOpen, setTextMassageInfoTool)
  }

  function handlePageAccaunt() { // следить за открытием страницы аккаунта для скрытия футера
    setStateAccauntActive(false);
  }

  //...Работа со своим Апи(получение и редактирование инф на сервере: данные пользователя, сохраненные фильмы пользователем)...

  //удаление фильма из сохраненных
  function handleMoviesDelete(movieId) {
    handleMoviesDeleteSub(setLoading, movieId, apiMain, setIsSavedMoviesArray)
  }

  //отправка фильма на сервер и обновление стейта для отрисовки 
  function handleAddMovies(data) {
    handleAddMoviesSub(isMoviesArray, data, apiMain, setIsSavedMoviesArray, isSavedMoviesArray, setLoading)
  }

  //...Регистрация и Авторизация...

  function handleRegister(data) { //пробросить данные для регистрации через АПИ
    handleRegisterSub(data, apiMain, openInfoTool, setIsRegister, setIsDataRegister)
  };

  function handleLogin(dataUser) { //пробросить данные из инпутов и отправить на сервер для авторизации пользователя
    handleLoginSub(dataUser, apiMain, openInfoTool, setIsLoggin, setIsAuth)
  };

  function handleLogout() { //  разлогиниться
    handleLogoutSub(apiMain, setIsUserInfo, setIsAuth, setIsLoggin, setIsInfoToolOpen, openInfoTool, setIsFindMovies)
  }

  function handleChangeUserData(dataUser) { // редактировать данные пользователя
    handleChangeUserDataSub(dataUser, apiMain, setIsUserInfo, openInfoTool)
  }

  function handleSearchMovies(nameMovie) { // вернуть массив фильмов с совпадением из инпута
    handleSearchMoviesSub(
      nameMovie,
      isMoviesArray,
      openInfoTool,
      setIsMoviesArray,
      MovieApi,
      isURL,
      setIsFindMoviesOn,
      setIsSubmitFindMovies,
      setLoading
    );
  }

  function handleSearchSavedMovies(nameMovie) { // вернуть массив фильмов с совпадением из инпута
    handleSearchMoviesSub(nameMovie, isSavedMoviesArray, openInfoTool, setIsSavedMoviesArray, MovieApi, isURL);
  }

  function closeInfoTool() { // свернуть инфотул
    closeInfoToolSub(setIsInfoToolOpen, setTextMassageInfoTool)
  }

  //закрыть инфотул на оверлей или эск 
  function handleCloseInfoTool(e) {
    if (e.key === "Escape" || e.target.classList.contains('info-tooltip__overlay')) {
      closeInfoTool(e);
    }
  }

  useEffect(() => { //проверка авторизации пользователя через получение текущей информации о пользователе
    takeUserData(apiMain, setIsUserInfo, setIsAuth, setIsLoggin)
  }, [isLoggin])

  useEffect(() => { // слушатели на закрытие инфотул 
    listenInfoToolClose(isInfoToolOpen, handleCloseInfoTool); // свернуть на esc или клик на оверлей
  }, [isInfoToolOpen])

  useEffect(() => { // получить фильмы со стороннего АПИ
    takeMovies(setLoading, MovieApi, setIsMoviesArray)
  }, [])

  useEffect(() => { // получить фильмы сохраненные
    takeMoviesSaved(apiMain, setIsSavedMoviesArray);
    if (location.pathname !== '/saved-movies') { // обновить стейт при уходе со страницы для отображения всех сохр фильмов
      takeMoviesSaved(apiMain, setIsSavedMoviesArray);
    }
  }, [isLoggin, location])

  useEffect(() => { // следить за URL 
    setIsURL(location.pathname)
  }, [location])

  useEffect(() => {
    setIsFindMovies(JSON.parse(localStorage.getItem('moviesFind')))
    if (JSON.parse(localStorage.getItem('moviesFind')) !== null) {
      setIsFindMoviesOn(true)
    }
    setTimeout(setIsSubmitFindMovies(false), 1000);
  }, [isSubmitFindMovies])

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(isSavedMoviesArray))
  }, [isSavedMoviesArray])

  useEffect(() => { // автоматический вход после регистрации
    if (isRegister) {
      handleLogin(isDataRegister)
    }
  }, [isRegister, isDataRegister])


  useEffect(() => { // получить фильмы из хранилища и проставить избранное
      settest(isSavedMoviesArray.map((movie) => movie.movieId)) // вернуть новый массив из айди добавленных в избранное фильмов
  }, [location, isSavedMoviesArray])

  return (
    <currentUserContext.Provider value={isUserInfo}>
      <div className="app">
        <Header loggedInState={isAuth} handlePageAccaunt={handlePageAccaunt} />
        <main className="app">
          <NavTab />
          <InfoTooltip isOpen={isInfoToolOpen} text={isTextMassageInfoTool} isClose={closeInfoTool} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path={"/signin"} element={isLoggin ? <Navigate to="/movies" replace /> : <Login onLogin={handleLogin} setIsLoggin={setIsLoggin} />} />
            <Route path={"/signup"} element={isRegister ? <Navigate to="/signin" replace /> : <Register onRegister={handleRegister} />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/movies" element={
              isAuth ?
                <Movies
                  handleClickFavoriteMovies={handleAddMovies}
                  handleClickFavoriteMoviesDelete={handleMoviesDelete}
                  movies={isFindMoviesOn ? isFindMovies : isMoviesArray} // если производился поиск, то массив найденных фильмов
                  onSubmitSearch={handleSearchMovies}
                  SavedMoviesArray={isSavedMoviesArray} // прокинуть сохраненные фильмы из локалстор
                  loading={loading}
                /> : <Navigate to="/" replace />
            }
            />
            <Route path="/saved-movies" element=
              {isAuth ?
                <SavedMovies
                  test={1}
                  onSubmitSearch={handleSearchSavedMovies}
                  handleClickFavoriteMovies={handleMoviesDelete}
                  movies={isSavedMoviesArray} /> // прокинуть сохраненные фильмы из локалстор
                : <Navigate to="/" replace />} />
            <Route path="/profile" element={isAuth ? <Profile onSubmit={handleChangeUserData} logout={handleLogout} /> : <Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer stateShowFooter={stateAccauntActive} />
      </div>
    </currentUserContext.Provider >
  );
}

export default App;
