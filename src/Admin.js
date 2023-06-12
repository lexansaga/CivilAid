// Modules
import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import TabbedNavigation from "./components/TabbedNavigation";
import FileInput from "./components/FIleInput";
import Input from "./components/Input";
import { app, firestore, Delete, Add, Fetch } from "./firebase";
import { where } from "firebase/firestore";

import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./styles/Admin.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import CreatableSelect, { useCreatable } from "react-select/creatable";

// Assets
import Hero_Banner from "./assets/hero-bg.jpg";
const Admin = (props) => {
    useEffect(() => {
        // fetch();
    });
    return (
        <div className="body internal">
            <Header />
            <Banner image={Hero_Banner} title={"Admin"} link="#topics" />

            <section id="ip-container">
                <div className="container">
                    <div className="input-wrap">
                        <TabbedNavigation
                            tabNames={["Content", "Topic", "Subject"]}
                            tabContents={[
                                <SetTopics />,
                                <ManageTopic />,
                                <ManageSubjects />,
                            ]}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

function SetTopics() {
    const [value, setValue] = useState("");
    const [selectedImage, setSelectedImage] = useState([]);
    const [topic, setTopic] = useState("");
    const [subject, setSubject] = useState("");
    const [topicList, setTopicList] = useState(null);
    const [subjectList, setSubjectList] = useState(null);

    useEffect(() => {
        getTopics();
        getSubjects();
        async function getTopics() {
            setTopicList(await Fetch("Topics"));
        }
        async function getSubjects() {
            setSubjectList(await Fetch("Subjects"));
        }
    }, []);
    return (
        <>
            <div className="form">
                <div className="input-wrap">
                    <p className="label">Topic</p>
                    <Select
                        className="dropdown"
                        options={topicList}
                        onChange={(e) => {
                            setTopic(e == null ? "" : e);
                        }}
                    />
                </div>
                <div className="input-wrap">
                    <p className="label">Subject</p>
                    <Select
                        className="dropdown"
                        options={subjectList}
                        onChange={(e) => {
                            setSubject(e == null ? "" : e);
                        }}
                    />
                </div>

                <div className="input-wrap">
                    <p className="label">Select Images</p>
                    <FileInput
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        multiple="true"
                    />
                </div>
                <div className="input-wrap">
                    <p className="label">Content</p>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        Add("Content", subject.value, {
                            topic: topic.value,
                            subjectList: subject.value,
                            content: value,
                        });
                    }}
                >
                    Submit
                </button>
            </div>
        </>
    );
}
function ManageTopic() {
    const [topicName, setTopicName] = useState("");
    const [topic, setTopic] = useState("");
    const [topicList, setTopicList] = useState([]);
    const [isTopicExists, setTopicExists] = useState(false);

    const [selectedImage, setSelectedImage] = useState([]);
    useEffect(() => {
        getTopics();
        async function getTopics() {
            setTopicList(await Fetch("Topics"));
        }
    }, []);
    console.log(`Topic List : ${topicList}`);
    function hasKey(value, data) {
        console.log(`Has Key ${value}`);
        const keysArray = data.map((item) => item.value);
        return keysArray.includes(value.value);
    }
    console.log(`Is Exists : ${isTopicExists}`);
    console.log(`Revoke`);
    return (
        <>
            <div className="form AddTopic">
                <div className="section-header left">
                    <h5>Add Topics</h5>
                </div>
                <div className="group">
                    <div className="input-wrap">
                        {/* <input
                        className="form-input"
                        type="text"
                        name="TopicName"
                        placeholder="Name"
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                    /> */}
                        <div className="input-wrap">
                            <p className="label">Select Image</p>
                            <FileInput
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                                multiple="false"
                            />
                        </div>
                        <div className="input-wrap">
                            <p className="label">Select Topic</p>
                            <CreatableSelect
                                className="dropdown"
                                isClearable
                                placeholder="Select or input topic"
                                options={topicList}
                                value={topic}
                                onChange={(e) => {
                                    setTopic(e == null ? "" : e);
                                    setTopicExists(hasKey(e, topicList));
                                }}
                            />
                        </div>
                        {isTopicExists ? (
                            <Input
                                icon={faUser}
                                value={topicName}
                                onChange={setTopicName}
                                placeholder={`Enter new topic name for ${topic.value}`}
                            />
                        ) : null}
                        {isTopicExists ? (
                            <div className="btn-wrap">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        Delete("Topics", topic.value);
                                        Add("Topics", topicName, {
                                            value: topicName,
                                            label: topicName,
                                        });
                                    }}
                                >
                                    Update Topic
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                `Are you sure you want to delete ${topic.value}?`
                                            ) == true
                                        ) {
                                            Delete("Topics", topic.value);
                                        }
                                    }}
                                >
                                    Delete Topic
                                </button>
                            </div>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    //setTopicList([]);
                                    Add("Topics", topic.value, {
                                        value: topic.value,
                                        label: topic.value,
                                    });
                                }}
                            >
                                Add Topic
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

function ManageSubjects() {
    const [subjectName, setSubjectName] = useState("");
    const [subject, setSubject] = useState("");
    const [selectedImage, setSelectedImage] = useState([]);
    const [isSubjectExists, setSubjectExists] = useState(false);

    const [subjectList, setSubjectList] = useState([]);
    // const options = [
    //     { value: "Math", label: "Math" },
    //     { value: "Hydraulics & Geology", label: "Hydraulics & Geology" },
    //     { value: "Design", label: "Design" },
    // ];
    useEffect(() => {
        getTopics();
        async function getTopics() {
            setSubjectList(await Fetch("Subjects"));
        }
    }, []);
    const hasKey = (value, data) => {
        const keysArray = data.map((item) => item.value);
        // console.log(keysArray);
        //   console.log(value.value);
        return keysArray.includes(value.value);
    };

    return (
        <>
            <div className="form AddSubject">
                <div className="section-header left">
                    <h5>Add Subject</h5>
                </div>
                <div className="group">
                    <div className="input-wrap">
                        <div className="input-wrap">
                            <p className="label">Select Images</p>
                            <FileInput
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                                multiple="false"
                            />
                        </div>
                        <div className="input-wrap">
                            {/* <input
                        className="form-input"
                        type="text"
                        name="TopicName"
                        placeholder="Name"
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                    /> */}
                            <div className="input-wrap">
                                <p className="label">Select Subject</p>
                                <CreatableSelect
                                    className="dropdown"
                                    isClearable
                                    placeholder="Select or input topic"
                                    options={subjectList}
                                    value={subject}
                                    onChange={(e) => {
                                        setSubject(e == null ? "" : e);
                                        setSubjectExists(
                                            hasKey(subject, subjectList)
                                        );
                                    }}
                                />
                            </div>
                            {isSubjectExists ? (
                                <Input
                                    icon={faUser}
                                    value={subjectName}
                                    onChange={setSubjectName}
                                    placeholder={`Enter new subject name for ${subject.value}`}
                                />
                            ) : null}
                            {isSubjectExists ? (
                                <div className="btn-wrap">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            Delete(
                                                "Subjects",
                                                subject,
                                                where(
                                                    "value",
                                                    "==",
                                                    `${subject}`
                                                )
                                            );
                                            Add(`Subjects`, null, {
                                                value: subject,
                                                label: subject,
                                            });
                                        }}
                                    >
                                        Update Subject
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            //   console.log(subject.value);
                                            if (
                                                window.confirm(
                                                    `Are you sure you want to delete ${subject.value}?`
                                                ) == true
                                            ) {
                                                Delete(
                                                    "Subjects",
                                                    subject.value,
                                                    where(
                                                        "value",
                                                        "==",
                                                        `${subject.value}`
                                                    )
                                                );
                                            }
                                        }}
                                    >
                                        Delete Subject
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        Add(`Subjects`, subject.value, {
                                            value: subject.value,
                                            label: subject.value,
                                        });

                                        e.preventDefault();
                                    }}
                                >
                                    Add Subject
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
