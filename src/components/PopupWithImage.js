import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._titleElement = this._popupElement.querySelector(".popup__caption");
  }

  open({name, link}) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._titleElement.textContent = name;
    super.open();
  }
}
