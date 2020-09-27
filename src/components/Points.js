import React, { useRef } from 'react';
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/handpose";
import { drawKeypoints, drawSkeleton } from "../utilities";

const handpose = require("@tensorflow-models/handpose");
require("@tensorflow/tfjs-backend-webgl");

const Points = ({ setPoints }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runPosenet = async () => {
        const model = await handpose.load({
        inputResolution: { width: 640, height: 480 },
        scale: 1,
        });

        setInterval(() => {
        detect(model);
        }, 150);
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
                var [a, b, c] = keypoints[8];
                var [x, y, z] = keypoints[5];
                if ((a-x)*(a-x)+(y-b)*(y-b) > 700) {
                    setPoints(p => p.concat(keypoints[8]))
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
        //drawSkeleton(pose["keypoints"], 0.25, ctx);
    };
    
    runPosenet();

    return (
        <div>
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
            transform: "scaleX(-1)",
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
            transform: "scaleX(-1)",
          }}
        />
        </div>    
    );
};

export default Points;