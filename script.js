const msgEl = document.getElementById('msg'); //creating variable we can grab

const randomNum =getRandomNumber();  //variable to hold number

function getRandomNumber(){
    return Math.floor(Math.random()* 100) + 1; //math.floor creates a whole integer. Math.random provides number between 0 and .99 * 100 multiplys it +1 adds one so it can be 100 create random number for game
}

console.log("Number: ", randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition // Initialize a speech recognition object

//create variable to work with speech recognition object
let recognition = new window.SpeechRecognition();


recognition.start(); //starts the game 

recognition.addEventListener('result', onSpeak); //listen for result event

//creating onSpeak function
function onSpeak(e){ //as a parameter 'result' is e
    // console.log(e); //see what we're getting back don't need
    const msg = e.results[0][0].transcript; //capturing message
    console.log(msg);

    writeMessage(msg);
    checkNumber(msg);
}

//display msg to the screen
function writeMessage(msg){ //take msg element in dom and replace it
    msgEl.innerHTML = `
    <div> You Said: </div>
    <span class="box"> ${msg}</span>
    `;
};

//check the msg against the number 
function checkNumber(msg){ //convert all numbers to string, check for valid num, see if num is in range, give prompts based on if num is too low to high
    const num = +msg; //shorthand to convert string to num
    if(Number.isNaN(num)){  //determin if you have number
        msgEl.innerHTML += '<div> That is not a valid number </div>';
        return;
    } 
    //check to see if number is in range
    if(num > 100 || num < 1){
        msgEl.innerHTML += '<div> Your number must be between 1 and 100 </div>';
        return;
    }

    //check number against random number
    if (num === randomNum){
        document.body.innerHTML = `
        <h2> Congratulations! You guessed the number <br><br>
        It was ${num} </h2>
        <button class="play-again" id="play-again"> Play Again </button>
        `;
    } else if(num > randomNum){
        msgEl.innerHTML += '<div> Go Lower </div>';
    }else{
        msgEl.innerHTML += '<div> Go Higher</div>';
    }

}

//allow user to continue to guess - end speech recognition
recognition.addEventListener('end', ()=> recognition.start());


//make the play button work
document.body.addEventListener('click', e =>{
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
});