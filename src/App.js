// Modules

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Assets
import Hero_Banner from "./assets/hero-bg.jpg";
const App = () => {
    return (
        <div className="body home">
            <Header />
            <section className="hero">
                <div className="hero-wrap">
                    <img
                        src={Hero_Banner}
                        className="hero-image section-bg"
                        alt="Hero"
                    />
                </div>
                <div className="hero-banner">
                    <h1 className="hero-title">
                        Civil <span>Aid</span>
                    </h1>
                </div>
                <a href="#topics" className="hero-arrow">
                    <FontAwesomeIcon icon={faChevronDown} />
                </a>
            </section>

            <section className="welcome">
                <div className="container">
                    <div className="section-header">
                        <h5>What is</h5>
                        <h2>
                            Civil <span>Aid</span>
                        </h2>
                    </div>
                    <div className="welcome-content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                        <p>
                            fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </section>

            <section className="topics" id="topics">
                <div className="section-header">
                    <h5>Choose</h5>
                    <h2>
                        <span>Topics</span>
                    </h2>
                </div>

                <div className="topic-wrapper">
                    <TopicItem image={Hero_Banner} title={"Math"} link="#" />
                    <TopicItem
                        image={Hero_Banner}
                        title="Hydraulics & Geo"
                        link="#"
                    />
                    <TopicItem image={Hero_Banner} title={"Design"} link="#" />
                </div>
            </section>

            <Footer />
        </div>
    );
};

function TopicItem(props) {
    return (
        <div className="topic-item">
            <img className="topic-image" src={props.image} alt={props.title} />

            <h2 className="topic-title">{props.title}</h2>
            <a className="overlink" href={props.link}>
                &nbsp;
            </a>
        </div>
    );
}

export default App;
