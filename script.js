document.addEventListener("DOMContentLoaded", function () {
  const transcript = document.querySelector("#transcript");
  const startButton = document.querySelector("#start");
  const stopButton = document.querySelector("#stop");
  const triggerInput = document.querySelector("#trigger-input");
  const addTriggerButton = document.querySelector("#add-trigger");
  const triggerList = document.querySelector("#trigger-list");
  let recognition;
  let finalTranscript = "";

  const triggerWords = [];

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

    addTriggerButton.addEventListener("click", () => {
      const triggerWord = triggerInput.value.trim().toLowerCase();
      if (triggerWord !== "" && !triggerWords.includes(triggerWord)) {
        triggerWords.push(triggerWord);
        triggerInput.value = "";
        displayTriggerWord(triggerWord);
      }
    });

    recognition.onresult = (event) => {
      const result = event.results[0];
      const text = result[0].transcript.trim();
      const words = text.split(" ");

      for (const word of words) {
        if (triggerWords.includes(word.toLowerCase())) {
          highlightWord(word);
        }
      }

      if (!finalTranscript.includes(text)) {
        finalTranscript += text + " ";
        transcript.innerHTML = "Listening: " + finalTranscript;
      }
    };
  } else {
    transcript.innerHTML = "Speech Recognition Not Available";
  }

  function displayTriggerWord(word) {
    const li = document.createElement("li");
    li.innerText = word;
    triggerList.appendChild(li);
  }

  function highlightWord(word) {
    const regex = new RegExp(`(\\b${word}\\b)`, "gi");
    transcript.innerHTML = transcript.innerHTML.replace(
      regex,
      '<span style="background-color: yellow">$1</span>'
    );
  }
});
