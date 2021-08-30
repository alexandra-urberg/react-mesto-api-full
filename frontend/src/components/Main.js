import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onDeleteCard,
  onCardClick,
  onCardLike,
  isLoading,
}) => {
  const { avatar, name, about } = useContext(CurrentUserContext); //сюда будет записываться имя пользователя

  return (
    <main className="main">
      <section className="profile main__profile">
        <div
          className="profile__avatar-container profile__avatar"
          style={{ backgroundImage: `url(${avatar})` }}
        >
          <button
            onClick={onEditAvatar}
            className="profile__avatar-button"
            type="button"
          ></button>
        </div>
        <div className="profile__conteiner">
          <h1 className="profile__name">{name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__open-button"
            type="button"
          ></button>
          <p className="profile__job">{about}</p>
        </div>
        <button
          id="popup-image__open-button"
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section id="elements" className="elements">
        <ul id="template__container" className="elements__container">
          {isLoading && (<p>Is Loading ...</p>)}
          {cards.map((card) => {
            return (
              <Card
                card={card}
                likes={card.likes}
                cardId={card._id}
                name={card.name}
                link={card.link}
                owner={card.owner}
                key={card._id}
                onDeleteCard={onDeleteCard}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            )
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;


