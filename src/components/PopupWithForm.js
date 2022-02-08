import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._popupElement.querySelector('.popup__button-submit');
    this._buttonDefaultText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll('.popup__input-text');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const _this = this;
      _this._handleFormSubmit(_this._getInputValues());
    })
    super.setEventListeners();
  }
  close() {
    this._form.reset();
    super.close();
  }
  renderLoading(nameButton = this._buttonDefaultText) {
    this._submitButton.textContent = nameButton;
  }
}
