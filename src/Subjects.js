// Modules

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/Homepage.css";

// Assets
import Hero_Banner from "./assets/hero-bg.jpg";
import Math from "./assets/math.jpg";
import Design from "./assets/design.jpg";
import HydroGeo from "./assets/hydrogeo.jpg";
const Subjects = () => {
    return (
        <div className="body internal">
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
                    <h1 className="hero-title">Choose Subjects</h1>
                </div>
            </section>

            <section className="topics" id="topics">
                <div className="topic-wrapper">
                    <TopicItem image={Math} title={"Math"} link="#" />
                    <TopicItem
                        image={HydroGeo}
                        title="Hydraulics & Geo"
                        link="#"
                    />
                    <TopicItem image={Design} title={"Design"} link="#" />
                    <TopicItem image={Math} title={"Math"} link="#" />
                    <TopicItem
                        image={HydroGeo}
                        title="Hydraulics & Geo"
                        link="#"
                    />
                    <TopicItem image={Design} title={"Design"} link="#" />
                    <TopicItem image={Math} title={"Math"} link="#" />
                    <TopicItem
                        image={HydroGeo}
                        title="Hydraulics & Geo"
                        link="#"
                    />
                    <TopicItem image={Design} title={"Design"} link="#" />
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

export default Subjects;
