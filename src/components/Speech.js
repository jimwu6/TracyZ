const tf = require("@tensorflow/tfjs");
const speechCommands = require("@tensorflow-models/speech-commands");
let recognizer;
let words;
const wordList = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "yes",
  "no",
  "up",
  "down",
  "left",
  "right",
  "stop",
  "go",
];
let modelLoaded = false;

const Speech = () => {
  async function loadModel() {
    const loadingElement = document.getElementById("demo-loading");

    recognizer = speechCommands.create("BROWSER_FFT");
    await recognizer.ensureModelLoaded();

    words = recognizer.wordLabels();
    modelLoaded = true;


    startListening();
  }

  function startListening() {
    recognizer.listen(
      ({ scores }) => {
        scores = Array.from(scores).map((s, i) => ({
          score: s,
          word: words[i],
        }));

        scores.sort((s1, s2) => s2.score - s1.score);

        const elementId = `word-${scores[0].word}`;
        console.log(elementId);

        setTimeout(() => {
        }, 2500);
      },
      {
        probabilityThreshold: 0.7,
      }
    );
  }

  loadModel();
  return null;
};

export default Speech;
