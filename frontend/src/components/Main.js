import React from 'react';
import Card from './Card.js';
import CurrentUserContext from './CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {
    const { name, about, avatar } = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile page__profile">
                <div className="profile__info">
                    <div className="profile__avatar-content">
                        <img src={avatar} alt="Аватар профиля" className="profile__avatar" />
                        <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
                    </div>
                    <div className="profile__text">
                        <div className="profile__name-edit">
                            <h1 className="profile__name">{name}</h1>
                            <button type = "button" className="profile__edit-button" onClick={onEditProfile}>
                            </button>
                        </div>
                        <h2 className="profile__description">{about}</h2>
                    </div>
                </div>
                    <button type = "button" className="profile__add-button" onClick={onAddPlace}>
                    </button>
            </section>
            <section className="cards page__cards">
                    {cards.map(card => { 
                        return (
                            <Card title = {card.name} 
                                  key = {card._id} 
                                  link = {card.link} 
                                  likes = {card.likes.length} 
                                  onCardClick = {onCardClick} 
                                  card = {card} 
                                  onCardLike = {onCardLike} 
                                  onCardDelete = {onCardDelete}
                            />
                        )
                    })}
            </section>
        </main>
    );
}

export default Main;