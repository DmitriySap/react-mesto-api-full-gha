import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer' ;
import ImagePopup from './ImagePopup';
import CurrentUserContext from './CurrentUserContext';
import '../index.css';
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate } from "react-router-dom";
import auth from '../utils/auth';
import InfoTooltip from './InfoToolTip';
import Login from './Login';
import Register from './Register';
import { ProtectedRoute } from './ProtectedRoute';
import okImg from '../images/okstatus.svg';
import notOkImg from '../images/notokstatus.svg';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isAuthPopup, setAuthPopup] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [infoMessage, setInfoMessage] = React.useState("");
    const [tooltipImage, setTooltipImage] = React.useState("");

    const navigate = useNavigate();

    React.useEffect(() => {
        
        api.getUserInfo()
            .then(res => setCurrentUser(res))
            .catch(err => console.log(err));
        
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then(res => setCards(...cards, res))
            .catch(err => console.log(err))
    }, []);

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({});
        setAuthPopup(false);
    };

    const handleUpdateUser = (name, about) => {
        api.editProfileInfo(name, about)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUpdateAvatar = (avatar) => {
        api.editAvatar(avatar)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleAddPlaceSubmit = (name, link) => {
        api.addNewCard(name, link)
            .then(card => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        isLiked ? api.dislikeCard(card._id, !isLiked)
            .then(newCard => {
                setCards(state => state.map(e => (
                e._id === card._id ? newCard : e
            )))
        })
            .catch(err => {
                console.log(err);
            })
            : api.likeCard(card._id, !isLiked)
                .then(newCard => {
                    setCards(state => state.map(e => (
                        e._id === card._id ? newCard : e
                    )))
                })
                .catch(err => {
                    console.log(err);
                })
      };

      function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((newArray) => {
          setCards((newArray) => newArray.filter((item) => card._id !== item._id));
        })
            .catch(err => {
                console.log(err);
            });
      }

      const handleRegisterUser = () => {
        auth
          .register(email, password)
          .then(() => {
            navigate("/sign-in");
            setInfoMessage("Вы успешно зарегистрировались!");
            setTooltipImage(okImg);
            handleAuthPopup();
          })
          .catch((err) => {
            setInfoMessage("Что-то пошло не так! Попробуйте ещё раз.");
            setTooltipImage(notOkImg);
            handleAuthPopup();
            console.log(`Ошибка ${err}`);
          })
      };

      const handleAuthorizeUser = () => {
        auth
          .login(email, password)
          .then((data) => {
            if (data.token) {
              localStorage.setItem("token", data.token);
              handleSetLoginStatus();
              navigate("/");
              return data;
              
            }
            
          })
          .catch((err) => {
            setInfoMessage("Что-то пошло не так! Попробуйте ещё раз.");
            setTooltipImage(notOkImg);
            handleAuthPopup();
            console.log(`Ошибка ${err}`);
          })
          .finally(() => {
            setPassword("");
          });
      };

      const handleUserLogOut = () => {
        if (isLoggedIn) {
          localStorage.removeItem("token");
          handleSetLoginStatus();
          navigate("/sign-in");
        }
      };

      const handleAuthPopup = () => {
        setAuthPopup(!isAuthPopup);
      };

      const handleSetLoginStatus = () => {
        setIsLoggedIn(!isLoggedIn);
      };

      const handleCheckToken = () => {
        if (localStorage.getItem("token")) {
          const jwt = localStorage.getItem("token");
          auth
            .checkToken(jwt)
            .then((res) => {
              setEmail(res.data.email);
              handleSetLoginStatus();
              navigate("/");
            })
            .catch((err) => console.log(`Ошибка ${err}`));
        }
      };

      React.useEffect(() => {
        handleCheckToken();
      }, []);

  return (
    <CurrentUserContext.Provider value = {currentUser}>
        <div className="body">
            <Header email={email} onLogOut={handleUserLogOut}/>
            <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLogged={isLoggedIn}>
                  <Main 
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onEditAvatar = {handleEditAvatarClick}
                    onCardClick = {handleCardClick}
                    cards = {cards}
                    onCardLike = {handleCardLike}
                    onCardDelete = {handleCardDelete}
                    />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  onRegister={handleRegisterUser}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  onLogin={handleAuthorizeUser}
                />
              }
            />
          </Routes>
            <Footer />
        </div>
        <EditProfilePopup 
            isOpen = {isEditProfilePopupOpen}
            onClose = {closeAllPopups}
            onUpdateUser = {handleUpdateUser}
        />
        <AddPlacePopup 
            isOpen = {isAddPlacePopupOpen} 
            onClose = {closeAllPopups} 
            onAddPlace = {handleAddPlaceSubmit}
            />
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar = {handleUpdateAvatar}/>
        <div className="popup popup_type_delete-card">
            <div className="popup__overlay popup__overlay_type_delete-card"></div>
            <div className="popup__content">
                <button type = "button" className="popup__close popup__close_type_delete-card"></button>
                <h3 className="popup__title">Вы уверены?</h3>
                <form name = "popupForm" className="popup__form popup__form_type_delete-card" noValidate>
                    <button id = "delete-button" type = "submit" className="popup__save-button">Да</button>
                </form>
            </div>
        </div>
        <ImagePopup onClose = {closeAllPopups} card = {selectedCard} isOpen = {isImagePopupOpen} />
        <InfoTooltip
            infoMessage={infoMessage}
            image={tooltipImage}
            isOpen={isAuthPopup}
            onClose={closeAllPopups}
          />
    </CurrentUserContext.Provider>
  );
}

export default App;
