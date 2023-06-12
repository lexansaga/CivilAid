import React, { useState } from "react";
import "../styles/Accordion.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
const Accordion = (props) => {
    const images = props.images;
    const [isToggled, setToggled] = useState(false);

    const handleToggle = () => {
        setToggled(!isToggled);
    };
    return (
        <React.Fragment key={props.id}>
            <div className={`accordion ${isToggled ? "active" : ""}`}>
                <div className="accordion-header" onClick={handleToggle}>
                    <h2>{props.title}</h2>
                    <div
                        className={`accordion-indicator ${
                            isToggled ? "active" : ""
                        }`}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <FontAwesomeIcon icon={faMinus} />
                    </div>
                </div>
                <div className="accordion-content">
                    <div className="accordion-images">
                        {images.map((images, index) => {
                            return (
                                <div className="accordion-image-wrap">
                                    <img
                                        src={images}
                                        alt={"Image " + index}
                                        className="accordion-image"
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-content">{props.content}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Accordion;
