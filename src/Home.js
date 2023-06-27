// Modules

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { Fetch } from "./firebase";
import { GetRandomBackground, NoContent } from "./Utils";
// Assets
import Hero_Banner from "./assets/hero-bg.jpg";
import parse from "html-react-parser";
const Home = () => {
    const [topics, setTopics] = useState([]);
    const [welcome, setWelcome] = useState("");
    useEffect(() => {
        async function getFetch() {
            const fetch = await Fetch("Subjects");
            setTopics(fetch);
            const fetchWelcome = await Fetch("Welcome");
            setWelcome(fetchWelcome[0].Excerpt);
        }
        getFetch();
        console.log(topics);
    }, []);

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
                <a href="#about" className="hero-arrow">
                    <FontAwesomeIcon icon={faChevronDown} />
                </a>
            </section>

            <section className="welcome" id="about">
                <div className="container">
                    <div className="section-header">
                        <h5>What is</h5>
                        <h2>
                            Civil <span>Engineering</span>
                        </h2>
                    </div>
                    <div className="welcome-content ql-editor">
                        {parse(welcome)}
                        <Link className="btn btn-primary" to="/about">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            <section className="topics hidden" id="topics">
                <div className="section-header">
                    <h5>Choose</h5>
                    <h2>
                        <span>Subject</span>
                    </h2>
                </div>

                <div className="topic-wrapper">
                    {topics ? (
                        topics.map((item, index) => {
                            return (
                                <TopicItem
                                    image={
                                        item.url
                                            ? item.url[0]
                                            : GetRandomBackground()
                                    }
                                    title={item.label}
                                    path="/subjects"
                                    state={{
                                        q: item.link,
                                        title: item.value,
                                    }}
                                />
                            );
                        })
                    ) : (
                        <NoContent content={"No Content"} />
                    )}
                    {/* <TopicItem image={Math} title={"Math"} path="/subjects" />
                    <TopicItem
                        image={HydroGeo}
                        title="Hydraulics & Geo"
                        path="/subjects"
                    />
                    <TopicItem
                        image={Design}
                        title={"Design"}
                        path="/subjects"
                    /> */}
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
            <Link className="overlink" to={props.path} state={props.state}>
                Learn More
            </Link>
        </div>
    );
}

export default Home;
