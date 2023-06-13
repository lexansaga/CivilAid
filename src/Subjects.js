// Modules

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import "./styles/Homepage.css";
import "./styles/InsidePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import { Fetch } from "./firebase";
import { GetRandomBackground } from "./Utils";
// Assets
import Hero_Banner from "./assets/hero-bg.jpg";
import Math from "./assets/math.jpg";
import Design from "./assets/design.jpg";
import HydroGeo from "./assets/hydrogeo.jpg";
const Subjects = () => {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        async function getFetch() {
            const fetch = await Fetch("Subjects");
            setTopics(fetch);
        }
        getFetch();
        console.log(topics);
    }, []);

    return (
        <div className="body internal">
            <Header />
            <Banner
                image={Hero_Banner}
                title="Choose Subjects"
                link="#topics"
            />
            <section id="ip-container">
                <section className="topics" id="topics">
                    <div className="topic-wrapper">
                        {topics &&
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
                                            title: item.label,
                                        }}
                                    />
                                );
                            })}
                    </div>
                </section>
            </section>

            <Footer />
        </div>
    );
};

function TopicItem(props) {
    return (
        <div className="topic-item">
            <img
                className="topic-image"
                src={props.image}
                alt={props.title ? props.title : "Image"}
            />

            <h2 className="topic-title">{props.title}</h2>
            <Link className="overlink" to={props.path} state={props.state}>
                Learn More
            </Link>
        </div>
    );
}

export default Subjects;
