const url = "https://api.saprykind.students.nomoredomains.xyz";

class Auth {
  constructor(options) {
    this._url = options.url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(email, password) {
    return fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  }

  login(email, password) {
    return fetch(`${url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  }

  checkToken(jwt) {
    return fetch(`${url}/users/me`, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._getResponseData);
  }
}

const auth = new Auth(url);
export default auth;
