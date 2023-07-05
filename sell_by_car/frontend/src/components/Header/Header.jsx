import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Button from "../Button.jsx";

import logo from "../../../static/images/car.png";
import userIcon from "../../../static/images/user.png";
import carticon from "../../../static/images/shopping-cart.png";
import pinIcon from "../../../static/images/pin.png";
import lensIcon from "../../../static/images/zoom-lens.png";

function Header() {
  return (
    <header className="header">
      <Button href="/" className="header__logo">
        <img src={logo} className="header__logo_image"></img>
      </Button>
      <div className="header__left_links">
        <Button href="/" className="header__left_link_button">
          HOME
        </Button>
        <Button href="/aboutPage" className="header__left_link_button">
          ABOUT
        </Button>
        <Button href="/authentification" className="header__left_link_button">
          AUTH
        </Button>
      </div>
      <div className="header__right_links">
        <Button href="/cabinet" className="header__right_link_button">
          <img src={userIcon} className="header__right_link_icon_image"></img>
        </Button>
        <Button href="/cart" className="header__right_link_button">
          <img src={carticon} className="header__right_link_icon_image"></img>
        </Button>
        <Button href="/map" className="header__right_link_button">
          <img src={pinIcon} className="header__right_link_icon_image"></img>
        </Button>
        <Button href="/search" className="header__right_link_button">
          <img src={lensIcon} className="header__right_link_icon_image"></img>
        </Button>
      </div>
    </header>
  );
}

export default Header;
