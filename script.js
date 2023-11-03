document.addEventListener("DOMContentLoaded", function () {
  const transcript = document.querySelector("#transcript");
  const startButton = document.querySelector("#start");
  const stopButton = document.querySelector("#stop");
  const triggerInput = document.querySelector("#trigger-input");
  const popupInput = document.querySelector("#popup-input");
  const addTriggerButton = document.querySelector("#add-trigger");
  const triggerList = document.querySelector("#trigger-list");
  const resumeContainer = document.querySelector("#resume-container");
  let recognition;
  let latestTranscript = "";
  const transcriptHistory = [];

  const triggerWords = {};

  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      transcript.innerHTML = "Listening: ";
      latestTranscript = "";
    };

    recognition.onend = () => {
      transcript.innerHTML += latestTranscript + " (Not listening)";
      latestTranscript = latestTranscript.substring(0, latestTranscript.length);
      transcript.innerHTML = "Final Transcript: " + latestTranscript;
    };

    startButton.addEventListener("click", () => {
      transcript.innerHTML = "Listening: ";
      latestTranscript = "";
      recognition.start();
    });

    stopButton.addEventListener("click", () => {
      recognition.stop();
      postTranscript();
      latestTranscript = "";
      transcript.innerHTML = "Transcript will appear here";
    });

    addTriggerButton.addEventListener("click", () => {
      const triggerWord = triggerInput.value.trim().toLowerCase();
      const popupText = popupInput.value.trim();
      if (triggerWord !== "" && !triggerWords[triggerWord]) {
        triggerWords[triggerWord] = popupText;
        triggerInput.value = "";
        popupInput.value = "";
        displayTriggerWord(triggerWord);
      }
    });

    recognition.onresult = (event) => {
      const result = event.results[0];
      const text = result[0].transcript.trim();

      for (const word in triggerWords) {
        if (text.includes(word)) {
          showPopup(triggerWords[word]);
          highlightWord(word);
        }
      }

      if (!latestTranscript.includes(text)) {
        latestTranscript += text + " ";
        transcript.innerHTML = "Listening: " + latestTranscript;
      }
    };
  } else {
    transcript.innerHTML = "Speech Recognition Not Available";
  }

  function displayTriggerWord(word) {
    const li = document.createElement("li");
    li.innerText = word;
    li.addEventListener("click", () => {
      showPopup(triggerWords[word]);
      highlightWord(word);
    });
    triggerList.appendChild(li);
  }

  function highlightWord(word) {
    const regex = new RegExp(`(\\b${word}\\b)`, "gi");
    transcript.innerHTML = transcript.innerHTML.replace(
      regex,
      '<span style="background-color: yellow">$1</span>'
    );
  }

  function postTranscript() {
    transcriptHistory.unshift(latestTranscript.substring(0, latestTranscript.length));

    resumeContainer.innerHTML = "";

    const resumeBlock = document.createElement("div");
    resumeBlock.classList.add("resume-block");
    const resumeTitle = document.createElement("h2");
    resumeTitle.innerText = "Transcript History";
    const resumeContent = document.createElement("div");
    resumeContent.classList.add("resume-content");

    transcriptHistory.forEach((transcript) => {
      const p = document.createElement("p");
      p.innerText = transcript;
      resumeContent.appendChild(p);
    });

    resumeBlock.appendChild(resumeTitle);
    resumeBlock.appendChild(resumeContent);
    resumeContainer.appendChild(resumeBlock);
  }

  function showPopup(text) {
    // You can customize how the popup is displayed here.
    alert(text);
  }
});
