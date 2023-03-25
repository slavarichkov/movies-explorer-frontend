import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

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
import MovieApi from '../../utils/MoviesApi/MoviesApi'; // сторонний АПИ для получения срписка фильмов

function App() {

  const [stateAccauntActive, setStateAccauntActive] = useState(true);
  const [loading, setLoading] = useState(false); // отображение лоадера
  const [movies, setMovies] = useState([]);
  const [isTextMassageInfoTool, setTextMassageInfoTool] = useState(''); // текс в инфотул
  const [isAuth, setIsAuth] = useState(false); // проверить авторизован ли пользователь для защиты путей и отображения кнопок в хедере
  const [isInfoTool, setIsInfoTool] = useState(false); // стейт для открытия информационного окна
  const [isUserInfo, setIsUserInfo] = useState({}) // данные юзера
  const [isLoggin, setIsLoggin] = useState(false); // проверять выполнен ли вход для редиректа после входа
  const [isRegister, setIsRegister] = useState(false); // проверять выполнена ли регистрация для редиректа на вход
  const [isMoviesArray, setIsMoviesArray] = useState([]) // фильмы со сторонненго АПИ


  function handlePageAccaunt() { // следить за открытием страницы аккаунта для скрытия футера
    setStateAccauntActive(false);
  }

  //...Работа со своим Апи(получение и редактирование инф на сервере: данные пользователя, сохраненные фильмы пользователем)...

  //удаление фильма
  function handleMoviesDelete(movieId) {
    setLoading(true);
    apiMain.deleteCard(movieId)
      .then(() => {
        setLoading(false);
        setMovies((movies) => movies.filter((m) => m._id !== movieId)) // возвращаем новый список без удаленного фильма
      }).catch((err) => {
        console.log(err);
      })
  }

  //отправка фильма на сервер и обновление стейта для отрисовки 
  function handleAddMovies(data) {
    setLoading(true);
    apiMain.sendImages(data)
      .then((newMovie) => {
        setMovies([newMovie, ...movies]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }

  //...Регистрация и Авторизация...

  //пробросить данные для регистрации через АПИ
  function handleRegister(data) {
    apiMain.register(data)
      .then((data) => {
        console.log(data);
        //записать в переменную ошибку -> вывести в инф.окно
        let messageError = data.message;
        if (Object.keys(data).includes('message')) { messageError = data.message }
        else if (Object.keys(data).includes('error')) { messageError = data.error }
        //проверить ответ сервера на содержание, есть ли ошибки
        if (Object.keys(data).includes('message') || Object.keys(data).includes('error')) {
          setTextMassageInfoTool(messageError); // передать текст ошибки в инф.окно
          setIsInfoTool(true)
        } else {
          setIsAuth(true) // подтвердить авторизацию для защиты роутов
          setIsInfoTool(true); // при положительном ответе открыть попап подверждения регистрации
          setTextMassageInfoTool("Регистрация прошла успешно"); // передать текст в инф.окно
          setIsRegister(true) // для редиректа на вход
          setTimeout(() => { // закрыть подверждение через 3 сек.
            setIsInfoTool(false);
            setIsRegister(false)
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //пробросить данные из инпутов и отправить на сервер для авторизации пользователя
  function handleLogin(dataUser) {
    apiMain.login(dataUser)
      .then((data) => {
        if (data.message === 'Неправильная почта или пароль') {
          setIsInfoTool(true);
          setTextMassageInfoTool(data.message); // передать текст ошибки в инф.окно
        } else {
          setIsInfoTool(true); // при положительном ответе открыть попап подверждения регистрации
          setTextMassageInfoTool("Вы успешно авторизованы"); // передать текст в инф.окно
          setIsLoggin(true);
          setTimeout(() => { // закрыть подверждение через 3 сек.
            setIsInfoTool(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function closeInfoTool() { // свернуть инфотул
    setIsInfoTool(false);
    setTextMassageInfoTool('')
  }

  //закрыть инфотул на оверлей или эск 
  function handleCloseInfoTool(e) {
    if (e.key === "Escape" || e.target.classList.contains('info-tooltip__overlay')) {
      closeInfoTool(e);
    }
  }

  function handleChangeUserData(dataUser) { // редактировать данные пользователя
    apiMain.sendUserInfo(dataUser).then((data) => {
      setIsUserInfo(data.data)
      setIsInfoTool(true); // при положительном ответе открыть инфотул
      setTextMassageInfoTool("Данные скорректированы"); // передать текст в инф.окно
      setTimeout(() => { // закрыть подверждение через 3 сек.
        setIsInfoTool(false);
      }, 3000);
    }).catch((err) => {
      setIsAuth(false);
      setTextMassageInfoTool("");
      console.log(err);
    });
  }

  function handleLogout() {
    apiMain.logout().then(() => {
      setIsUserInfo({});
      setIsAuth(false);
      setIsLoggin(false);
      setIsInfoTool(true); // при положительном ответе открыть инфотул
      setTextMassageInfoTool("Вы вышли из аккаунта"); // передать текст в инф.окно
      setTimeout(() => { // закрыть подверждение через 3 сек.
        setIsInfoTool(false);
        setTextMassageInfoTool("");
      }, 3000);
    }).catch((err) => {
      console.log(err);
    });
  }

  //проверка авторизации пользователя через получение текущей информации о пользователе
  useEffect(() => {
    apiMain.getUserInfo().then(
      (data) => {
        setIsUserInfo(data.userData)
        setIsAuth(true);
        setIsLoggin(true);
        console.log("авторизация успешна");
      }
    ).catch((err) => {
      setIsAuth(false);
      console.log(err);
    });
  }, [])

  useEffect(() => { // слушатели на закрытие инфотул 
    if (isInfoTool) {
      document.addEventListener('click', handleCloseInfoTool);
      document.addEventListener('keydown', handleCloseInfoTool);
    } else {
      document.removeEventListener('click', handleCloseInfoTool);
      document.removeEventListener('keydown', handleCloseInfoTool);
    }
  }, [isInfoTool])

  useEffect(() => { // получить фильмы со стороннего АПИ
    MovieApi.getMovies()
      .then((data) => {
        console.log(data);
        setIsMoviesArray(data);
      })
  }, [])

  return (
    <currentUserContext.Provider value={isUserInfo}>
      <div className="app">
        <Header loggedInState={isAuth} handlePageAccaunt={handlePageAccaunt} />
        <main className="app">
          <NavTab />
          <InfoTooltip isOpen={isInfoTool} text={isTextMassageInfoTool} isClose={closeInfoTool} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path={`${isLoggin ? "/" : "/signin"}`} element={<Login onLogin={handleLogin} />} />
            <Route path={`${isLoggin ? "/" : "/signup"}`} element={isLoggin ? <Register onRegister={handleRegister} /> : <Main />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/movies" element={<Movies handleClickFavoriteMovies={handleAddMovies} movies ={isMoviesArray}/>} />
            <Route path="/saved-movies" element={isAuth ? <SavedMovies handleClickFavoriteMovies={handleMoviesDelete} /> : <Main />} />
            <Route path="/profile" element={isAuth ? <Profile onSubmit={handleChangeUserData} logout={handleLogout} /> : <Main />} />
          </Routes>
        </main>
        <Footer stateShowFooter={stateAccauntActive} />
      </div>
    </currentUserContext.Provider >
  );
}

export default App;
