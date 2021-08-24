export const validSelectors = {
  formSelector: document.querySelectorAll('.popup__form-container'), ///формы блоков popup
  inputSelector: '.popup__input', // инпуты блоков popup
  submitButtonSelector: '.popup__save-button', // кноки submit/type popup
  inactiveButtonClass: 'popup__button_disabled', //класс добавляемый в кнопку submit/type popup для того чтобы кнопка не работала
  inputErrorClass: 'popup__input-error_active', //класс добавляемый в input при ошибке валидации
  errorClass: 'popup__input-error' //класс добавляемый в span для вывода ошибки при валидации
}
/// Popup Profile ///
export const openPopupProfileBtn = document.querySelector('#popup-profile__open-button'); //кнопка, вызывающая Popup Profile окно
export const popupProfileBlock = document.querySelector('#popup-profile'); //блок Popup Profile
export const nameInput = document.querySelector('#input-name'); //input "name"
export const jobInput = document.querySelector('#input-job'); // input "job"
export const popupForm = document.querySelector('#popup__form'); //форма блока PopUp Profile
// Popup Image ///
export const openPopupImageBtn = document.querySelector('#popup-image__open-button'); //кнопка открывающая блок Popup Image
export const popupImage = document.querySelector('#popup-image'); // блок Popup Image
export const popupImageForm = document.querySelector('#popup__image-form'); // переменная куда будет вноиться информаци о картинках и ссылки
//Popup Avatar//
export const popupEditAvatar = document.querySelector('#popup-avatar'); // блок Popup Avatar
export const openButtonPopupAatar = document.querySelector('#profile__avatar-button'); //кнопка, вызывающая Popup Porofile-avatar
export const popupAvatarForm = popupEditAvatar.querySelector('#popup__avatar-form');
/// Template ///
export const template = document.querySelector('#template'); //template 
export const popupImageContainer = document.querySelector('#template__container'); // переменная в которую будем добавлять карточки
/// Full-size picture ///
export const imagePopup = document.querySelector('#image'); // блок image (увеличение фотографий)
/// Delete Popup ///
export const popupDeleteCard = document.querySelector('#popup-card-delete');// блок попапа для удаления карточки