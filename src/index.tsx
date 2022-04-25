import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import MapModelOne from "./page/MapModelOne";
import MapModelTwo from "./page/MapModelTwo";
import MapModelThree from "./page/MapModelThree";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/map-model-one" element={<MapModelOne />} />
        <Route path="/map-model-two" element={<MapModelTwo />} />
        <Route path="/map-model-three" element={<MapModelThree />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
