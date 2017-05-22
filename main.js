// const data = {
// 	centerLetter: 'N',
// 	outerLetters: ['L', 'A', 'B', 'C', 'H', 'I'],
// 	pangrams: ['BACCHANALIA', 'BACCHANALIAN'],
// 	words: ['BANAL', 'BANANA', 'BLANCH', 'BLINI', 'CABANA', 'CABIN', 'CANAL', 'CANCAN', 'CANNIBAL', 'CHAIN', 'CHINA', 'CHINCHILLA',  'CINCH','CLINCH', 'CLINIC', 'CLINICAL', 'CLINICIAN', 'LANAI', 'NIACIN']
// }

const data = {
	centerLetter: 'G',
	outerLetters: ['U', 'A', 'B', 'E', 'H', 'L'],
	pangrams: ['HUGGABLE', 'LAUGHABLE'],
	words: ['ALGAE', 'ALLEGE', 'BAGEL', 'BAGGAGE', 'BEAGLE', 'BELUGA', 'BUGLE', 'BULGE', 'EAGLE', 'GABBLE', 'GABLE', 'GAGGLE',  'GAUGE','GULAG', 'HAGGLE', 'HAULAGE', 'LAUGH', 'LEAGUE', 'LEGAL', 'LUGGAGE']
}

const { centerLetter, outerLetters, pangrams, words } = data
const answers = [...pangrams, ...words]

// Board
const key = document.querySelector('.key')
const tiles = document.querySelectorAll('.tile')

// Scoreboard
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

const initialize = () => {
	setUpEventListeners()
	renderBoard()
	renderWordBank()
}

const renderBoard = () => {
	key.innerHTML = centerLetter;
	renderOuterTiles(outerLetters)
}

const renderOuterTiles = (letters) => {
	[...tiles].forEach((tile, i) => {
		tile.innerHTML = letters[i]
		tile.classList += ' shuffle'
		_.delay(() => tile.classList = 'tile', 1000)
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
	const goldLetter = classname && `<span class='gold'>${e.target.innerHTML}</span>`
	inputArray.push(goldLetter || e.target.innerHTML)
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
	const waitThenCheck = _.debounce(validateAnswer, 600, {'trailing': true, 'leading': false})
	const debouncedShuffle = _.debounce(shuffleTiles, 800, {'leading': true, 'trailing': false})
	document.addEventListener('click', () => { if (input.innerHTML.length > 4) waitThenCheck() })
	key.addEventListener('click', e => typeLetter(e, 'gold'));
	[...tiles].forEach((tile, i) => { tile.addEventListener('click', e => typeLetter(e))})
	backspaceButton.addEventListener('click', backspace)
	shuffleButton.addEventListener('click', debouncedShuffle)
}

initialize()
