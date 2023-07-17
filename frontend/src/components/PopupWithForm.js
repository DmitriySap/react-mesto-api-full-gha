import React from 'react';

function PopupWithForm({title, name, isPopupOpen, onClose, children, buttonText, onSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isPopupOpen ? 'popup_type_is-open' : ''}`}>
        <div className="popup__overlay popup__overlay_type_edit-name"></div>
        <div className="popup__content">
            <button type = "button" className={`popup__close popup__close_type_${name}`} onClick = {onClose}></button>
            <h3 className="popup__title">{title}</h3>
            <form name = {`${name}-form`} className={`popup__form popup__form_type_${name}`} onSubmit = {onSubmit} noValidate>
                {children}
                <button type = "submit" className="popup__save-button" id = "submit">{buttonText}</button>
            </form>
      </div>
    </div>
    );
}

export default PopupWithForm;