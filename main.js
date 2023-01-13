x = 0;
y = 0;

screen_width = 0;
screen_height = 0;

draw_apple = "";

apple = "";
speak_data = "";
to_number = 0;

function preload() {
  apple = loadImage("apple.png");
}

//1. Set the SpeechRecognition variable so you can connect the model:
var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event);
 
 //2. Set the content variable so the speech can be transcript: 
content = event.results[0][0].transcript;
to_number = Number(content);
 

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
    if(Number.isInteger(to_number))
    {
      //3. Use document.getElementById to set "Started drawing apple " on the "status" label:
      document.getElementById("status").innerHTML = "Started drawing apple"

      draw_apple = "set";
    }
    else
    {
      //4. Use document.getElementById to set "The speech has not recognized a number " on the "status" label:
      document.getElementById("status").innerHTML = "The speech has not been recognized a number";

    }

}


function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;

  //5. Create a canvas, use the screen_width and screen_height variables to set the size:
  canvas = createCanvas(900, 600);

  canvas.position(0,150);
}

function draw() {

  if(draw_apple == "set")
  {
    for(var i = 1; i <= to_number; i++)
    {
      //6. Set the x and y variables for them to be a random number:
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + "Apples drawn";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}