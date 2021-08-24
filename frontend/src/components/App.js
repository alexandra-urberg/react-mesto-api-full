import "../index.css";
import { useState, useEffect, useCallback } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import api from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); //popup Profile
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); //popup AddCards
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // popup Edit Avatar
  const [isDeletePopupImage, setIsDeletePopupImage] = useState(false); // popup Delete Card
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" }); // получаем полноразмерную картинку с подписью
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); //подписываемся на CurrentUserContext, чтобы получить нужное значания контекста
  const [removeCard, setRemoveCard] = useState({});

  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState({ email: "" });

  let history = useHistory();

  useEffect(() => {
    //вытаскиваем информацию о пользователе
    if (isAuthorized) {
      setIsLoading(true);
      Promise.all([api.getPersonalInformation(), api.getInitialCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [isAuthorized]);

  const tockenCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if(res) {
            setEmail({ email: res.data.email });
            setIsAuthorized(true);
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    tockenCheck();
  }, [tockenCheck]);

  const handleUpdateUser = (userInformation) => {
    // внешний обработчик отвечающий за сохранение введенной информации о пользователе на сервер
    setIsLoading(true);
    api
      .editPersonalProfile(userInformation)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (link) => {
    // внешний обработчик отвечающий за сохранение аватара пользователя на сервер
    setIsLoading(true);
    api
      .editAvatar(link)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlaceSubmit = (card) => {
    // внешний обработчик отвечающий за добавление новой карточки на сервер
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = (likes, cardId, currentUserId) => {
    // внешний обработчик отвечающий за постановку/удаление лайка на/с сервер/а
    const isLiked = likes.some((card) => card._id === currentUserId); // Снова проверяем, есть ли уже лайк на этой карточке

    if (isLiked) {
      //удаляем Лайк
      api
        .deleteLike(cardId)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === cardId ? newCard : c))
          );
        })
        .catch((error) => console.log(error));
    } else {
      //добавляем лайк
      api
        .addLike(cardId)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === cardId ? newCard : c))
          );
        })
        .catch((error) => console.log(error));
    }
  };

  //обработчики открытий попааов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = ({ link, name }) => {
    setSelectedCard({
      isOpen: true,
      link,
      name,
    });
  };

  //обработчики закрытия попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupImage(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltip(false);
  };

  useEffect(() => {
    //обработчик закрытия попапов по нажатия на ESC и overlay
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };

    const handleCloseByOverlay = (evt) => {
      //обработчик для закртия popup по кнопке и overlay
      if (
        evt.target.classList.contains("popup_is-opened") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        closeAllPopups();
      }
    };

    document.addEventListener("click", handleCloseByOverlay);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("click", handleCloseByOverlay);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  const handleDeleteCard = (card) => {
    setRemoveCard(card);
    setIsDeletePopupImage(true);
  };

  const handleCardDelete = () => {
    // внешний обработчик отвечающий за удаление карточки с сервера
    setIsLoading(true);
    api
      .deleteCard(removeCard.cardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== removeCard.cardId));
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleRegistration = (data) => {
    setIsLoading(true);
    auth
      .registration(data)
      .then(() => {
        setIsRegistered(true);
        setIsInfoTooltip(true);
        history.push('/sign-in');
      })
      .catch((error) => {
        setIsRegistered(false);
        setIsInfoTooltip(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleAuthorization = (data) => {
    setIsLoading(true);
    auth
      .authorize(data)
      .then((res) => {
        setEmail({ email: data.email });
        setIsAuthorized(true);
        localStorage.setItem("jwt", res.token);
        history.push("/main");
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <>
          <Header email={email.email} onSignOut={signOut} loggedIn={isAuthorized}/>
          <Switch>
            <ProtectedRoute
              path="/main"
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onDeleteCard={handleDeleteCard}
              onCardLike={handleCardLike}
              isLoading={isLoading}
              loggedIn={isAuthorized}
            />
            <Route path="/sign-up">
              <Register
                OnRegistered={handleRegistration}
                isLoading={isLoading}
              />
            </Route>
            <Route path="/sign-in">
              <Login onAuthorization={handleAuthorization} />
            </Route>
            <Route path="/">
              {isAuthorized ? (
                <Redirect to="/main" />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
          </Switch>
          <Footer />
        </>
        <>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <DeleteCardPopup
            isOpen={isDeletePopupImage}
            onCardDelete={handleCardDelete}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isRegistered={isRegistered}
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
          />
        </>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;