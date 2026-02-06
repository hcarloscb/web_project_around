export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  _getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialData() {
    return Promise.all([this._getUserInfo(), this._getInitialCards()]);
  }

  postNewPlace({ titulo, enlace }) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: titulo,
        link: enlace,
      }),
    }).then(this._checkResponse);
  }

  patchUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  patchEditAvatar({ avatarurl }) {
    return fetch(`${this._baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarurl,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  putLike(card, methodLike) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: methodLike,
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
