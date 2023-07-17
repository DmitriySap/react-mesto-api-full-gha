export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
};

export const apiData = {
  host: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: 'dcded44e-0130-46c5-aa5b-22f4493838c0',
                   'Content-Type': 'application/json'
  }
}