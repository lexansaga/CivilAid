import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Subjects from "./Subjects";

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="subjects" element={<Subjects />} />
            </Routes>
        </div>
    );
}
