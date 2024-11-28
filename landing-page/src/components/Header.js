import React from 'react';
import './Header.css';

import logoImage from '../images/logo.svg';

const Header = () => (
    <header className="header">
        <div className="logo">
            <img src={logoImage} alt="Bug Network Logo" className="logo-image" />
            <span>Bug Network</span>
        </div>
        <nav className="nav">
            <a href="/">Home</a>
            <a href="/catalog">Buy a bug</a>
            <b href="/buy">View articles!</b>
            <a href="/cart">Cart</a>
        </nav>
    </header>
);

export default Header;