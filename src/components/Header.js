import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faX,
    faBars,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        document.body.classList.toggle("menu-open", isOpen);
    }, [isOpen]);

    return (
        <>
            <header className="header">
                <div className="container header-container">
                    <div className="navigation-container">
                        <button
                            className="menu"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <img src={Logo} className="logo" />
                        <nav className="menu-navigation">
                            <a href="/#">Home</a>
                            <a href="/#">About</a>
                            <a href="/#">Formulas</a>
                            <button
                                className="menu-close"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <FontAwesomeIcon icon={faX} />
                            </button>
                        </nav>
                    </div>
                    <div className="search-input-wrap">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search"
                        />
                        <FontAwesomeIcon
                            className="search-icon"
                            icon={faMagnifyingGlass}
                        />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
