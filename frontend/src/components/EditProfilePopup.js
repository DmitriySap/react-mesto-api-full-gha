import React from 'react';
import CurrentUserContext from './CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser(name, description);
    };

    return (
        <PopupWithForm
            title = "Редактировать профиль"
            name = "edit-name"
            isPopupOpen={isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            children = {
                <>
                    <input id = "name-input" 
                          type="text" 
                          name = "firstname" 
                          placeholder = "Имя" 
                          className="popup__input popup__input_content_name" 
                          required 
                          minLength="2" 
                          maxLength="40" 
                          value = {name || ''} 
                          onChange = {(e) => setName(e.target.value)}
                    />
                    <span className = "name-input-error popup__input-error"></span>
                    <input id = "description-input" 
                          type="text" 
                          name = "description" 
                          placeholder = "Описание профиля" 
                          className="popup__input popup__input_content_description" 
                          required 
                          minLength="2" 
                          maxLength="200" 
                          value = {description || ''}
                          onChange = {(e) => setDescription(e.target.value)}
                    />
                    <span className = "description-input-error popup__input-error"></span>
                </>
            }
            buttonText = "Сохранить"
        />
    );
}

export default EditProfilePopup;