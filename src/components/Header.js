import React, { useEffect, useState, useRef } from "react";
import "../styles/Header.css";
import Logo from "../assets/logo.png";
import { Fetch } from "../firebase";
import { where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faX,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
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
    const [topics, setTopics] = useState([]);

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            navigate("/subject", {
                state: {
                    q: search,
                    title: "Search Topic",
                    func: "header-search",
                },
            });
        }
    };

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
                            <a href="/">Home</a>
                            <Link
                                to="/subjects"
                                state={{
                                    q: "",
                                    title: "All Subjects",
                                }}
                            >
                                Subjects
                            </Link>
                            <a href="/about">About</a>
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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
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
