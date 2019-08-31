// https://www.tensorflow.org/js/tutorials/transfer/image_classification 

let net;

const classifier = knnClassifier.create();
const webcamElement = document.getElementById('webcam');
// const dogElement = document.getElementById('img')

const dogElement = new Image();
dogElement.crossOrigin = ""
dogElement.src = "https://i.imgur.com/JlUvsxa.jpg"
dogElement.width = 227
dogElement.height = 227
dogElement.id = "img"

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');

  await setupWebcam();

  // Reads an image from the webcam and associates it with a specific class
  // index.
  const addExample = classId => {

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    activation = {}
    if (classId === 3) {
      activation = net.infer(dogElement, 'conv_preds');
    } else {
      activation = net.infer(webcamElement, 'conv_preds');
    }
    
    // const activation = net.infer(webcamElement, 'conv_preds');
    
    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, classId);
    
    
  };

  // When clicking a button, add an example for that class.
  document.getElementById('class-a').addEventListener('click', () => addExample(0));
  document.getElementById('class-b').addEventListener('click', () => addExample(1));
  document.getElementById('class-c').addEventListener('click', () => addExample(2));
  addExample(3);

  while (true) {
    if (classifier.getNumClasses() > 0) {
      // Get the activation from mobilenet from the webcam.
      const activation = net.infer(webcamElement, 'conv_preds');
      
      // Get the most likely class and confidences from the classifier module.
      const result = await classifier.predictClass(activation);
    
      const classes = ['A', 'B', 'C', 'D'] ;
      document.getElementById('console').innerText = `
        prediction: ${classes[result.classIndex]}\n
        probability: ${result.confidences[result.classIndex]}        
      `;
    }

    await tf.nextFrame();
  }
}

async function setupWebcam() {
  return new Promise((resolve, reject) => {
    const navigatorAny = navigator;
    navigator.getUserMedia = navigator.getUserMedia ||
        navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
        navigatorAny.msGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true},
        stream => {
          webcamElement.srcObject = stream;
          webcamElement.addEventListener('loadeddata',  () => resolve(), false);
        },
        error => reject());
    } else {
      reject();
    }
  });
}

app();