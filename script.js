document.addEventListener("DOMContentLoaded", function () {
    const transcript = document.querySelector("#transcript");
    const startButton = document.querySelector("#start");
    const stopButton = document.querySelector("#stop");
    let recognition;
    let finalTranscript = "";

    if ("webkitSpeechRecognition" in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

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
            const result = event.results[event.results.length - 1];
            const text = result[0].transcript.trim();

            if (text) {
                finalTranscript = Array.from(new Set(finalTranscript.split(" "))).join(" ") + " " + text;
            }
        };
    } else {
        transcript.innerHTML = "Speech Recognition Not Available";
    }
});
