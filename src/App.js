import React, { useRef, useState } from "react";
import "./App.css";
import PDF from "./components/PDF";
import Points from "./components/Points";
import Canvas from "./components/Canvas";
import Speech from "./components/Speech";

import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
// import { model } from "@tensorflow/tfjs";

function App() {
  const [points, setPoints] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <PDF></PDF>
        <Points></Points>
        <Canvas></Canvas>
        <Speech></Speech>
      </header>
    </div>
  );
}

export default App;
