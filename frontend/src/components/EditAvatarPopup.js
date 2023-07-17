import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarEditRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
    
        onUpdateAvatar(avatarEditRef.current.value);
      }

    React.useEffect(() => {
        avatarEditRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm 
            title = "Обновить аватар"
            name = "edit-avatar"
            isPopupOpen={isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            children = {
                <>
                    <input id = "avatar-src-input" 
                          type="url" 
                          name = "link" 
                          placeholder = "Ссылка на картинку" 
                          className="popup__input popup__input_content_src" 
                          ref = {avatarEditRef} 
                          required />
                    <span className = "avatar-src-input-error popup__input-error"></span>
                </>
            }
            buttonText = "Сохранить"
            />    
    );
}

export default EditAvatarPopup;