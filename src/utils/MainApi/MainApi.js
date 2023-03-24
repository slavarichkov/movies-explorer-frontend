class Api {
    constructor(data) {
        this.host = data.host;
    }

    // проверка статуса запроса
    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(
                `ошибка: ${res.status} - ${res.statusText}`
            );
        }
    }
    //ДАННЫЕ ПОЛЬЗОВАТЕЛЕЙ**
    //пробросить данные для регистрации через АПИ
    register(data) {
        return fetch(`${this.host}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.name, email: data.email, password: data.password, })
        }).then((res) => res.json())
            .catch((err) => console.log(err))
    };

    //пробросить данные из инпутов и отправить на сервер для авторизации пользователя
    login(dataUser) {
        return fetch(`${this.host}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                password: dataUser.password,
                email: dataUser.email,
            })
        }).then((res) => { return res.json() })
            .catch((err) => console.log(err))
    };

    //запрос на сервер для авторизации
    getToken(tkn) {
        return fetch(`${this.host}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tkn}`,
            }
        }).then((res) => res.json())
            .catch((err) => console.log(err))
    }

    // запрос данных пользователя
    getUserInfo() {
        return fetch(`${this.host}/users/me`,
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then((res) => this._getResponse(res))
    }

    // отправка данных пользователя для обновления
    sendUserInfo(data) {
        return fetch(`${this.host}users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.name, email: data.email, password: data.password, }),
        }).then((res) => this._getResponse(res));
    }

    //ФИЛЬМЫ**
    //запрос фильмов с сервера 
    getMovies() {
        return fetch(`${this.host}/movies`).then((res) => this._getResponse(res));
    }

    // отправка фильма в избранное на сервер 
    sendMovies(data) {
        return fetch(`${this.host}movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: data.image,
                trailer: data.trailer,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
                thumbnail: data.thumbnail,
                movieId: data.movieId,
                trailerLink: data.trailerLink,
            }),
        }).then((res) => this._getResponse(res));
    }

    //удалить фильм
    deleteMovie(data) {
        return fetch(`${this.host}movies/${data}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            }
        }).then((res) => this._getResponse(res));
    }
}

const apiMain = new Api({
    host: 'http://localhost:3001',
});

export default apiMain;