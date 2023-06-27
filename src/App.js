import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Subjects from "./Subjects";
import Subject from "./Subject";
import Admin from "./Admin";
import Topics from "./Topics";

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="subjects" element={<Subjects />} />
                <Route path="topics" element={<Topics />} />
                <Route path="subject" element={<Subject />} />
                <Route path="admin" element={<Admin />} />
            </Routes>
        </div>
    );
}
