export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
};

export const apiData = {
  host: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: '3c43febc-58b5-4f7c-a5a1-3f96bf517fca',
                   'Content-Type': 'application/json'
  }
}