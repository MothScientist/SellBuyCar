import React from "react";
import { Link } from 'react-router-dom';
import "./header.css";
function Header() {
    return ( 
        <header className="header">
            <div className="header__logo">
                <img src="/logo192.png" className='header__logo_image'></img>
            </div>
            <div className="header__links">
                <Link to="/" className='header__link_button'>Home</Link>
                <Link to="/aboutPage" className='header__link_button'>About</Link>
                <Link to="/authentification" className='header__link_button'>Auth</Link>
            </div>
            <div className="header__buttons">
asdf
            </div>
            
        </header>
     );
}

export default Header;