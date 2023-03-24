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

import apiMain from '../../utils/MainApi/MainApi';

function App() {

  const [loggedIn, setLoggedIn] = useState(false); // для отображения в хедере кнопок вход и рег изменить на false
  const [stateAccauntActive, setStateAccauntActive] = useState(true);
  const [loading, setLoading] = useState(false); // отображение лоадера
  const [movies, setMovies] = useState([]);
  const [isTextMassageInfoTool, setTextMassageInfoTool] = useState(''); // текс в инфотул
  const [isAuth, setIsAuth] = useState(false); // проверить авторизован ли пользователь для защиты путей и отображения кнопок в хедере
  const [isInfoTool, setIsInfoTool] = useState(false); // стейт для открытия информационного окна
  const [isRegisterPopupOpened, setIsRegisterPopupOpened] = useState(false);
  const [registerIn, setRegisterIn] = useState(false);

  // выйти из аккаунта (пробрасывается из Header) 
  function handleLogginOut(data) {
    setLoggedIn(data);
  }

  function handlePageAccaunt() { // следить за открытием страницы аккаунта для скрытия футера
    setStateAccauntActive(false);
  }

  //...Работа с Апи(получение и редактирование инф на сервере: данные пользователя, карточки)...

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
          setTimeout(() => { // закрыть подверждение через 3 сек.
            setIsInfoTool(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  //пробросить данные из инпутов и отправить на сервер для авторизации пользователя
  function handleLogin(dataUser) {
    apiMain.login(dataUser)
      .then((data) => {
        if (data.message === 'Неправильная почта или пароль') {
          setIsInfoTool(true);
          setTextMassageInfoTool(data.message); // передать текст ошибки в инф.окно
        } else {
          console.log(data)
          setIsInfoTool(true); // при положительном ответе открыть попап подверждения регистрации
          setTextMassageInfoTool("Вы успешно авторизованы"); // передать текст в инф.окно
          setTimeout(() => { // закрыть подверждение через 3 сек.
            setIsInfoTool(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //проверка авторизации пользователя через получение текущей информации о пользователе
  useEffect(() => {
    apiMain.getUserInfo().then(
      (data) => { setIsAuth(true); console.log("авторизация успешна"); }
    ).catch((err) => {
      setIsAuth(false);
      console.log(err);
    });
  }, [])

  // выйти из аккаунта (пробрасывается из Header) 
  function handleLogginOut(data) {
    setLoggedIn(data);

  }

  function closeInfoTool() {
    setIsInfoTool(false);
    setTextMassageInfoTool('')
  }


  //закрыть инфотул на оверлей или эск 
  function handleCloseInfoTool(e) {
    if (e.key === "Escape" || e.target.classList.contains('info-tooltip__overlay')) {
      closeInfoTool(e);
    }
  }

  useEffect(() => { // слушатели на закрытие инфотул 
    if (isInfoTool) {
      document.addEventListener('click', handleCloseInfoTool);
      document.addEventListener('keydown', handleCloseInfoTool);
    } else {
      document.removeEventListener('click', handleCloseInfoTool);
      document.removeEventListener('keydown', handleCloseInfoTool);
    }
  }, [isInfoTool])

  return (
    <div className="app">
      <Header loggedInState={loggedIn} handlePageAccaunt={handlePageAccaunt} />
      <main className="app">
        <NavTab />
        <InfoTooltip isOpen={isInfoTool} text={isTextMassageInfoTool} isClose={closeInfoTool} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/movies" element={isAuth ? <Movies handleClickFavoriteMovies={handleAddMovies} /> : <Main />} />
          <Route path="/saved-movies" element={isAuth ? <SavedMovies handleClickFavoriteMovies={handleMoviesDelete} /> : <Main />} />
          <Route path="/profile" element={isAuth ? <Profile nameUser="Виталий" /> : <Main />} />
        </Routes>
      </main>
      <Footer stateShowFooter={stateAccauntActive} />
    </div>
  );
}

export default App;
