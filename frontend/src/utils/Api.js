import { apiData } from "./constants";

class Api {
    constructor(options) {
        this._host = options.host;
        this._headers = options.headers;
    };

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        };

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._host}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    };

    getInitialCards() {
        return fetch(`${this._host}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    };

    editProfileInfo(name, about) {
        return fetch(`${this._host}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }
        )
        .then(this._checkResponse);
    };

    addNewCard(name, link) {
        return fetch(`${this._host}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse);
    };

    likeCard(id) {
        return fetch(`${this._host}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse)
    };

    dislikeCard(id) {
        return fetch(`${this._host}/cards/${id}/likes`, {
            method: 'DELETE',
            headers:this._headers
        })
        .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._host}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    };

    editAvatar(avatar) {
        return fetch(`${this._host}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            })
        }
        )
        .then(this._checkResponse);
    };
};

export const api = new Api(apiData);