function takeUserData(apiMain, setIsUserInfo, setIsAuth, setIsLoggin) {
    apiMain.getUserInfo().then(
        (data) => {
            setIsUserInfo(data.userData)
            setIsAuth(true);
            setIsLoggin(true);
        }
    ).catch((err) => {
        setIsAuth(false);
        console.log(err);
    });
}

function handleRegisterSub(data, apiMain, openInfoTool, setIsRegister) { //пробросить данные для регистрации через АПИ
    apiMain.register(data)
        .then((data) => {
            //записать в переменную ошибку -> вывести в инф.окно
            let messageError = data.message;
            if (Object.keys(data).includes('message')) { messageError = data.message }
            else if (Object.keys(data).includes('error')) { messageError = data.error }
            //проверить ответ сервера на содержание, есть ли ошибки
            if (Object.keys(data).includes('message') || Object.keys(data).includes('error')) {
                openInfoTool(messageError); // сообщить об ошибке
            } else {
                setIsRegister(true) // для редиректа на вход
                openInfoTool("Регистрация прошла успешно") // сообщить о регистрации
                setTimeout(() => { // убрать переадресацию на логин
                    setIsRegister(false);
                }, 3000);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

function handleLoginSub(dataUser, apiMain, openInfoTool, setIsLoggin, setIsAuth) { //пробросить данные из инпутов и отправить на сервер для авторизации пользователя
    apiMain.login(dataUser)
        .then((data) => {
            if (data.message === 'Неправильная почта или пароль') {
                openInfoTool(data.message) // передать текст ошибки в инф.окно
            } else {
                setIsLoggin(true);
                setIsAuth(true);
                openInfoTool("Вы успешно авторизованы") // при положительном ответе открыть попап подверждения авторизации
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

function handleChangeUserDataSub(dataUser, apiMain, setIsUserInfo, openInfoTool) { // редактировать данные пользователя
    apiMain.sendUserInfo(dataUser).then((data) => {
        setIsUserInfo(data.data) // обновить данные на странице 
        openInfoTool("Выполнено")
    }).catch((err) => {
        openInfoTool("Произошла ошибка, проверьте данные");
        console.log(err);
    });
}

function handleLogoutSub(apiMain, setIsUserInfo, setIsAuth, setIsLoggin, setIsInfoTool, openInfoTool) { // разлогиниться
    apiMain.logout().then(() => {
        localStorage.clear(); 
        setIsUserInfo({});
        setIsAuth(false);
        setIsLoggin(false);
        setIsInfoTool(true); // при положительном ответе открыть инфотул
        openInfoTool("Вы вышли из аккаунта")
    }).catch((err) => {
        console.log(err);
        openInfoTool("Что-то пошло не так")
    });
}

export { handleRegisterSub, handleChangeUserDataSub, handleLoginSub, handleLogoutSub, takeUserData };