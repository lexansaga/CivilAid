// Modules

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Accordion from "./components/Accordion";
import "./styles/Homepage.css";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// Assets
import Hero_Banner from "./assets/hero-bg.jpg";
import Math from "./assets/math.jpg";
import Design from "./assets/design.jpg";
import HydroGeo from "./assets/hydrogeo.jpg";
const Subject = (props) => {
    const images = [Math, Design, HydroGeo];
    const { state } = useLocation();
    console.log();
    return (
        <div className="body internal">
            <Header />
            <Banner image={Hero_Banner} title={state.title} link="#topics" />

            <section id="ip-container">
                <div className="container">
                    <Accordion
                        index={1}
                        title="Topic 1"
                        images={images}
                        content={
                            <>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat. Duis aute irure
                                    dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </p>
                                <a href="#" className="btn btn-primary">
                                    Hello World
                                </a>
                            </>
                        }
                    />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Subject;
