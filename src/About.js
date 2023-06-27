// Modules

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import "./styles/Homepage.css";
import "./styles/InsidePage.css";
import "./styles/About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { Fetch } from "./firebase";
import { GetRandomBackground, IsNull } from "./Utils";
// Assets
import { useLocation } from "react-router-dom";
import Hero_Banner from "./assets/hero-bg.jpg";
const About = () => {
    const [welcome, setWelcome] = useState("");
    const [proponents, setProponents] = useState([]);
    useEffect(() => {
        async function getFetch() {
            const fetchWelcome = await Fetch("Welcome");
            setWelcome(fetchWelcome[0].FullContent);
            const fetchProponents = await Fetch("Proponents");
            setProponents(fetchProponents);
        }
        getFetch();
    }, []);
    console.log(proponents);
    return (
        <div className="body internal">
            <Header />
            <Banner image={Hero_Banner} title="About" link="#topics" />
            <section id="ip-container">
                <div className="container content ql-editor">
                    {parse(welcome)}
                    <div className="proponents">
                        <div className="proponents-wrap">
                            {proponents.map((item, index) => {
                                return (
                                    <div className="proponents-item">
                                        <div className="proponents-image">
                                            <img
                                                src={item.ImageLink}
                                                alt={item.Name}
                                            />
                                        </div>
                                        <p className="proponents-name">
                                            {item.Name}
                                            <div className="proponents-info">
                                                <h4 className="proponents-campus">
                                                    BS Civil Engineering
                                                    <i>
                                                        Cavite State University
                                                        - Main Campus
                                                    </i>
                                                </h4>
                                            </div>
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
