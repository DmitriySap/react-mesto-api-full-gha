import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    const handleAddSubmit = (e) => {
        e.preventDefault()
        onAddPlace(name, link)
    }

    React.useEffect(() => {
        setName('');
        setLink('');
      }, [isOpen]);

    return (
        <PopupWithForm 
            title = "Новое место"
            name = "add-card"
            isPopupOpen={isOpen}
            onSubmit = {handleAddSubmit}
            onClose = {onClose}
            children = {
                <>
                    <input id = "place-name-input" 
                        type="text" 
                        name = "name" 
                        placeholder = "Название" 
                        className="popup__input popup__input_content_title" 
                        required 
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                        minLength="2" 
                        maxLength="30" />
                    <span className = "place-name-input-error popup__input-error"></span>
                    <input id = "place-src-input" 
                        type="url" 
                        name = "link" 
                        placeholder = "Ссылка на картинку" 
                        className="popup__input popup__input_content_src" 
                        value = {link}
                        onChange = {(e) => setLink(e.target.value)}
                        required />
                    <span className = "place-src-input-error popup__input-error"></span>
                </>
            }
            buttonText = "Создать"
        />
    );
}

export default AddPlacePopup;