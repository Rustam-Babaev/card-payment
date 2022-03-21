import React from "react";
import logo from "../../images/logo.png";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header header_type_main">
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="Логотип card-payment" className="header__logo" />
        </Link>
        <div className="header__links-container">
          <NavLink className="header__link" to="/">
            Payment
          </NavLink>
          <NavLink className="header__link" to="#">
            Contacts
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
