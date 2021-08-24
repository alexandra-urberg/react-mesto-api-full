import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditAvatarPopup = (props) => {
  const [link, setLink] = useState(""); // записываем объект, возвращаемый хуком, в переменную
  const [validationErrors, setValidationErrors] = useState({ link: "" }); //стейт валидации инпутов
  const currentUser = useContext(CurrentUserContext); // Подписка на контекст

  function handleChangeLink(e) {
    const { value } = e.target;
    let error = validationErrors;
    setLink(value);
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;

    !regex.test(value)
      ? (error.link = "Введите URL.")
      : (error.link = "" && setValidationErrors(error));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(
      //Передаём значения во внешний обработчик для измения аватара
      link
    );
  }

  useEffect(() => {
    if (props.isOpen) {
      setLink(currentUser.link);
      setValidationErrors({ link: "" });
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      disabled={validationErrors.link || link === currentUser.link}
      btn={props.isLoading ? "Сохранение..." : "Сохранить"}
    >
      <label className="popup__label">
        <input
          value={link || ""}
          type="url"
          name="avatar"
          className="popup__input"
          placeholder="Ссылка на фотографию"
          required
          onChange={handleChangeLink}
        />
        <span
          className={`${validationErrors.link ? "popup__input-error" : null}`}
        >
          {validationErrors.link}
        </span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
