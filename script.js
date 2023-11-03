document.addEventListener("DOMContentLoaded", function () {
  const transcript = document.querySelector("#transcript");
  const startButton = document.querySelector("#start");
  const stopButton = document.querySelector("#stop");
  let recognition;
  let finalTranscript = "";

  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      transcript.innerHTML = "Listening: ";
      finalTranscript = "";
    };

    recognition.onend = () => {
      transcript.innerHTML += finalTranscript + " (Not listening)";
    };

    startButton.addEventListener("click", () => {
      transcript.innerHTML = "Listening: ";
      finalTranscript = "";
      recognition.start();
    });

    stopButton.addEventListener("click", () => {
      recognition.stop();
    });

    recognition.onresult = (event) => {
      const result = event.results[0];
      const text = result[0].transcript.trim();

      if (!finalTranscript.includes(text)) {
        finalTranscript += text + " ";
        transcript.innerHTML = "Listening: " + finalTranscript;
      }
    };
  } else {
    transcript.innerHTML = "Speech Recognition Not Available";
  }

  function getUniqueWords(text) {
    const currentWords = text.split(" ");
    const previousWords = finalTranscript.split(" ");
    const uniqueWords = [];

    for (const word of currentWords) {
      if (
        !previousWords.includes(word) &&
        !uniqueWords.includes(word)
      ) {
        uniqueWords.push(word);
      }
    }

    return uniqueWords;
  }
});
