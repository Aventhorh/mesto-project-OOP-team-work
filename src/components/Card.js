export default class Card {
  constructor({ data, handleCardClick, handleLikeToggle, handleDeleteCard }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;

    this._userId = data.currentUserId;

    this._handleCardClick = handleCardClick;
    this._handleLikeToggle = handleLikeToggle;
    this._handleDeleteCard = handleDeleteCard;

    this._cardSelector = cardSelector;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  checkLike() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _updateLike() {
    this._countLike.textContent = this._likes.length;

    if (this.checkLike()) this._likeButton.classList.add('photo-grid__like-button_active');
    else
    this._likeButton.classList.remove('photo-grid__like-button_active');
  }

  _setEventListeners() {
    const _this = this;
    _this._deleteButton.addEventListener('click', () => _this._handleDeleteCard());
    _this._likeButton.addEventListener('click', () => _this._handleLikeToggle());
    _this._gridImage.addEventListener('click', () => _this._handleCardClick());
  }

  removeCard() {
    this._element.remove();
  }

  createCard() {
    this._element = this._getTemplate();
    this._countLike = this._element.querySelector('.photo-grid__count-like');
    this._likeButton = this._element.querySelector('.photo-grid__like-button');
    this._deleteButton = this._element.querySelector('.photo-grid__delete-button');
    this._gridImage = this._element.querySelector('.photo-grid__image');
    this._imageTitle = this._element.querySelector('.photo-grid__image-title');
    
    this._setEventListeners();
    this._updateLike();

    if(this._userId === this._ownerId) {
      this._deleteButton.classList.add('photo-grid__delete-button_active');
    }

    const img = this._gridImage;
    img.src = this._link;
    img.alt = this._name;

    this._imageTitle.textContent = this._name;

    return this._element;

  }

  setLike(data) {
    this._likes = data.likes;
    this._updateLike();
  }

  getCardId() {
    return this._cardId;
  }
}
