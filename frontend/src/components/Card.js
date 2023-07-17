import React from 'react';
import CurrentUserContext from './CurrentUserContext.js';

function Card({title, link, likes, card, onCardClick, onCardLike, onCardDelete}) {
    const {_id} = React.useContext(CurrentUserContext);
    const isCardOwner = card.owner._id === _id;
    const isCardLike = card.likes.some(i => i._id === _id);
    const cardLikeBtnClassName = `card__like-button ${isCardLike ? 'card__like-button_type_is-active' : ''}`;

    return (
        <div className="card page__card">
            {isCardOwner && 
            <button type = "button" className={`card__delete-button ${isCardOwner ? 'card__delete-button_type_is-active' : ''}`} onClick = {() => onCardDelete(card)}></button>}
            <img src={link} alt={title} className="card__image" onClick = {() => {onCardClick(card)}}/>
            <div className="card__container">
                <h3 className="card__title">{title}</h3>
                <div className="card__like-container">
                    <button type = "button" className={cardLikeBtnClassName} onClick = {() => onCardLike(card)}></button>
                    <p className="card__like-counter">{likes}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;