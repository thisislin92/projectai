const speech = require("@google-cloud/speech");
const { log } = require("console");
const fs = require("fs");

// process.env.GOOGLE_APPLICATION_CREDENTIALS = "herlina.json";

async function transcribeAudio(audiofile) {
  try {
        const speechClient = new speech.SpeechClient();

        const file = fs.readFileSync(audiofile);
        const audioBytes = file.toString('base64')

        const audio = {
            content: audioBytes
        };

        const config = {
            encoding:'LINEAR16', 
            sampleRateHertz:8000,
            languageCode:'en-US'
        }
        return new Promise((resolve,reject)=>{
            speechClient.recognize({audio,config})
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error);
            })
        })
  } 
  catch (error) {
    console.error('ERROR:',error)
  }
}

(async()=>{
    const data = await transcribeAudio('voip.wav');
    console.log(data)
})()
