const scoreBoard = document.querySelector('.score');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const game = document.getElementById("game");
const rule = document.getElementById('rule');
const engineBtn = document.getElementById('engineBtn');
const exitBtn = document.querySelector('.exitbtn');
const backgroundMusic = document.getElementById("Mario");
const coinMove = document.querySelector(".coin");
const gameovere = document.getElementById('gameend');
const playButton = document.querySelector('.startButton');
const seconds = document.getElementById('seconds');
const playAgain = document.querySelector('.buttonStart');
const scoreAct = document.querySelector('.scoreAct');
const changeTitle = document.querySelector('.title');
const gameover = document.querySelector('.gameover');
const high = document.querySelector('.high')
const highScore = JSON.parse(localStorage.getItem('high')) || 0;
let score = 0;
let lastHole;
let timeUp = false;
let isActive;
let imageURL;


const images = ['images/goomba.png', 'images/goomba.png', 'images/goomba.png', 'images/goomba.png', 'images/littlegombas.png', 'images/littlegombas.png', 'images/littlegombas.png', 'images/koopatroopa.png', 'images/koopatroopa.png', 'images/koopatroopa.png', 'images/spiny.png', 'images/spiny.png', 'images/spiny.png', 'images/piranhaplant.png', 'images/piranhaplant.png', 'images/goldenmushroom.png'];

moles.forEach(mole => mole.addEventListener('click', clickIt));
engineBtn.addEventListener('click', openRules);
exitBtn.addEventListener('click', exitRules);
playButton.addEventListener('click', startGame);

// Function to restart game and play again on button shown when previous game ended
playAgain.addEventListener('click', () => {
    document.location.reload;
});
// Function to open Game Over display
function showGameOver() {
    gameovere.style.display = "block";
    scoreAct.textContent += `Score: ${score} POINTS`;
    if (score != 0) {
        changeTitle.textContent = "time's up";
        gameover.style.background = "blue";
        stagecomplete.play();
    }
}
// Function to open table with rules 
function openRules() {
    rule.style.display = "block";
}
// Function to quit table with rules 
function exitRules() {
    rule.style.display = "none";
}

// Function to save in local storage and update hightscore

setBestScore = (highScore = 0, high) => {
    localStorage.setItem('high', JSON.stringify(highScore));
    high.innerText = highScore;
}
// Function to start the game
function startGame() {
    timeUp = false;
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    game.style.cursor = "url('images/beforehit.png'), auto";
    engineBtn.removeEventListener('click', openRules);
    playButton.removeEventListener('click', startGame);
    holeFind();
    timeLeftTimer();
}
// Function to calculate time remaining
function timeLeftTimer() {
    let gameTime = 30;
    let timer = setInterval(function () {
        gameTime--;
        seconds.textContent = ` ${gameTime}`;
        if (gameTime <= 0 || timeUp === true)
            clearInterval(timer);
    }, 1000);
    setTimeout(() => {
        timeUp = true;
        if (gameTime <= 0) {
            showGameOver();
            stopGame()

        }
    }, 30000);
}
// Function to randomly choose holes 
function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole == lastHole) {
        return randomHole(holes);
    };
    lastHole = hole;
    return hole;
};
// Function to randomly determine the duration 
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};
// Function to randomly choose on which hole character will shown up
function holeFind() {
    const time = randomTime(900, 1200);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) holeFind();
    }, time);
    const idx = Math.floor(Math.random() * (images.length));
    imageURL = images[idx];
    moles.forEach(mole => {
        mole.style.backgroundImage = `url('')`;
    });
    isActive = document.querySelector(".hole.up").children;
    isActive[0].style.backgroundImage = `url('${imageURL}')`;
};
// Function to determine rules of the game
function rulesOfTheGame() {
    switch (imageURL) {
        case "images/koopatroopa.png":
            score += 150;
            stomp.play();
            isActive[0].style.backgroundImage = "url('images/shell.png')";
            isActive[0].addEventListener('click', () => {
                coinsound1.play();
                isActive[0].parentNode.classList.remove('up');
            })
            setTimeout(() => {
                isActive[0].parentNode.classList.remove('up');
            }, 1000);
            break;
        case "images/piranhaplant.png":
            score = 0;
            timeUp = true;
            backgroundMusic.pause();
            mariohit.play();
            setTimeout(() => {
                showGameOver()
                gameoverSound.play();
            }, 2500);
            break;
        case "images/littlegombas.png":
            score += 150;
            coinsound.play();
            isActive[0].parentNode.classList.remove('up');
            break;
        case "images/goldenmushroom.png":
            score *= 2;
            goldenmushroom.play();
            goldenmushroom.currentTime = 0;
            isActive[0].parentNode.classList.remove('up');
            break;
        case "images/spiny.png":
            score -= 200;
            powerdown.play();
            isActive[0].parentNode.classList.remove('up');
            break;
        case "images/goomba.png":
            score += 100;
            coinsound.play();
            isActive[0].parentNode.classList.remove('up');
            break;
        default:
    }
    scoreBoard.textContent = score;
    if (score > highScore) setBestScore(score, high);
}
// Function Game Over
function stopGame() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    timeUp = true;
}
// Function to find if character is clicked
function clickIt(e) {
    if (!e.isTrusted) return;
    setTimeout(() => {
        coinMove.classList.add('animated');
    }, 1)
    coinMove.classList.remove('animated');
    setTimeout(() => {
        game.style.cursor = "url('images/beforehit.png'), auto";
    }, 150);
    game.style.cursor = "url('images/afterhit.png'), auto";
    rulesOfTheGame(imageURL);;
}
setBestScore(highScore, high);