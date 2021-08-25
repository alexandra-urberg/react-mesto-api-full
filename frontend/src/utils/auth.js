class Auth {
    constructor(options) {
        this._url = options.url;
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
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this._handleResponse);
    }

    authorize(data) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this._handleResponse);
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(this._handleResponse);
    }
}

const auth = new Auth({
    url: "http://mesa-alex.nomoredomains.work/"
})

export default auth;