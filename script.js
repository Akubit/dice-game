// Players 
let playerOne = {
    name: 'Player 1',
    score : 0,
    dice: [],
    display: document.getElementById('player1Scoreboard'),
    history: document.getElementById('player1History'),
    diceBoard: document.getElementById('p1board'),
}
let playerTwo = {
    name: 'Player 2',
    score : 0,
    dice: [],
    display: document.getElementById('player2Scoreboard'),
    history: document.getElementById('player2History'),
    history: document.getElementById('player2History'),
    diceBoard: document.getElementById('p2board'),
}

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


// Resetbtn function
function resetGame() {
    currentPlayer.diceBoard.classList.remove('winner')
    playerOne.dice = []
    playerOne.score = 0
    playerOne.history.innerHTML= ''
    playerOne.display.textContent= '0'
    playerTwo.dice = []
    playerTwo.score = 0
    playerTwo.history.innerHTML = ''
    playerTwo.display.textContent= '0';
    currentPlayer = playerOne
    message.textContent = ` ${currentPlayer.name} turn!`
    rollBtn.style.display = "block"
    resetBtn.style.display = "none"
}


// Event listeners
rollBtn.addEventListener('click',rollTheDice)
resetBtn.addEventListener('click',resetGame)