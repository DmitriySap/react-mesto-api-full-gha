import React from 'react';

function ImagePopup({isOpen, card, onClose}) {
    return (
        <div className={`popup popup_type_fullscreen-card ${isOpen ? 'popup_type_is-open' : ''}`}>
        <div className="popup__overlay popup__overlay_type_fullscreen-card"></div>
        <div className="popup__content popup__content_type_fullscreen-card">
            <img src={card.link} alt={card.name} className="popup__image" />
            <button type = "button" className="popup__close popup__close_type_fullscreen-card" onClick = {onClose}></button>
            <h3 className="popup__title popup__title_type_fullscreen-card"></h3>
        </div>
    </div>
    );
}

export default ImagePopup;