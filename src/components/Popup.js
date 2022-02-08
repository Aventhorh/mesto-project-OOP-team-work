export default class Popup {
  _escape = "Escape";
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopupButton = this._popupElement.querySelector(".popup__button-close");
    this.close = this.close.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }
  open() {
    document.addEventListener("keydown", this._handleClose);
    this._popupElement.classList.add("popup_opened");
  }
  close() {
    document.removeEventListener("keydown", this._handleClose);
    this._popupElement.classList.remove("popup_opened");
  }
  _handleClose(evt) {
    if (evt.key === this._escape || evt.target === this._popupElement || evt.target === this._closePopupButton) {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("click", this._handleClose);
    this._closePopupButton.addEventListener("click", this._handleClose);
  }
}