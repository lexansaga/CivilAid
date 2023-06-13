// Modules
import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import TabbedNavigation from "./components/TabbedNavigation";
import FileInput from "./components/FIleInput";
import Input from "./components/Input";
import {
    app,
    firestore,
    Delete,
    Add,
    Fetch,
    Upload,
    UploadThenAdd,
    GetFileByFileName,
} from "./firebase";
import { where } from "firebase/firestore";
import { CleanText } from "./Utils";
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
        async function getAll() {
            // console.log(await fetchFilesContainingText("retry"));
            console.log(await GetFileByFileName("retry"));
        }
        getAll();
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
// *******************************************************
// *******************************************************
//  Subject
// *******************************************************
// *******************************************************
function ManageTopic() {
    const [topicName, setTopicName] = useState("");
    const [topic, setTopic] = useState("");
    const [topicList, setTopicList] = useState([]);

    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    useEffect(() => {
        getTopics();
        async function getTopics() {
            setTopicList(await Fetch("Topics"));
        }
    }, []);
    // console.log(`Topic List : ${topicList}`);
    function hasKey(value, data) {
        console.log(`Has Key ${value}`);
        const keysArray = data.map((item) => item.value);
        return keysArray.includes(value.value);
    }
    const dataToAdd = {
        value: topic.value,
        label: topic.value,
        link: CleanText(topic.value),
    };
    var isTopicExists = hasKey(topic, topicList);
    const validate = (func) => {
        if (isTopicExists) {
            //  console.log(`Validate has key ${subject.value} ${subjectName}`);
            if (func.includes("Update")) {
                return topic && topicName;
            } else {
                return topic;
            }
        } else {
            //     console.log(`Validate no key ${subject}`);
            return topic;
        }
    };
    const reset = () => {
        setSelectedImage([]);
        setFiles([]);
        setTopic("");
        setTopicName("");
        setFiles([]);
        //     setSubjectExists(false);
    };
    // console.log(`Is Exists : ${isTopicExists}`);
    // console.log(`Revoke`);
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
                                setFiles={setFiles}
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
                                    isTopicExists = hasKey(topic, topicList);
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
                                        if (!validate("Update")) {
                                            alert("Fill up all information!");
                                            return;
                                        }
                                        Delete("Topics", topic.value);

                                        UploadThenAdd(
                                            `Assets/Topics`,
                                            files,
                                            topic.value,
                                            `Topics`,
                                            topic.value,
                                            {
                                                value: topic.value,
                                                label: topic.value,
                                                link: CleanText(topic.value),
                                            }
                                        );
                                        reset();
                                    }}
                                >
                                    Update Topic
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        if (!validate("Delete")) {
                                            alert("Fill up all information!");
                                            return;
                                        }
                                        if (
                                            window.confirm(
                                                `Are you sure you want to delete ${topic.value}?`
                                            ) === true
                                        ) {
                                            Delete("Topics", topic.value);
                                            reset();
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
                                    if (!validate("Add")) {
                                        alert("Fill up all information!");
                                        return;
                                    }
                                    UploadThenAdd(
                                        `Assets/Topics`,
                                        files,
                                        topic.value,
                                        `Topics`,
                                        topic.value,
                                        {
                                            value: topic.value,
                                            label: topic.value,
                                            link: CleanText(topic.value),
                                        }
                                    );
                                    reset();
                                    // Add("Topics", topic.value, {
                                    //     value: topic.value,
                                    //     label: topic.value,
                                    // });
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

// *******************************************************
// *******************************************************
//  Subject
// *******************************************************
// *******************************************************

function ManageSubjects() {
    const [subjectName, setSubjectName] = useState("");
    const [subject, setSubject] = useState("");
    const [selectedImage, setSelectedImage] = useState([]);
    // const [isSubjectExists, setSubjectExists] = useState(false);
    const [files, setFiles] = useState([]);
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
        // setSubjectExists(hasKey())
        // const hasKey = async () =>
        //     await Fetch("Subjects", where("value", "==", subject));
    }, []);

    const dataToAdd = {
        value: subject.value,
        label: subject.value,
        link: CleanText(subject.value),
    };

    const hasKey = (value, data) => {
        const keysArray = data.map((item) => item.value);
        // console.log(keysArray);
        //   console.log(value.value);
        return keysArray.includes(value.value);
    };
    var isSubjectExists = hasKey(subject, subjectList);
    const validate = (func) => {
        if (isSubjectExists) {
            //  console.log(`Validate has key ${subject.value} ${subjectName}`);
            if (func.includes("Update")) {
                return subject && subjectName;
            } else {
                return subject;
            }
        } else {
            //     console.log(`Validate no key ${subject}`);
            return subject;
        }
    };
    const reset = () => {
        setSelectedImage([]);
        setFiles([]);
        setSubject("");
        setSubjectName("");
        //     setSubjectExists(false);
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
                                setFiles={setFiles}
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                                multiple="true"
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
                                        // console.log(
                                        //     "Is Subject Exists" +
                                        //         isSubjectExists
                                        // );
                                        isSubjectExists = hasKey(
                                            subject,
                                            subjectList
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
                                            if (!validate("Update")) {
                                                alert(
                                                    "Fill up all information!"
                                                );
                                                return;
                                            }
                                            Delete("Subjects", subject.value);
                                            UploadThenAdd(
                                                `Assets/Subjects`,
                                                files,
                                                subject.value,
                                                `Subjects`,
                                                {
                                                    value: subject.value,
                                                    label: subject.value,
                                                    link: CleanText(
                                                        subject.value
                                                    ),
                                                }
                                            );
                                            reset();
                                        }}
                                    >
                                        Update Subject
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            //   console.log(subject.value);
                                            if (!validate("Delete")) {
                                                alert(
                                                    "Fill up all information!"
                                                );
                                                return;
                                            }
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
                                                //setSelectedImage([]);
                                            }
                                            reset();
                                        }}
                                    >
                                        Delete Subject
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        if (!validate("Add")) {
                                            alert("Fill up all information!");
                                            return;
                                        }
                                        Add(`Subjects`, subject.value, {
                                            value: subject.value,
                                            label: subject.value,
                                        });

                                        UploadThenAdd(
                                            `Assets/Subjects`,
                                            files,
                                            subject.value,
                                            `Subjects`,
                                            subject.value,
                                            {
                                                value: subject.value,
                                                label: subject.value,
                                                link: CleanText(subject.value),
                                            }
                                        );

                                        reset();
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
