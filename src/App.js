import React, { useRef } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            width: 640,
            height: 480,
          }}
        />

        <canvas
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
