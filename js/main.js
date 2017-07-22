const initialize = () => {
	checkLocalStorage()
	getPuzzleData()

	setUpEventListeners()
	renderBoard()

	if (localStorage.getItem('hasProgress')) {
		loadProgress()
	}

	updateProgressBar()
	renderScoreboard()
	renderWordBank()

	startTimer()
}

// JS Date is _insane_. Add 1 to zero-indexed month to get accurate # of days in that month
const getDaysInMonth = date => (new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())

const getNthDayOfTest = () => {
	// Starts at 0
	const startOfTest = new Date('07/06/2017') // TODO update this to actual start date
	const today = new Date()

	const startDate = startOfTest.getDate()
	const todaysDate = today.getDate()

	const startMonth = startOfTest.getMonth()
	const todaysMonth = today.getMonth()
	const sameMonth = startMonth === todaysMonth

	const startYear = startOfTest.getFullYear()
	const todaysYear = today.getFullYear()
	const sameYear = todaysYear === startYear

	if (todaysDate === startDate) {
		return 0
	} else if (sameYear && sameMonth && todaysDate > startDate) {
		return todaysDate - startDate
	} else {
		const remainderOfStartMonth = getDaysInMonth(startOfTest) - startDate
		return remainderOfStartMonth + todaysDate
	}
}

const checkLocalStorage = () => {
	const nthDayOfTest = getNthDayOfTest()
	const savedDayOfTest = localStorage.getItem('dayOfTest')
	if (nthDayOfTest !== parseInt(savedDayOfTest)) {
		localStorage.setItem('dayOfTest', nthDayOfTest)
		clearGameProgress()
	}
	else return
}

const clearGameProgress = () => { // clear everything but dayOfTest
	const progressKeys = ['hasProgress', 'foundWords', 'score', 'level', 'percentCompleted']
	progressKeys.forEach(key => localStorage.removeItem(`${key}`))
}

// Global variables for puzzle data
let puzzleData = {}
let centerLetter
let outerLetters
let pangrams
let words
let answers = []

const getPuzzleData = () => {
	const nthDayOfTest = getNthDayOfTest()
	puzzleData = puzzles[nthDayOfTest] ? puzzles[nthDayOfTest] : puzzles[0] // default to first puzzle if no puzzle is found
	centerLetter = puzzleData.centerLetter
	outerLetters = puzzleData.outerLetters
	pangrams = puzzleData.pangrams
	words = puzzleData.words
	answers = [...pangrams, ...words]
}

// Global variables affected by progress
let userScore = 0
let foundWords = []
let currentLevel = 0
let percentOfTotalCompleted = 0
let hasBeenCongratulated = false
let dayOfTest

// Concierge
const concierge = document.querySelector('#concierge')

// Help Modal
const helpButton = document.querySelector('#help-button')
const helpModal = document.querySelector('#help-modal')
const exitHelp = document.querySelector('#close-help')

// Congrats Modal
const congrats = document.querySelector('#congrats')
const closeX = document.querySelector('#close-congrats')
const keepPlaying = document.querySelector('#keep-playing')
const backToNews = document.querySelector('#back-to-news')

// Finish Modal
const finishModal = document.querySelector('#finish-modal')
const closeFinish = document.querySelector('#close-finish')
const finishBackToNews = document.querySelector('#finish-back-to-news')

// Board
const centerTile = document.querySelector('.center-tile')
const tiles = document.querySelectorAll('.tile')

// Scoreboard
const pointValue = document.querySelector('#point-value')
const score = document.querySelector('#score')

// Word Bank
const wordBank = document.querySelector('#word-bank')

const foundModal = document.querySelector('#found-modal')

// Inputs
const input = document.querySelector('#input')
let inputArray = []
const backspaceButton = document.querySelector('#backspace')
const shuffleButton = document.querySelector('#shuffle')
const submitButton = document.querySelector('#submit')

// Progress
const progressBar = document.querySelector('#progress-bar')
const progressFill = document.querySelector('#progress-fill')
const progressLabel = document.querySelector('#progress-label')

// User Score + Point Calculations
const updateScore = (pointsScored) => { userScore += pointsScored; updateScoreBoard(pointsScored) }

const updateScoreBoard = (points) => {
	pointValue.innerText = `+${points}`
	animate(pointValue, 'poof', 800)
	score.innerText = userScore
}

const getPointValue = guess => {
	let pointValue
	switch(guess.length) {
		case 4:
			pointValue = 1
			break
		case 5:
			pointValue = 5
			break
		case 6:
			pointValue = 6
			break
		default:
			pointValue = 8 // 7 + letter-long words
	}
	if (pangrams.includes(guess)) pointValue = 10
	return pointValue
}
const calculateTotalPoints = () => {
	let totalPoints = 0
	words.forEach((answer) => {
		totalPoints += getPointValue(answer)
	})
	totalPoints += pangrams.length * 10

	return totalPoints
}

// Levels + Progress
const levelMinimums = [0, 2, 5, 8, 15, 25, 40, 50, 70, 100]
const levelLabels = ['Beginner', 'Good Start', 'Moving Up', 'Good', 'Solid', 'Nice', 'Great', 'Amazing', 'Genius', 'Master']

const calculatePercentCompleted = (completed, total) => (completed / total) * 100

const updateLevel = () => {
	levelMinimums.forEach((min, i) => {
		if (percentOfTotalCompleted >= min && Math.abs(percentOfTotalCompleted - min) <= Math.abs(levelMinimums[i + 1] - percentOfTotalCompleted)) {
			currentLevel = i
		}
	})
	progressLabel.innerText = levelLabels[currentLevel]
	saveProgress()
}

const saveProgress = () => {
	const progress = {
		'hasProgress': true,
		'foundWords': foundWords,
		'score': userScore,
		'level': currentLevel,
		'percentCompleted': percentOfTotalCompleted
	}

	if (percentOfTotalCompleted > 0) {
		const progressKeys = Object.keys(progress)
		progressKeys.forEach(key => localStorage.setItem(`${key}`, progress[key]))
	}
}

const updateProgress = (pointValue) => {
	updateScore(pointValue)

	const totalPointsPossible = calculateTotalPoints()
	percentOfTotalCompleted = calculatePercentCompleted(userScore, totalPointsPossible)

	if (percentOfTotalCompleted > levelMinimums[currentLevel + 1]) {
		updateProgressBarWithOverflow()
	}
	else updateProgressBar()

	if (!hasBeenCongratulated && currentLevel >= 3 && foundWords.length >= (answers.length * .17)) {
		_.delay(congratulate, 500)
	}

	if (percentOfTotalCompleted === 100) _.delay(congratulateAndEnd, 500)
}

const updateProgressBarWithOverflow = () => {
		progressBar.style.width = `100%`
		animate(progressFill, 'fill-up', 500) // fill up to 100%
		_.delay(() => {
			updateLevel();
			progressFill.style.width = '0px' // reset fill to 0 to give the animation a starting point
			updateProgressBar()
		}, 500) // wait 500ms so that user sees bar go to 100, then advance to the next level and animate progress
}

const updateProgressBar = () => {
	const levelMinimum = levelMinimums[currentLevel]
	const levelMaximum = levelMinimums[currentLevel + 1]
	const range = levelMaximum - levelMinimum

	const percentOfLevelFilled = (percentOfTotalCompleted - levelMinimum) / range

	let progressBarWidth = percentOfLevelFilled * window.innerWidth // initial width
	progressBar.style.width = `${progressBarWidth}px` // progress bar gets new width

	animate(progressFill, 'fill-up', 500)
	_.delay(() => progressFill.style.width = `${progressBarWidth}px`, 500) // set the width to the new progress fill width so that it doesn't shrink again after the animation.
	saveProgress()
}

const loadProgress = () => {
	const savedWords = localStorage.getItem('foundWords')
	const savedScore = localStorage.getItem('score')
	const savedLevel = localStorage.getItem('level')
	const savedPercentCompleted = localStorage.getItem('percentCompleted')

	userScore = parseInt(savedScore)
	foundWords = savedWords.split(',')
	currentLevel = parseInt(savedLevel)
	percentOfTotalCompleted = parseFloat(savedPercentCompleted)
	hasBeenCongratulated = localStorage.getItem('hasBeenCongratulated')
}

// Modals
const openModal = (modal) => {
	modal.style.display = 'flex'
	document.querySelector('main').classList.toggle('obscured')
}

const closeModal = (modal) => {
	modal.style.display = 'none'
	document.querySelector('main').classList.toggle('obscured')
}

// Rendering + Animation
const animate = (el, animation, duration = 1000) => {
	el.classList.toggle(`${animation}`)
	_.delay(() => el.classList.toggle(`${animation}`), duration)
}

const renderBoard = () => {
	centerTile.innerHTML = centerLetter;
	renderOuterTiles(outerLetters)
}

const renderOuterTiles = (letters) => {
	[...tiles].forEach((tile, i) => {
		tile.innerHTML = letters[i]
		animate(tile, 'shuffle')
	})
}

const renderScoreboard = () => {
	progressLabel.innerText = levelLabels[currentLevel]
	score.innerText = userScore
	updateProgressBar()
}

const renderWordBank = () => {
	if (foundWords.length) {
		foundWords.forEach(word => renderFoundWord(word))
	}
}

const renderFoundWord = (word) => {
	const wordBank = document.querySelector('#word-bank')
	let foundWord = document.createElement('li')
	foundWord.innerText = word
	wordBank.insertBefore(foundWord, wordBank.querySelector('li:last-child'))
	foundWord.scrollIntoView()
}

// Input + Answer Submission
const shuffleTiles = () => {renderOuterTiles(_.shuffle(outerLetters))}
const debouncedShuffle = _.debounce(shuffleTiles, 800, {'leading': true, 'trailing': false})
const updateInput = () => input.innerHTML = inputArray.join('')
const clearInput = () => { inputArray = []; updateInput() }
const backspace = () => {
	inputArray.pop(); updateInput()
	if (!guessMeetsMinimumRequirements()) disableSubmitButton()
}
const guessMeetsMinimumRequirements = () => (input.innerText.length > 3)
const enableSubmitButton = () => { submitButton.disabled = false }
const disableSubmitButton = () => { submitButton.disabled = true}

const typeLetter = (e, classname) => {
	const isCenterTile = e.target.classList[0].includes('center-tile')
	const highlightedLetter = isCenterTile && `<span class='highlight'>${e.target.innerHTML}</span>`
	inputArray.push(highlightedLetter || e.target.innerHTML)
	updateInput()
}

const submitAnswer = () => {
	const guess = input.innerText
	const isValidAnswer = answers.includes(guess)
	const hasBeenFound = foundWords.includes(guess)
	_.delay(() => {
		if (isValidAnswer && !hasBeenFound) {
			const isPangram = pangrams.includes(guess)
			addAnswerToWordBank(guess)
			updateProgress(getPointValue(guess))
		} else if (!input.innerText.includes(centerLetter)) {
			_.delay(() => animate(centerTile, 'pulse'), 200)
		} else if (hasBeenFound) {
			animate(foundModal, 'blink', 800)
			_.delay(clearInput, 800)
		} else {
			animate(input, 'incorrect')
			_.delay(clearInput, 800)
		}
	}, 300)

	disableSubmitButton()
}

const checkInput = () => {
	if (guessMeetsMinimumRequirements()) {
		enableSubmitButton()
	}
}

const addAnswerToWordBank = (guess) => {
	renderFoundWord(guess)
	foundWords.push(guess)
	clearInput()
}

// Game-adjacent things (beginning + end of game)
const congratulate = () => {
	congrats.querySelector('.score').innerText = userScore
	congrats.querySelector('.word-count').innerText = foundWords.length
	localStorage.setItem('hasBeenCongratulated', true)
	hasBeenCongratulated = true // for continued play in the same session
	openModal(congrats)
}

const congratulateAndEnd = () => {
	finishModal.querySelector('.score').innerText = userScore
	finishModal.querySelector('.word-count').innerText = answers.length
	openModal(finishModal)
}

const takeOverScroll = () => {
	if (window.scrollY > 15) {
		animate(concierge, 'swipe')
		_.delay(() => concierge.style.display = 'none', 800)
	}
}

// Timer
let timeInGame = 0
const tick = () => {
	timeInGame += 1
}

const startTimer = () => {
	setInterval(tick, 1000)
}

// Event Listeners
const setUpEventListeners = () => {
	[...tiles, centerTile].forEach(tile => {
		tile.addEventListener('click', e => {
			typeLetter(e)
			checkInput()
		})
	})

	concierge.addEventListener('touchend', takeOverScroll)

	// Help
	helpButton.addEventListener('click', () => {
		console.log('what');
		openModal(helpModal)
	})
	exitHelp.addEventListener('click', () => { closeModal(helpModal) })

	// Tools
	backspaceButton.addEventListener('click', backspace)
	shuffleButton.addEventListener('click', debouncedShuffle())
	submitButton.addEventListener('click', submitAnswer)

	// Modals
	closeX.addEventListener('click', () => { closeModal(congrats) })
	keepPlaying.addEventListener('click', () => { closeModal(congrats) })
	backToNews.addEventListener('click', () => {
		window.location.href = "https://www.nytimes.com"
	})
	closeFinish.addEventListener('click', () => { closeModal(finishModal) })
	finishBackToNews.addEventListener('click', () => {
		window.location.href = "https://www.nytimes.com"
	})
}

initialize()
