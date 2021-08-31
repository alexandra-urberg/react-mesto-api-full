import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Card = ({
    card,
    onDeleteCard,
    onCardClick,
    onCardLike,
}) => {
    const currentUserId = useContext(CurrentUserContext)._id; //подписываемся на CurrentUserContext
    const isOwn = card.owner === currentUserId; // Определяем, являемся ли мы владельцем текущей карточки

    const cardDeleteButtonClassName = // Создаём переменную, которую после зададим в `className` для кнопки удаления
    `element__trash ${isOwn ? "element__trash_visible" : ""}`;

    const isLiked = card.likes.some((i) => i === currentUserId); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

    const cardLikeButtonClassName = `element__button-like ${// Создаём переменную, которую после зададим в `className` для кнопки лайка
        isLiked ? "element__button-like_active" : "" // переменная добавляющая сердечко
    }`;
    // console.log(isLiked);
    
    const handleRemoveCard = () => {//обработчик передающий информауию от card в Main для открытия popup delete card, а также передает всю нужную информацию в App для удаления карточки 
        onDeleteCard(card);
    }

    const handleCardClick = () => {//обработчик передающий информауию от card в Main для открытия полноразмерной картинки
        onCardClick(card);
    };


    const hadleLikeClick = () => {//обработчик передающий информауию от card в Main для постановки лайк
        onCardLike(card, isLiked);
    };

    return (
        <li className="element template__card">
            <button  
            onClick={handleRemoveCard}
            className={cardDeleteButtonClassName}
            type="button"
            ></button>
            <img
            className="element__image"
            onClick={handleCardClick}
            src={card.link}
            alt={card.name}
            />
            <div className="element__block">
                <h2 className="element__quote">{card.name}</h2>
                <div className="element__like-container">
                    <button
                    className={cardLikeButtonClassName}
                    onClick={hadleLikeClick}
                    type="button"
                    ></button>
                   <p className="element__counter-likes">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
};

export default Card;