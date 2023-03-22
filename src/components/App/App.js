import React, { useState } from 'react';
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

function App() {

  const [loggedIn, setLoggedIn] = useState(false); // для отображения в хедере кнопок вход и рег изменить на false
  const [stateAccauntActive, setStateAccauntActive] = useState(true);

  // выйти из аккаунта (пробрасывается из Header) 
  function handleLogginOut(data) {
    setLoggedIn(data);
    localStorage.clear();
  }

  function handlePageAccaunt() { // следить за открытием страницы аккаунта для скрытия футера
    setStateAccauntActive(false);
  }

  return (
    <div className="app">
      <Header loggedInState={loggedIn} handlePageAccaunt={handlePageAccaunt} />
      <main className="app">
        <NavTab />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/profile" element={<Profile nameUser="Виталий" />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer stateShowFooter={stateAccauntActive} />
    </div>
  );
}

export default App;
