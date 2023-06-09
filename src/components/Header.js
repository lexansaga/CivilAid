import React, { useEffect, useState, useRef } from "react";
import "../styles/Header.css";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faX,
    faBars,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        document.body.classList.toggle("menu-open", isOpen);
    }, [isOpen]);

    const headerRef = useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            const headerHeight = headerRef.current.offsetHeight;
            if (window.scrollY >= headerHeight) {
                document.body.classList.add("fixed-header");
            } else {
                document.body.classList.remove("fixed-header");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header className="header" ref={headerRef}>
                <div className="container header-container">
                    <div className="navigation-container">
                        <button
                            className="menu"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <a href="/" className="logo">
                            <img src={Logo} className="logo" />
                        </a>

                        <nav className="menu-navigation">
                            <a href="index.html">Home</a>
                            <a href="#about">About</a>
                            <Link to="/subjects">Subjects</Link>
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
