import React, { useRef, useState } from "react";
import "./App.css";
import PDF from "./components/PDF";
import Points from "./components/Points";
import Canvas from "./components/Canvas"

import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
// import { model } from "@tensorflow/tfjs";

function App() {

<<<<<<< HEAD
  const [points, setPoints] = useState([]);
=======
  //runPosenet();

  const runPosenet = async () => {
    const model = await handpose.load({
      inputResolution: { width: 640, height: 480 },
      scale: 1,
    });

    setInterval(() => {
      detect(model);
    }, 100);
  };

  const detect = async (model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Make detections
      const predictions = await model.estimateHands(
        document.querySelector("video")
      );

      if (predictions.length > 0) {
        for (let i = 0; i < predictions.length; i++) {
          const keypoints = predictions[i].landmarks;

          // Log hand keypoints.
          for (let i = 0; i < keypoints.length; i++) {
            const [x, y, z] = keypoints[i];
            //console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
          }
          drawCanvas(keypoints, video, videoWidth, videoHeight, canvasRef);
        }
      }
    }
  };

  const drawCanvas = (keypoints, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(keypoints, 1, ctx);
    drawSkeleton(keypoints, 1, ctx);
  };

  runPosenet();
>>>>>>> f34c87048b889519e5c4c4b9cace723ebe14c8b8

  return (
    <div className="App">
      <header className="App-header">
        <PDF></PDF>
        <Points></Points>
        <Canvas></Canvas>
      </header>
    </div>
  );
}

export default App;
