import React from 'react';
import PopupWithForm from './PopupWithForm';

const DeleteCardPopup = ({card, onCardDelete, isOpen, onClose, isLoading}) => {
    function handleDelet(e) {
        e.preventDefault(); // Запрещаем браузеру переходить по адресу формы
        onCardDelete(card); // Передаём значения управляемых компонентов во внешний обработчик;
    } 

    return (
        <PopupWithForm
        isOpen={isOpen}
        onSubmit={handleDelet}
        onClose={onClose}
        name="card-delete"
        title="Вы уверены?"
        btn={isLoading ? 'Удаляем...' : 'Да'}
        >
        </PopupWithForm>
    )
}

export default DeleteCardPopup;
