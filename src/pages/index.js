import './index.css';
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import { config, selectors, elements, formSelectors, classAction } from '../utils/constants.js';

const api = new Api(config);

const userInfo = new UserInfo(
  selectors.profileName,
  selectors.profileAbout,
  selectors.profileAvatar
);

let userId = null;

const profileFormValidator = new FormValidator(formSelectors, selectors.profilePopupForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(formSelectors, selectors.addPlacePopupForm);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(formSelectors, selectors.avatarPopupForm);
avatarFormValidator.enableValidation();

const imagePopup = new PopupWithImage(selectors.popupImage);
imagePopup.setEventListeners();


function generateCard(cardData) {

  const card = new Card({
    data: { ...cardData, currentUserId: userId },
    handleCardClick: () => {
      imagePopup.open(cardData);
    },
    handleLikeToggle: () => {
      if(card.checkLike()){
        api.delLike(card.getCardId())
        .then((res) => {
          card.setLike(res);
        })
        .catch(err => console.log(`Ошибка при изменении лайка: ${err}`))
      }else{
        api.addLike(card.getCardId())
        .then((res) => {
          card.setLike(res);
        })
        .catch(err => console.log(`Ошибка при изменении лайка: ${err}`))
      }
    },
    handleDeleteCard: () => {
      api.delServerCard(card.getCardId())
        .then(() => card.removeCard())
        .catch(err => console.log(`Ошибка при удалении карты: ${err}`))
    }
  },
    selectors.cardTemplate
  )
  return card.createCard();
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(generateCard(item));
  }
},
  selectors.cardWrap
);

const addCardPopup = new PopupWithForm({
  popupSelector: selectors.addPlacePopup,
  handleFormSubmit: (data) => {
    addCardPopup.renderLoading('Создание...');
    api.addServerCard(data.names, data.link)
      .then(cardData => {
        cardList.addItem(generateCard(cardData));
        addCardPopup.close();
      })
      .catch(err => console.log(`Ошибка при добавлении новой карточки: ${err}`))
      .finally(() => addCardPopup.renderLoading())
  }
})
addCardPopup.setEventListeners();

const editUserPopup = new PopupWithForm({
  popupSelector: selectors.profilePopup,
  handleFormSubmit: (data, event) => {
    editUserPopup.renderLoading('Сохранение...');
    api.addServerUserData(data.names, data.description)
      .then(userData => {
        userInfo.setUserInfo({
          name: userData.name,
          about: userData.about
        })
        editUserPopup.close();
      })
      .catch(err => console.log(`Ошибка при редактировании данных пользователя: ${err}`))
      .finally(() => {
        editUserPopup.renderLoading();
      })
  }
})
editUserPopup.setEventListeners();


const editAvatarPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopup,
  handleFormSubmit: (data) => {
    editAvatarPopup.renderLoading('Сохранение...');
    api.addServerUserImage(data.avatar)
      .then(avatarData => {
        userInfo.setUserInfo({
          avatar: avatarData.avatar
        })
        editAvatarPopup.close();
      })
      .catch(err => console.log(`Ошибка при смене аватара: ${err}`))
      .finally(() => {
        editAvatarPopup.renderLoading();
      })
  }
})
editAvatarPopup.setEventListeners();

elements.profileEditButton.addEventListener('click', () => {
  const currentUser = userInfo.getUserInfo();
  elements.profileNameInput.value = currentUser.name;
  elements.profileAboutInput.value = currentUser.about;
  profileFormValidator.resetValidation();
  editUserPopup.open();
})



elements.addPlaceButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  addCardPopup.open();
})

elements.changeAvatarButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  editAvatarPopup.open();
})

elements.profileAvatarWraper.addEventListener('mouseover', () => {
  elements.changeAvatarButton.classList.add(classAction.profileAvatarCoverActive);
});

elements.profileAvatarWraper.addEventListener('mouseout', () => {
  elements.changeAvatarButton.classList.remove(classAction.profileAvatarCoverActive);
});




Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar
    });
    cardList.renderElements(cardData.reverse());
  })
  .catch(err => console.log(`Ошибка при загрузке данных с сервера: ${err}`))



