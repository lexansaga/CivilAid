// Modules

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import "./styles/Homepage.css";
import "./styles/InsidePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { IsNull, NoContent } from "./Utils";
import { Fetch } from "./firebase";
import { GetRandomBackground } from "./Utils";
// Assets
import { useLocation } from "react-router-dom";
import Hero_Banner from "./assets/hero-bg.jpg";
const Topics = () => {
    const location = useLocation();
    // console.log(location);
    const [topics, setTopics] = useState([]);
    const value = location.state.q;
    const func = location.state.func != null ? location.state.func : "";

    useEffect(() => {
        async function getFetch() {
            console.log(value != "");
            const fetch =
                value == "" || func.includes("header-search")
                    ? await Fetch("Topics")
                    : await Fetch("Topics", where("tag", "==", `${value}`));
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
                title={location.state.title}
                link="#topics"
            />
            <section id="ip-container">
                <section className="topics" id="topics">
                    <div className="topic-wrapper">
                        {topics.map((item, index) => {
                            console.log(item.label.toLowerCase() + " " + value);
                            if (func.includes("header-search")) {
                                if (item.label.toLowerCase().includes(value)) {
                                    console.log(item.label.toLowerCase);
                                    return (
                                        <TopicItem
                                            image={
                                                item.url
                                                    ? item.url[0]
                                                    : GetRandomBackground()
                                            }
                                            title={item.label}
                                            path="/subject"
                                            state={{
                                                q: item.link,
                                                title: item.label,
                                            }}
                                        />
                                    );
                                }
                            } else {
                                return (
                                    <TopicItem
                                        image={
                                            item.url
                                                ? item.url[0]
                                                : GetRandomBackground()
                                        }
                                        title={item.label}
                                        path="/subject"
                                        state={{
                                            q: item.link,
                                            title: item.label,
                                        }}
                                    />
                                );
                            }
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

export default Topics;
