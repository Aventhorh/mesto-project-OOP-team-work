const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-5',
    headers: {
      authorization: '3be797f9-70dc-42fa-b0da-c26b30e14c85',
        'Content-Type': 'application/json'
  }
}

const selectors = {
  profileAvatar:                '.profile__avatar',
  profileName:                  '.profile__name',
  profileAbout:                 '.profile__description',
  popup:                        '.popup',
  profilePopupForm:             '.popup__form_type_profile-edit',
  addPlacePopupForm:            '.popup__form_type_add-place',
  avatarPopupForm:              '.popup__form_type_avatar-edit',
  cardTemplate:                 '.card__template',
  cardWrap:                     '.photo-grid__items',
  addPlacePopup:                '.popup_type_add-place',
  profilePopup:                 '.popup_type_profile-edit',
  avatarPopup:                  '.popup_type_avatar-edit',
  popupImage:                   '.popup_type_view'
}

const elements = {
  profileEditButton:            document.querySelector('.profile__edit-button'),
  profileAvatarWraper:          document.querySelector('.profile__avatar-wraper'),
  changeAvatarButton:           document.querySelector('.profile__avatar-cover'),
  addPlaceButton:               document.querySelector('.profile__add-button'),
  profileNameInput:             document.querySelector('.popup__input_profile_name'),
  profileAboutInput:            document.querySelector('.popup__input_profile_description'),
}

const formSelectors ={
  formSectionSelector:          '.popup__form-section',
  inputSelector:                '.popup__input-text',
  inputTextError:               '.popup__input-text-error',
  submitButtonSelector:         '.popup__button-submit',
  inputErrorClass:              'popup__input-text_color_error',
  errorClass:                   'popup__input-text-error_active'
}

const classAction = {
  profileAvatarCoverActive:             'profile__avatar-cover_active'
}

export {config, selectors, elements, formSelectors, classAction}
