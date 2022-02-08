export default class FormValidator {
  constructor({
    formSectionSelector,
    inputSelector,
    inputTextError,
    submitButtonSelector,
    inputErrorClass,
    errorClass },
    form) {
    this._formSectionSelector = formSectionSelector   //   '.popup__form-section',
    this._inputSelector = inputSelector         //  '.popup__input-text',
    this._inputTextError = inputTextError        //  '.popup__input-text-error',
    this._submitButtonSelector = submitButtonSelector  //    '.popup__button-submit',
    this._inputErrorClass = inputErrorClass         //  'popup__input-text_color_error',
    this._errorClass = errorClass             //  'popup__input-text-error_active',
    this._form = document.querySelector(`${form}`)
  }

  // Показываем текст и стили ошибки ввода
  _showInputError = (inputElement, errorMessage) => {
    const errorMessageElement = inputElement.closest(this._formSectionSelector).querySelector(this._inputTextError);

    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.classList.add(this._errorClass);
    errorMessageElement.textContent = errorMessage;
  }

  // Скрываем текст и стили ошибки ввода
  _hideInputError = (inputElement) => {
    const errorMessageElement = inputElement.closest(this._formSectionSelector).querySelector(this._inputTextError);
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.classList.remove(this._errorClass);
    errorMessageElement.textContent = '';
  }

  // Показываем / скрываем текст и стили ошибки ввода
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Проверка полей формы на валидность
  _hasInvalidInput() {
    return this._inputListArray.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Делаем кнопку submit неактивной если хотя бы одно поле не валидно
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.removeAttribute('disabled');
    }
  }

   // Делаем кнопку submit неактивной если хотя бы одно поле не валидно
  resetValidation() {
    this._submitButton.setAttribute('disabled', true);
    this._inputListArray.forEach((inputItem) => {
      this._hideInputError(inputItem);
    });
  }

  // Вешаем события input на все поля формы
  _setEventListeners = () => {
    const _this = this;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputListArray = Array.from(this._form.querySelectorAll(this._inputSelector));



    this._toggleButtonState();

    this._inputListArray.forEach(inputElement => {
      inputElement.addEventListener('input', function(){
        _this._checkInputValidity(inputElement);
        _this._toggleButtonState();
      });
    });
  }

  // Подключение валидации ко всем формам
  enableValidation() {
    this._setEventListeners();
  }
}
