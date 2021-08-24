import { useState } from "react";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  }); //стейт валидации инпутов

  function handleChangeEmail(e) {
    //Обработчик изменения инпута name обновляет стейт
    const { value } = e.target;
    let errors = validationErrors;
    setEmail(value);
    const regEx = /.+@.+\..+/;

    !regEx.test(value)
      ? (errors.email = "Введите корректный email адрес")
      : (errors.email = "" && setValidationErrors(errors)); // проверяем на минимальное колличество символов
  }

  function handleChangePassword(e) {
    //Обработчик изменения инпута about обновляет стейт
    const { value } = e.target;
    let errors = validationErrors;
    setPassword(value);

    value.length < 6 || value.includes(" ")
      ? (errors.password =
          "Введите корректный пароль без пробелов и больше 6 значений")
      : (errors.password = "" && setValidationErrors(errors)); // проверяем на минимальное колличество символов
  }

  function handleSubmit(e) {
    e.preventDefault(); //Запрещаем браузеру переходить по адресу формы

    props.onAuthorization({
      //Передаём значения управляемых компонентов во внешний обработчик
      email: email,
      password: password,
    });
  }
  return (
    <main className="sign">
      <h1 className="sign__title">Вход</h1>
      <div className="sign__container">
        <form onSubmit={handleSubmit} className="sign__form">
          <label className="sign__label">
            <input
              required
              id="email"
              value={email}
              name="email"
              type="email"
              autoComplete="on"
              placeholder="Email"
              className="sign__email sign__input"
              onChange={handleChangeEmail}
            />
            <span
              className={`${
                validationErrors.email ? "popup__input-error" : null
              }`}
            >
              {validationErrors.email}
            </span>
          </label>
          <label className="sign__label">
            <input
              required
              value={password}
              name="password"
              type="password"
              autoComplete="on"
              placeholder="Пароль"
              className="sign__password sign__input"
              onChange={handleChangePassword}
            />
            <span
              className={`${
                validationErrors.password ? "popup__input-error" : null
              }`}
            >
              {validationErrors.password}
            </span>
          </label>
          <button
            type="submit"
            className={`sign__button sign__button-signin sign__button-text ${
              validationErrors.email || validationErrors.password
                ? "popup__button_disabled"
                : null
            }`}
            disabled={validationErrors.email || validationErrors.password}
          >
            {props.isLoading ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default withRouter(Login);

