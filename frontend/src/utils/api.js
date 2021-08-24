class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        this.addLike = this.addLike.bind(this);
        this.deleteLike = this.deleteLike.bind(this);
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
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    editPersonalProfile(data) { // запрагиваем  измение инфомуции о user и сохранении его на сервере
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
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
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    addNewCard(data) { // запрашиваем добавить новую карточку на сервер 
        return fetch (`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._handleResponse);
    }

    addLike(id) { // запрашиваем постановить лайк
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    deleteLike(id) { // запрашиваем удалить лайка 
        return fetch(`${this._url}/cards/likes/${id}`, {
           method: 'DELETE',
           headers: this._headers
        })
        .then(this._handleResponse);
    }

    deleteCard(id) { // запрашиваем уделить карточку с сервера
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }
}

const api = new Api ({
    url: "https://mesto.nomoreparties.co/v1/cohort-24",
    headers: {
        authorization: "7dfaf4c9-82d9-4096-b562-ec8631a23ab5",
        "Content-Type": "application/json",
    },
})

export default api;