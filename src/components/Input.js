import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
<FontAwesomeIcon icon={faChevronDown} />;
const Input = (props) => {
    return (
        <>
            <div className="input">
                {props.icon ? <FontAwesomeIcon icon={props.icon} /> : ""}
                <input
                    placeholder={props.placeholder}
                    type={props.type ? props.type : "text"}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </div>
        </>
    );
};

export default Input;
