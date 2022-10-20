const userBtn = document.querySelector("#userBtn");
const userInputEl = document.querySelector("#username");
const displayUser = document.querySelector("#user");
const guessBtn = document.querySelector("#guessBtn");
const guessInputEl = document.querySelector("#guessInput");
const toast = document.querySelector(".toast");
const gameSection = document.querySelector(".game_section");
const gameSectionContainer = document.querySelector(".user_section_container");
const questionEl = document.querySelector("#question");
const gameOverOverlay = document.querySelector(".game_over");
const resetBtn = document.querySelector("#resetBtn");
const displayLife = document.querySelector("#life");

// Handle user
const handleUserBtnClick = () => {
    const user = userInputEl.value;

    if(!user || !user.length){
        toast.innerHTML = "Username field can not be empty.";
        toast.className = "toast error show";
        
        return setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
    
    gameSection.style.display = "block";
    gameSectionContainer.classList.add("hide");
    displayUser.innerHTML = user;
    return;
}
userBtn.addEventListener("click", handleUserBtnClick);

// Game section
function Game(){

    const genNumberRange = (a, b) => (Math.floor(Math.random() * b) + a);

    let range1 = 1;
    let range2 = 2;
    let secret = genNumberRange(range1, range2);
    let life = 5;

    questionEl.innerHTML = `Guess a number between ${range1} and ${range2}.`;
    displayLife.textContent = life;

    const success = () => {
        range2++;
        this.render();
        toast.innerHTML = "Correct! ";
        toast.className = "toast success show";
        
        return setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    const failure = () => {
        life--;
        toast.innerHTML = `Wrong guess, the secret is ${secret}. Try again`;
        toast.className = "toast error show";
        this.render();
        
        return setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    const renderGameOver = () => {
        if(life === 0) { return gameOverOverlay.classList.add("show") };
    }

    this.guess = function(){
        const secretGuess = guessInputEl.value;

        if(life === 0) { return renderGameOver() };
        if(!secretGuess){
            toast.innerHTML = "Field can't be empty!";
            toast.className = "toast error show";
            
            return setTimeout(() => {
                toast.classList.remove("show");
            }, 2000);
        }
            
        if(secret === +secretGuess){ success(); } 
        else { failure(); }

        this.render();
    }

    this.render = function(){       
        secret = genNumberRange(range1, range2);
        guessInputEl.value = null;
        questionEl.innerHTML = `Guess the secret number (between <span class="info">${range1}</span> and <span class="info">${range2}</span>).`;
        displayLife.textContent = life;
        if(life === 0) { return renderGameOver() };
    }

    this.reset = function(){
        range2 = 2;
        life = 5;
        gameOverOverlay.classList.remove("show");
        return this.render();
    }
    
}

const game = new Game();

const handleGuess = () => game.guess();
const handleReset = () => game.reset();

guessBtn.addEventListener("click", handleGuess);
resetBtn.addEventListener("click", handleReset);