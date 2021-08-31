class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        // this.addLike = this.addLike.bind(this);
        // this.deleteLike = this.deleteLike.bind(this);
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject('We have found an error.' `Error: ${res.status}`);
    }

    getPersonalInformation() { //запрашиваем информацию с сервера о user/users
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    editPersonalProfile(data) { // запрагиваем  измение инфомуции о user и сохранении его на сервере
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._handleResponse);
    }

    editAvatar(link) { //запрашиваем изменить avatar оf user и сохраненить его на сервере
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._handleResponse);
    }

    getInitialCards() { //запрашиваем все карточки с фотографиями из сервера 
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    addNewCard(data) { // запрашиваем добавить новую карточку на сервер 
        return fetch (`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._handleResponse);
    }

    addDeleteLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: isLiked ? 'DELETE' : 'PUT',
            credentials: 'include', // не забываем про include для cookies, чтобы не вылезала ошибка об авторизации
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    deleteCard(cardId) { // запрашиваем уделить карточку с сервера
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._handleResponse);
    }
}

const api = new Api ({
    url: "https://mesto-alex.nomoredomains.work",
    headers: {
        "Content-Type": "application/json",
    },
})

export default api;