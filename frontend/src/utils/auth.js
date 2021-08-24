class Auth {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject('We have found an error.' `Error: ${res.status}`);
    }

    registration(data) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._handleResponse);
    }

    authorize(data) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._handleResponse);
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(this._handleResponse);
    }
}

const auth = new Auth({
    url: "https://auth.nomoreparties.co",
    headers: {
        "Content-Type": "application/json"
    }
})

export default auth;