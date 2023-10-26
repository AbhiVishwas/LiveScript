import fs from 'fs';


// Transcription begins below 
const startButton = document.querySelector('#btn-start');
const stopButton = document.querySelector('#btn-stop');
const outputDiv = document.querySelector('#output');
let recognition = null;

startButton.addEventListener('click', startTranscription);
stopButton.addEventListener('click', stopTranscription);

// Inputs
function startTranscription() {
  recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = processResult;
  recognition.onerror = processError;
  recognition.start();
  outputDiv.innerHTML = 'Listening...';
}

function stopTranscription() {
  recognition.stop();
}

// Outputs 
// Stored text variable 
let storedText = '';

function processResult(event) {
  const result = event.results[event.results.length - 1];
  const text = result[0].transcript;
  storedText += text; // Append the new text to the stored text

  outputDiv.innerHTML = 'You said: ' + storedText;
}

function processError(event) {
  outputDiv.innerHTML = 'Error: ' + event.error;
}
// End Transcription 

// Store Text 

const filePath = 'transcription.txt';

function logTextToFile(text: string, filePath: string) {
  fs.appendFile(filePath, storedText, (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
    } else {
      console.log('Data has been written to the file:', filePath);
    }
  });
}

logTextToFile(storedText, filePath);
