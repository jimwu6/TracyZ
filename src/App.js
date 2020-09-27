import React, { useRef, useState } from "react";
import "./App.css";
import Points from "./components/Points";
import Canvas from "./components/Canvas"

import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
// import { model } from "@tensorflow/tfjs";

function App() {

  const [points, setPoints] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <Canvas points={points}></Canvas>
        <Points points={points} setPoints={setPoints}></Points>
      </header>
    </div>
  );
}

export default App;
