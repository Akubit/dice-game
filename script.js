// Players 

class Player {
    constructor(name, display, history, diceboard) {
        this.name= name ;
        this.score = 0;
        this.dice = [];
        this.display = document.getElementById(display);
        this.history = document.getElementById(history);
        this.diceBoard = document.getElementById(diceboard);
    }
}

let playerOne = new Player('Player 1','player1Scoreboard','player1History','p1board')
let playerTwo = new Player('Player 2','player2Scoreboard','player2History','p2board')

// Die 
let die = 0
const dieDisplay = document.getElementById('playerDice')
let dieImage = [
    '<i class="dice-1"><span class="path1"></span><span class="path2"></span></i>',
    '<i class="dice-2"><span class="path1"></span><span class="path2"></span></i>',
    '<i class="dice-3"><span class="path1"></span><span class="path2"></span></i>',
    '<i class="dice-4"><span class="path1"></span><span class="path2"></span></i>',
    '<i class="dice-5"><span class="path1"></span><span class="path2"></span></i>',
    '<i class="dice-6"><span class="path1"></span><span class="path2"></span></i>',
]

// Variables for display
let currentPlayer = playerOne 
const message = document.getElementById('message')
const rollBtn = document.getElementById('rollBtn')
const resetBtn = document.getElementById('resetBtn')

message.textContent = ` ${currentPlayer.name} turn!`

// Logic for dice roll
function rollTheDie(player) {

    rollBtn.disabled = true
    dieDisplay.classList.add('active')

    setTimeout(() => {
        die = Math.floor((Math.random() * 6) + 1)
        player.score += die
        player.dice.push(dieImage[die-1])
        
        player.history.innerHTML = player.dice.join(" ")
        player.display.textContent =  player.score

        dieDisplay.innerHTML = dieImage[die-1]
        dieDisplay.classList.remove('active')

        if (player.score >= 20) {
            message.textContent = ` ${player.name} VICTORY!`
            player.diceBoard.classList.add('winner')
            rollBtn.style.display = "none"
            resetBtn.style.display = "block"
        } else {
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne
            message.textContent = ` ${currentPlayer.name} turn!`
        }

        rollBtn.disabled = false;

    }, 2000)
}

// Roll the die depending on current player
function rollTheDice() {
    currentPlayer === playerOne ? rollTheDie(playerOne) : rollTheDie(playerTwo)
}

function resetPlayer(player) {
    player.dice = []
    player.score = 0
    player.history.innerHTML= ''
    player.display.textContent= '0'
}


// Resetbtn function
function resetGame() {
    resetPlayer(playerOne)
    resetPlayer(playerTwo)
    currentPlayer.diceBoard.classList.remove('winner')
    currentPlayer = playerOne
    message.textContent = ` ${currentPlayer.name} turn!`
    rollBtn.style.display = "block"
    resetBtn.style.display = "none"
}


// Event listeners
rollBtn.addEventListener('click',rollTheDice)
resetBtn.addEventListener('click',resetGame)