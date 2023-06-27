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
import {
    where,
    collection,
    query,
    getCountFromServer,
} from "firebase/firestore";
import { CleanText, IsNull } from "./Utils";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./styles/Admin.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import CreatableSelect, { useCreatable } from "react-select/creatable";

// Assets
import Hero_Banner from "./assets/hero-bg.jpg";
import { setConsent } from "firebase/analytics";
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
                            tabNames={["Subject", "Topic", "Content", "About"]}
                            tabContents={[
                                <ManageSubjects />,
                                <ManageTopic />,
                                <SetTopics />,
                                <Welcome />,
                            ]}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            // [{ font: [] }],
            ["bold", "italic", "underline", "strike"], // toggled buttons
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            ["blockquote", "code-block"],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            ["link", "image"],
            ["clean"], // remove formatting button
        ],
    },
};

function SetTopics() {
    const [value, setValue] = useState("");
    const [selectedImage, setSelectedImage] = useState([]);
    const [topic, setTopic] = useState("");
    const [subject, setSubject] = useState("");
    const [subTopic, setSubTopic] = useState("");
    const [topicLists, setTopicLists] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [subTopicLists, setSubTopicLists] = useState([]);
    const [isNew, setIsNew] = useState(false);

    const [sortKey, setSortKey] = useState(0);
    useEffect(() => {
        // getSortKeyCount();
        async function getSortKeyCount() {
            const countKeyValue = [];
            const coll = collection(
                firestore,
                "Content",
                where("topic", "==", topic.value)
            );
            // const q = query(coll, where("state", "==", "CA"));
            const snapshot = await getCountFromServer(coll);
            // for (var i = 1; i <= snapshot.data().count; i++) {
            //     countKeyValue.push({
            //         value: i,
            //         label: i,
            //     });
            // }

            setSortKey(snapshot.data().count + 1);
        }

        console.log(topicLists);
        // getTopics();
        getSubjects();
        // getSubTopics();
        async function getSubjects() {
            setSubjectList(await Fetch("Subjects"));
        }
        // async function getSubTopics() {
        //     const sTopic = await Fetch("Content");
        //     // setSubTopicList(sTopic);

        //     var sTopics = [];
        //     if (sTopic.length != 0) {
        //         sTopic.map((item, value) => {
        //             sTopics.push({
        //                 value: item.SubTopic,
        //                 label: item.SubTopic,
        //             });
        //         });
        //     }
        //     setSubTopicList(sTopics);
        //     console.log(sTopic);
        // }
    }, []);
    // console.log(subject.value);
    // console.log(
    //     `Topic : ${CleanText(topic.value)} \n Subject : ${CleanText(
    //         subject.value
    //     )}`
    // );
    const reset = () => {
        setTopicLists([]);
        setTopic("");
        setSubject("");
        setSubTopicLists([]);
        setSubTopic("");
        setValue("");
    };
    return (
        <>
            <div className="form">
                <div className="input-wrap">
                    <p className="label">Select Subject</p>
                    <Select
                        className="dropdown"
                        options={subjectList}
                        value={subject}
                        onChange={async (e) => {
                            setSubject(e == null ? "" : e);
                            // console.log(e);
                            setTopicLists(
                                await Fetch(
                                    "Topics",
                                    where("tag", "==", e.link)
                                )
                            );
                            console.log(topicLists);
                        }}
                    />
                </div>

                <div className="input-wrap">
                    <p className="label">Sort Number</p>
                    <Input
                        icon={faUser}
                        value={sortKey}
                        onChange={setSortKey}
                        type="number"
                        placeholder={"ID : " + sortKey}
                    />
                </div>
                <div className="input-wrap">
                    <p className="label">Select Topic</p>
                    <Select
                        className="dropdown"
                        options={topicLists}
                        value={topic}
                        onChange={async (e) => {
                            setTopic(e == null ? "" : e);
                            setSubTopic("");
                            setValue("");
                            const sTopic = await Fetch(
                                "Content",
                                where("topicTag", "==", CleanText(e.link))
                            );
                            // setSubTopicLists(sTopic);

                            var sTopics = [];
                            if (sTopic.length != 0) {
                                sTopic.map((item, value) => {
                                    sTopics.push({
                                        value: item.SubTopic,
                                        label: item.SubTopic,
                                    });
                                });
                            }
                            setSubTopicLists(sTopics);
                            console.log(subTopicLists);

                            const countKeyValue = [];
                            const coll = collection(firestore, "Content");
                            const q = query(
                                coll,
                                where("topic", "==", e.value)
                            );
                            const snapshot = await getCountFromServer(q);
                            // for (var i = 1; i <= snapshot.data().count; i++) {
                            //     countKeyValue.push({
                            //         value: i,
                            //         label: i,
                            //     });
                            // }

                            setSortKey(snapshot.data().count + 1);
                        }}
                    />
                </div>

                <div className="input-wrap">
                    <p className="label">Sub-topic Name</p>
                    <CreatableSelect
                        className="dropdown"
                        isClearable
                        placeholder="Select or input topic"
                        options={subTopicLists}
                        value={subTopic}
                        onChange={async (e) => {
                            setSubTopic(e == null ? "" : e);
                            if (e.__isNew__) {
                                setIsNew(true);
                                setValue("");
                                return;
                            }
                            const content = await Fetch(
                                "Content",
                                where("SubTopic", "==", e.value)
                            );
                            console.log(subTopic.value);
                            setValue(content[0].content);

                            const countKeyValue = [];
                            const fetch = await Fetch(
                                "Content",
                                where("SubTopic", "==", e.value)
                            );

                            // for (var i = 1; i <= snapshot.data().count; i++) {
                            //     countKeyValue.push({
                            //         value: i,
                            //         label: i,
                            //     });
                            // }
                            console.log(fetch);
                            setSortKey(fetch[0].sortKey);
                        }}
                    />
                </div>

                {/* <div className="input-wrap">
                    <p className="label">Select Images</p>
                    <FileInput
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        multiple="true"
                    />
                </div> */}
                <div className="input-wrap">
                    <p className="label">Content</p>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                    />
                </div>
                <div className="btn-wrap">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            // console.log(subTopic);
                            try {
                                Add("Content", subTopic.value, {
                                    topic: topic.value,
                                    subject: subject.value,
                                    content: value,
                                    sortKey: parseInt(sortKey),
                                    topicTag: CleanText(topic.value),
                                    subjectTag: CleanText(subject.value),
                                    SubTopic: subTopic.value,
                                });

                                alert("Data Added Successfully");
                                reset();
                            } catch (e) {
                                alert("Data Insert Failed");
                            }
                        }}
                    >
                        Submit
                    </button>
                    {/* {console.log(isNew)} */}
                    {!isNew ? (
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                // console.log(subTopic);
                                try {
                                    if (
                                        window.confirm(
                                            `Are you sure you want to delete ${subTopic.value}?`
                                        ) == true
                                    ) {
                                        Delete("Content", subTopic.value);
                                        alert("Data Deleted Successfully");
                                        reset();
                                    }
                                } catch (e) {
                                    alert("Data Delete Failed");
                                }
                            }}
                        >
                            Delete
                        </button>
                    ) : (
                        isNew
                    )}
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
function ManageTopic() {
    const [topicName, setTopicName] = useState("");
    const [topic, setTopic] = useState("");
    const [subject, setSubject] = useState("");
    const [topicList, setTopicList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);

    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    useEffect(() => {
        getTopics();
        async function getTopics() {
            setSubjectList(await Fetch("Subjects"));
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

    var selectedTopic = !IsNull(topicName) ? topic.value : topicName;
    console.log(selectedTopic);
    var isTopicExists = hasKey(topic, topicList);
    const validate = (func) => {
        if (isTopicExists) {
            //  console.log(`Validate has key ${subject.value} ${subjectName}`);
            if (func.includes("Update")) {
                return topic;
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
        setSubject("");
        // setSubjectList("");
        setSelectedImage([]);
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
                            <p className="label">Select Subject</p>
                            <Select
                                className="dropdown"
                                placeholder="Select or input topic"
                                options={subjectList}
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e == null ? "" : e);
                                }}
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
                                        try {
                                            if (files.length === 0) {
                                                Delete("Topics", topic.value);
                                                Add(`Topics`, topicName, {
                                                    value: topicName,
                                                    label: topicName,
                                                    tag: CleanText(
                                                        subject.value
                                                    ),
                                                    link: CleanText(topicName),
                                                });
                                                reset();
                                                alert(
                                                    "Data inserted successfully"
                                                );
                                                return;
                                            }
                                            Delete("Topics", selectedTopic);
                                            UploadThenAdd(
                                                `Assets/Topics`,
                                                files,
                                                selectedTopic,
                                                `Topics`,
                                                selectedTopic,
                                                {
                                                    value: selectedTopic,
                                                    label: selectedTopic,
                                                    tag: CleanText(
                                                        subject.value
                                                    ),
                                                    link: CleanText(
                                                        selectedTopic
                                                    ),
                                                }
                                            );
                                            reset();
                                            alert("Data updated successfully");
                                        } catch (e) {
                                            console.log(e);
                                        }
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
                                                `Are you sure you want to delete ${selectedTopic}?`
                                            ) == true
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
                                    try {
                                        console.log(files.length);
                                        console.log(topic.value);
                                        if (files.length === 0) {
                                            Add(`Topics`, topic.value, {
                                                value: topic.value,
                                                label: topic.value,
                                                tag: CleanText(subject.value),
                                                link: CleanText(topic.value),
                                            });
                                            reset();
                                            alert("Data inserted successfully");
                                            return;
                                        }
                                        UploadThenAdd(
                                            `Assets/Topics`,
                                            files,
                                            selectedTopic,
                                            `Topics`,
                                            selectedTopic,
                                            {
                                                value: selectedTopic,
                                                label: selectedTopic,
                                                tag: CleanText(subject.value),
                                                link: CleanText(selectedTopic),
                                            }
                                        );
                                        reset();
                                        alert("Data inserted successfully");
                                    } catch (e) {
                                        console.log(e);
                                    }
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
    const [files, setFiles] = useState([]);
    const [subjectList, setSubjectList] = useState([]);

    const [sortKey, setSortKey] = useState(0);
    // const [sortKeyCount, setSortKeyCount] = useState("");

    useEffect(() => {
        getSortKeyCount();
        async function getSortKeyCount() {
            const countKeyValue = [];
            const coll = collection(firestore, "Subjects");
            // const q = query(coll, where("state", "==", "CA"));
            const snapshot = await getCountFromServer(coll);
            // for (var i = 1; i <= snapshot.data().count; i++) {
            //     countKeyValue.push({
            //         value: i,
            //         label: i,
            //     });
            // }

            setSortKey(snapshot.data().count + 1);
        }
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
        setSortKey("");
        setSelectedImage([]);
        setFiles([]);
        setSubject("");
        setSubjectName("");
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
                            <p className="label">Sort Number</p>
                            <Input
                                icon={faUser}
                                value={sortKey}
                                onChange={setSortKey}
                                type="number"
                                placeholder={"ID : " + sortKey}
                            />
                        </div>
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
                            <div className="input-wrap">
                                <p className="label">Select Subject</p>
                                <CreatableSelect
                                    className="dropdown"
                                    isClearable
                                    placeholder="Select or input topic"
                                    options={subjectList}
                                    value={subject}
                                    onChange={async (e) => {
                                        setSubject(e == null ? "" : e);
                                        isSubjectExists = hasKey(
                                            subject,
                                            subjectList
                                        );
                                        const getSortKey = await Fetch(
                                            "Subjects",
                                            where(
                                                "link",
                                                "==",
                                                CleanText(e.value)
                                            )
                                        );

                                        setSortKey(getSortKey[0].sortKey);
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
                                            try {
                                                Delete(
                                                    "Subjects",
                                                    subject.value
                                                );
                                                UploadThenAdd(
                                                    `Assets/Subjects`,
                                                    files,
                                                    subject.value,
                                                    `Subjects`,
                                                    {
                                                        value: subject.value,
                                                        label: subject.value,
                                                        sortKey:
                                                            parseInt(sortKey),
                                                        link: CleanText(
                                                            subject.value
                                                        ),
                                                    }
                                                );
                                                reset();

                                                alert(
                                                    "Data updated successfully"
                                                );
                                            } catch (e) {
                                                console.log(e);
                                            }
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
                                        // Add(`Subjects`, subject.value, {
                                        //     value: subject.value,
                                        //     label: subject.value,
                                        // });
                                        try {
                                            UploadThenAdd(
                                                `Assets/Subjects`,
                                                files,
                                                subject.value,
                                                `Subjects`,
                                                subject.value,
                                                {
                                                    value: subject.value,
                                                    label: subject.value,
                                                    sortKey: parseInt(sortKey),
                                                    link: CleanText(
                                                        subject.value
                                                    ),
                                                }
                                            );

                                            reset();
                                            alert("Data inserted successfully");
                                        } catch (e) {
                                            console.log(e);
                                        }

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

function Welcome() {
    const [hpWelcome, setHPWelcome] = useState("");
    const [ipWelcome, setIPWelcome] = useState("");

    useEffect(() => {
        async function getContents() {
            const data = await Fetch("Welcome");
            setHPWelcome(data[0].Excerpt);
            setIPWelcome(data[0].FullContent);
            console.log(data);
        }
        getContents();
    }, []);
    return (
        <>
            <div className="form about">
                <div className="section-header left">
                    <h5>Add Subject</h5>
                </div>
                <div className="group">
                    <div className="input-wrap">
                        <div className="input-wrap">
                            <p className="label">Welcome Excerpt (Home Page)</p>
                            <ReactQuill
                                theme="snow"
                                value={hpWelcome}
                                onChange={setHPWelcome}
                                modules={modules}
                            />
                        </div>
                        <div className="input-wrap">
                            <p className="label">
                                Welcome Excerpt (About Page)
                            </p>
                            <ReactQuill
                                theme="snow"
                                value={ipWelcome}
                                onChange={setIPWelcome}
                                modules={modules}
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                Add("Welcome", "Content", {
                                    Excerpt: hpWelcome,
                                    FullContent: ipWelcome,
                                });
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
