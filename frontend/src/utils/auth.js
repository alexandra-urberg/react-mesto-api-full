class Auth {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }
  
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject("We have found an error."`Error: ${res.status}`);
    }
  
    registration(data) {
      return fetch(`${this._url}/signup`, {
        method: "POST",
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._handleResponse);
    }
  
    authorize(data) {
      return fetch(`${this._url}/signin`, {
        method: "POST",
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._handleResponse);
    }
  
    checkToken() {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      }).then(this._handleResponse);
    }
  }
  
  const auth = new Auth({
    url: "https://mesto-alex.nomoredomains.work",

    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
  });
  
  export default auth;