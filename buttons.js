const startButton = document.querySelector('#btn-start');
const stopButton = document.querySelector('#btn-stop');
const outputDiv = document.querySelector('#output');
let recognition = new webkitSpeechRecognition();

startButton.addEventListener('click', () => {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    const text = result[0].transcript;
    outputDiv.innerHTML = 'You said: ' + text;
  };
  recognition.onerror = (event) => {
    outputDiv.innerHTML = 'Error: ' + event.error;
  };
  recognition.start();
  outputDiv.innerHTML = 'Listening...';
});

stopButton.addEventListener('click', () => {
  recognition.stop();
});
