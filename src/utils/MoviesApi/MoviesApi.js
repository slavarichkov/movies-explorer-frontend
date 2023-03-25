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
    //ФИЛЬМЫ**
    //запрос фильмов с сервера 
    getMovies() {
        return fetch(`${this.host}`).then((res) => this._getResponse(res));
    }

}

const MovieApi = new Api({
    host: ' https://api.nomoreparties.co/beatfilm-movies',
});

export default MovieApi;