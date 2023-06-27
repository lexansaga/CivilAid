// Modules

import React, { useEffect, useState, useRef } from "react";

import { useReactToPrint } from "react-to-print";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Accordion from "./components/Accordion";
import "./styles/Homepage.css";
import "./styles/SubTopic.css";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IsNull } from "./Utils";
import { Fetch } from "./firebase";
import { where, orderBy, query, collection } from "firebase/firestore";
import { firestore } from "./firebase";
import html2canvas from "html2canvas";
import parse from "html-react-parser";
import { jsPDF } from "jspdf";
import JsPDF from "jspdf";

// Assets
import Hero_Banner from "./assets/hero-bg.jpg";
const Subject = (props) => {
    const location = useLocation();
    console.log(location);

    const [topics, setTopics] = useState([]);
    const func = location.state.func != null ? location.state.func : "";
    const [subTopics, setSubTopics] = useState([]);
    const value = !IsNull(location) ? "" : location.state.q;
    console.log(value);
    useEffect(() => {
        async function getFetch() {}
        getFetch();
        const images = document.querySelectorAll("img");
        images.forEach((img) => {
            img.setAttribute("loading", "lazy");
        });
        async function getFetch() {
            if (func.includes("header-search")) {
                // console.log(value != "");
                const fetch = await Fetch("Content");
                // console.log(fetch);
                setSubTopics(fetch);
            } else {
                const fetch = !IsNull(location)
                    ? await Fetch("Content")
                    : await Fetch(
                          null,
                          null,
                          query(
                              collection(firestore, "Content"),
                              where("topicTag", "==", `${value}`),
                              orderBy("sortKey", "asc")
                          )
                      );
                setSubTopics(fetch);
            }
        }
        getFetch();
    }, []);

    const generatePDF = () => {
        const accordionDivs = document.querySelectorAll(".accordion");

        accordionDivs.forEach((item) => {
            // Perform operations on each div here
            item.classList.add("active");
        });
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // console.log(subTopics);
    return (
        <div className="body internal">
            <Header />
            <Banner
                image={Hero_Banner}
                title={location.state.title}
                link="#topics"
            />

            <section id="ip-container">
                <div className="container">
                    <button
                        className="btn btn-primary download-pdf"
                        onClick={() => {
                            generatePDF();
                            handlePrint();
                        }}
                    >
                        Download as PDF
                    </button>
                    <div
                        id="SubTopic-Wrap"
                        className="SubTopic-Wrap"
                        ref={componentRef}
                    >
                        {subTopics
                            ? subTopics.map((item, index) => {
                                  //   console.log(
                                  //       `${item.SubTopic} : ${item.sortKey}`
                                  //   );
                                  if (func.includes("header-search")) {
                                      //   console.log(
                                      //       `${item.content
                                      //           .toLowerCase()
                                      //           .includes(
                                      //               value.toLowerCase()
                                      //           )} : ${value.toLowerCase()}`
                                      //   );
                                      if (
                                          item.SubTopic.toLowerCase().includes(
                                              value.toLowerCase()
                                          ) ||
                                          item.content
                                              .toLowerCase()
                                              .includes(value.toLowerCase())
                                      ) {
                                          return (
                                              <Accordion
                                                  index={1}
                                                  title={item.SubTopic}
                                                  // images={images}
                                                  content={parse(item.content)}
                                              />
                                          );
                                      }
                                  } else {
                                      return (
                                          <Accordion
                                              index={1}
                                              title={item.SubTopic}
                                              // images={images}
                                              content={parse(item.content)}
                                          />
                                      );
                                  }
                              })
                            : "No Content"}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Subject;
