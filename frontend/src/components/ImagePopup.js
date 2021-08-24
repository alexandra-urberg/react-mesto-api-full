import React from 'react';

const ImagePopup = ({card, onClose}) => {
    return (
        <div  
         className={`popup popup-opacity ${card.isOpen && card.link !== '' ? "popup_is-opened" : null}`}>
        <div className="popup__image-container">
            <button className="popup__close-button" onClick={onClose} type="button"></button>
            <img className="image" src={card.link} alt={card.name} />
            <h2 className="image-tittle">{card.name}</h2>  
        </div>
    </div>
    )
}

export default ImagePopup;