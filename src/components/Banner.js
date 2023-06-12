import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Banner = (props) => {
    return (
        <section className="hero">
            <div className="hero-wrap">
                <img
                    src={props.image}
                    className="hero-image section-bg"
                    alt="Hero"
                />
            </div>
            <div className="hero-banner">
                <h1 className="hero-title">{props.title}</h1>
            </div>
            <a href={props.link} className="hero-arrow">
                <FontAwesomeIcon icon={faChevronDown} />
            </a>
        </section>
    );
};
export default Banner;
