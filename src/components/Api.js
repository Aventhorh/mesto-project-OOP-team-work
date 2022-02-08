export default class Api {
    constructor(options) {
        this._options = options;
    }

    _checkResponse = (response) => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`Ошибка: ${response.status}`)
    }

    getCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: this._options.headers
        })
            .then(this._checkResponse)
    }

    getUser() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: this._options.headers
        })
            .then(this._checkResponse)
    }

    addServerCard(nameCard, linkCard) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: nameCard,
                link: linkCard,
            })
        })
            .then(this._checkResponse)
    }

    delServerCard(cardId) {
        return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._options.headers
        })
    }

    getLikes(cardId) {
        return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
            headers: this._options.headers
        })
            .then(this._checkResponse)
    }

    addLike(cardId) {
        return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._options.headers,
        })
            .then(this._checkResponse)
    }

    delLike(cardId) {
        return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._options.headers,
        })
            .then(this._checkResponse)
    }

    addServerUserData(userName, userAbout) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })
            .then(this._checkResponse)
    }

    addServerUserImage(userImage) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: userImage
            })
        })
            .then(this._checkResponse)
    }
}