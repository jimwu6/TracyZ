import React, { useRef, useState } from "react";
import "./App.css";
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
      <div className="title">tracyZ</div>
      <div className="canvas-header">Canvas</div>
      <Canvas points={points}></Canvas>
      <div className="camera-header">Camera</div>
      <Points points={points} setPoints={setPoints}></Points>
      <Speech></Speech>
    </div>
  );
}

export default App;
