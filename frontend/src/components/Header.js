import { useState } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import headerLogo from './../images/logo.svg';

const Header = ({ email, onSignOut, loggedIn }) => {
    const [menuSandwich, setMenuSandwich] = useState(false);

    function onOpenMenu() {
        setMenuSandwich(true);
    }

    function onCloseMenu() {
        setMenuSandwich(false);
    }

    function handleSignOut() {
        onSignOut();
        setMenuSandwich(false);
    }

    return(
        <header className="header">
            <Switch>
                <Route path="/main">
                    <div className={`header__container-hidden ${menuSandwich ? 'header__menu_opened' : ''}`}>
                        <h2 className="header__email">{email}</h2>
                        <Link to="/sign-in" className="header__link" onClick={handleSignOut}>Выйти</Link>
                    </div>
                    <div className="header__container">
                        <img src={headerLogo} alt="логотип MESTO" className="header__logo" /> 
                        <div className="header__container-visible">
                            <h2 className="header__email-hidden">{email}</h2>
                            <Link to="/sign-in" className="header__link-hidden" onClick={handleSignOut}>Выйти</Link>
                            <button className={`header__hamburger-btn ${menuSandwich ? 'header__cross-btn' : ''}`} onClick={menuSandwich ? onCloseMenu : onOpenMenu}></button>
                        </div>
                    </div>
                </Route>
                <Route path="/sign-up">
                    <div className="header__container">
                        <img src={headerLogo} alt="логотип MESTO" className="header__logo" /> 
                        <Link to="/sign-in" className="header__link">Войти</Link>
                    </div>    
                </Route>
                <Route path="/sign-in">
                    <div className="header__container">
                        <img src={headerLogo} alt="логотип MESTO" className="header__logo" /> 
                        <Link to="/sign-up" className="header__link">Регистрация</Link>
                    </div>
                </Route>
                <Route path="/">
                    {loggedIn ? (
                       <Redirect to="/main" />
                    ) : (
                       <Redirect to="/sign-in" />
                    )}
                </Route>
            </Switch>
        </header>
    )         
} 

export default Header;