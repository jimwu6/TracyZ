import React, { useRef } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
// import { model } from "@tensorflow/tfjs";

const handpose = require("@tensorflow-models/handpose");
require("@tensorflow/tfjs-backend-webgl");

// async function main() {
//   // Load the MediaPipe handpose model.
//   const model = await handpose.load();
//   // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
//   // hand prediction from the MediaPipe graph.
//   const predictions = await model.estimateHands(
//     document.querySelector("video")
//   );
//   if (predictions.length > 0) {
//     for (let i = 0; i < predictions.length; i++) {
//       const keypoints = predictions[i].landmarks;

//       // Log hand keypoints.
//       for (let i = 0; i < keypoints.length; i++) {
//         const [x, y, z] = keypoints[i];
//         console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
//       }
//     }
//   }
// }

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // const runPosenet = async () => {
  //   const net = await posenet.load({
  //     inputResolution: { width: 640, height: 480 },
  //     scale: 0.25,
  //   });

  //   setInterval(() => {
  //     detect(net);
  //   }, 100);
  // };

  // const detect = async (net) => {
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     //get video properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     //set video width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     //Make detections
  //     const pose = await net.estimatePose(video);
  //     console.log(pose);

  //     drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
  //   }
  // };

  // const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
  //   const ctx = canvas.current.getContext("2d");
  //   canvas.current.width = videoWidth;
  //   canvas.current.height = videoHeight;

  //   drawKeypoints(pose["keypoints"], 0.25, ctx);
  //   //drawSkeleton(pose["keypoints"], 0.25, ctx);
  // };

  //runPosenet();

  const runPosenet = async () => {
    const model = await handpose.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.25,
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

    drawKeypoints(keypoints, 0.25, ctx);
    //drawSkeleton(pose["keypoints"], 0.25, ctx);
  };

  runPosenet();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
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
          ref={canvasRef}
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
