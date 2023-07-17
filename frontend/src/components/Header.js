import React from 'react';
import logo from '../images/logo320.svg';
import { Link, Route, Routes, useLocation } from "react-router-dom";

function Header({ email, onLogOut }) {
    let location = useLocation();
    return (
        <header className="header page__header">
            <img src={logo} alt="Логотип МЕСТО" className="header__logo" />
            <div className="header__body">
                <p className="header__email">
                {location.pathname === "/" ? email : ""}
                </p>
                <Routes>
                <Route
                    path="sign-up"
                    element={
                    <Link className="header__button" to="/sign-in">
                        Войти
                    </Link>
                    }
                />
                <Route
                    path="/"
                    element={
                    <Link
                        className="header__button"
                        to="/sign-in"
                        onClick={() => onLogOut()}
                    >
                        Выйти
                    </Link>
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                    <Link className="header__button" to="/sign-up">
                        Регистрация
                    </Link>
                    }
                />
                </Routes>
            </div>
        </header>
    );
}

export default Header;