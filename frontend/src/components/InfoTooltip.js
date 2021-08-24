import React from "react";
import negative from "./../images/Union-negative.svg"
import positive from "./../images/Union-positive.svg"


const InfoTooltip = (props) => {
    return (
        <div
          id={`popup-InfoTooltip`}
          className={`popup popup-InfoTooltip ${props.isOpen ? "popup_is-opened" : null}`}
        >
            <div className="popup__content">
                <button
                  className="popup__close-button"
                  type="button"
                  onClick={props.onClose}
                ></button>
                <img className="popup-InfoTooltip__image" src={props.isRegistered ? positive : negative} alt="icon"/>
                <h2 className="popup__title">{props.isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;