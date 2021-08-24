import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [name, setName] = useState(""); // Стейт, в котором содержится значение инпута name
  const [about, setAbout] = useState(""); // Стейт, в котором содержится значение инпута about
  const [validationErrors, setValidationErrors] = useState({name: '', about: ''})//стейт валидации инпутов
  const currentUser = useContext(CurrentUserContext); // Подписка на контекст
  

  function handleChangeTitle(e) {//Обработчик изменения инпута name обновляет стейт
    const { value } = e.target;
    let errors = validationErrors;
    setName(value);

    value.length < 2 ? errors.name = 'Минимальное колличество символоа - 2': errors.name = '' && setValidationErrors(errors);// проверяем на минимальное колличество символов
  }

  function handleChangeabout(e) {//Обработчик изменения инпута about обновляет стейт
    const { value } = e.target;
    let errors = validationErrors;
    setAbout(value);

    value.length < 2 ? errors.about = 'Минимальное колличество символоа - 2': errors.about = '' && setValidationErrors(errors);// проверяем на минимальное колличество символов
  }

  function handleSubmit(e) {
    e.preventDefault();//Запрещаем браузеру переходить по адресу формы

    props.onUpdateUser({//Передаём значения управляемых компонентов во внешний обработчик
      name: name,
      about: about,
    });
  }

  useEffect(() => {// После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    if(props.isOpen) {
      setName(currentUser.name);
      setAbout(currentUser.about); 
      setValidationErrors({name: '', about: ''});//и проверяться на валидность
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
      disabled={(validationErrors.name || validationErrors.about) || (name === currentUser.name && about === currentUser.about)}
      btn={props.isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <label className="popup__label">
        <input
          type="text"
          name="name"
          className="popup__input"
          placeholder="Жак-Ив Кусто"
          required
          value={name || ""}
          onChange={handleChangeTitle}
        />
        <span className={`${validationErrors.name ? "popup__input-error" : null}`}>{validationErrors.name}</span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          name="about"
          className="popup__input"
          placeholder="Исследователь океана"
          required
          value={about || ""}
          onChange={handleChangeabout}
        />
        <span className={`${validationErrors.about ? "popup__input-error" : null}`}>{validationErrors.about}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;