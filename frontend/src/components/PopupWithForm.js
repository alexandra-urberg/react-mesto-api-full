import React from "react";

const PopupWithForm = (props) => {
  return (
    <div
      id={`popup-${props.name}`}
      className={`popup ${props.isOpen ? "popup_is-opened" : null}`}
    >
      <div className="popup__content">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form-container"
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" 
            className={`popup__save-button ${props.disabled ? "popup__button_disabled" : null}`} 
            disabled={props.disabled}
           >
            {props.btn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;