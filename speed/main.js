const data = {
	centerLetter: 'G',
	outerLetters: ['U', 'A', 'B', 'E', 'H', 'L'],
	pangrams: ['HUGGABLE', 'LAUGHABLE'],
	words: ['ALGAE', 'ALLEGE', 'BAGEL', 'BAGGAGE', 'BEAGLE', 'BELUGA', 'BUGLE', 'BULGE', 'EAGLE', 'GABBLE', 'GABLE', 'GAGGLE',  'GAUGE','GULAG', 'HAGGLE', 'HAULAGE', 'LAUGH', 'LEAGUE', 'LEGAL', 'LUGGAGE']
}

const { centerLetter, outerLetters, pangrams, words } = data
const answers = [...pangrams, ...words]

const congrats = document.querySelector('#congrats')

// Board
const key = document.querySelector('.key')
const tiles = document.querySelectorAll('.tile')

// Scoreboard
const timer = document.querySelector('#timer')
const encouragement = document.querySelector('#encouragement')
const score = document.querySelector('#score')
let userScore = 0

// Word Bank
const wordBank = document.querySelector('#word-bank')
let foundWords = []

// Inputs
const input = document.querySelector('#input')
let inputArray = []
const backspaceButton = document.querySelector('#backspace')
const shuffleButton = document.querySelector('#shuffle')
// const submitButton = document.querySelector('#submit')

const initialize = () => {
	congrats.style.display = 'none'
	setUpEventListeners()
	renderBoard()
	renderWordBank()
	startGame()
}

const renderBoard = () => {
	key.innerHTML = centerLetter;
	renderOuterTiles(outerLetters)
}

const renderOuterTiles = (letters) => {
	[...tiles].forEach((tile, i) => {
		tile.innerHTML = letters[i]
	})
}

const renderWordBank = () => {
	answers.forEach((answer, i) => {
		let li = document.createElement('li')
		wordBank.append(li)
	})
}

const clearInput = () => { inputArray = []; updateInput() }
const backspace = () => { inputArray.pop(); updateInput() }
const shuffleTiles = () => {renderOuterTiles(_.shuffle(outerLetters))}
const updateInput = () => input.innerHTML = inputArray.join('')
const updateScoreBoard = () => score.innerText = userScore
const updateScore = (pangram) => { userScore += pangram ? 3 : 1; updateScoreBoard() }

const typeLetter = (e, classname) => {
	const highlightedLetter = classname && `<span class='highlight'>${e.target.innerHTML}</span>`
	inputArray.push(highlightedLetter || e.target.innerHTML)
	updateInput()
}

const addAnswerToWordBank = (guess) => {
	const foundWordSlots = document.querySelectorAll('#word-bank > li');
	for (slot of [...foundWordSlots]) {
		const slotIsEmpty = !slot.innerHTML
		if (slotIsEmpty) {
			slot.classList = 'filled'
			foundWordSlots[[...foundWordSlots].indexOf(slot) + 1].classList = 'active ';
			slot.innerText = guess
			break
		}
	}
	foundWords.push(guess)
	clearInput()
}

const validateAnswer = () => {
	const guess = input.innerText
	if (isValid(guess)) {
		const isPangram = pangrams.includes(guess)
		addAnswerToWordBank(guess)
		updateScore(isPangram)
	}
}

const isValid = (guess) => (guess.includes(centerLetter) && answers.includes(guess) && !foundWords.includes(guess))

const setUpEventListeners = () => {
	const waitThenCheck = _.debounce(validateAnswer, 350, {'trailing': true, 'leading': false})
	const debouncedShuffle = _.debounce(shuffleTiles, 800, {'leading': true, 'trailing': false})
	document.addEventListener('click', () => { if (input.innerHTML.length > 4) waitThenCheck() })
	key.addEventListener('click', e => typeLetter(e, 'highlight'));
	[...tiles].forEach((tile, i) => { tile.addEventListener('click', e => typeLetter(e))})
	backspaceButton.addEventListener('click', backspace)
	shuffleButton.addEventListener('click', shuffleTiles)
	// submitButton.addEventListener('click', validateAnswer)
}

const startTimer = () => {
	var seconds = 601;
  function tick() {
      seconds -= 1
      timer.innerHTML = parseFloat(seconds/10).toFixed(1)
      if(seconds > 0) {
        setTimeout(tick, 100)
      } else {
        endGame()
      }
  }
  tick();
}

const startGame = () => {
  _.delay(startTimer, 500)
}

const endGame = () => {
	congrats.querySelector('.score').innerText = userScore
	congrats.style.display = 'flex'
}

initialize()
