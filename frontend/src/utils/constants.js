export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
};

export const apiData = {
  host: 'https://api.saprykind.students.nomoredomains.xyz',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
                   'Content-Type': 'application/json'
  }
}