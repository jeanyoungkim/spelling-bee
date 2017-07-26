'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialize = function initialize() {
	checkLocalStorage();
	getPuzzleData();

	setUpEventListeners();
	renderBoard();

	if (localStorage.getItem('hasProgress')) {
		loadProgress();
	}

	updateProgressBar();
	renderScoreboard();
	renderWordBank();

	startTimer();
};

// JS Date is _insane_. Add 1 to zero-indexed month to get accurate # of days in that month
var getDaysInMonth = function getDaysInMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

var getNthDayOfTest = function getNthDayOfTest() {
	// Starts at 0
	var startOfTest = new Date('07/26/2017'); // TODO update this to actual start date
	var today = new Date();

	var startDate = startOfTest.getDate();
	var todaysDate = today.getDate();

	var startMonth = startOfTest.getMonth();
	var todaysMonth = today.getMonth();
	var sameMonth = startMonth === todaysMonth;

	var startYear = startOfTest.getFullYear();
	var todaysYear = today.getFullYear();
	var sameYear = todaysYear === startYear;

	if (todaysDate === startDate) {
		return 0;
	} else if (sameYear && sameMonth && todaysDate > startDate) {
		return todaysDate - startDate;
	} else {
		var remainderOfStartMonth = getDaysInMonth(startOfTest) - startDate;
		return remainderOfStartMonth + todaysDate;
	}
};

var checkLocalStorage = function checkLocalStorage() {
	var nthDayOfTest = getNthDayOfTest();
	var savedDayOfTest = localStorage.getItem('dayOfTest');
	if (nthDayOfTest !== parseInt(savedDayOfTest)) {
		localStorage.setItem('dayOfTest', nthDayOfTest);
		clearGameProgress();
	} else return;
};

var clearGameProgress = function clearGameProgress() {
	// clear everything but dayOfTest
	var progressKeys = ['hasProgress', 'foundWords', 'score', 'level', 'percentCompleted'];
	progressKeys.forEach(function (key) {
		return localStorage.removeItem('' + key);
	});
};

// Global variables for puzzle data
var puzzleData = {};
var centerLetter = void 0;
var outerLetters = void 0;
var pangrams = void 0;
var words = void 0;
var answers = [];

var getPuzzleData = function getPuzzleData() {
	var nthDayOfTest = getNthDayOfTest();
	puzzleData = puzzles[nthDayOfTest] ? puzzles[nthDayOfTest] : puzzles[0]; // default to first puzzle if no puzzle is found
	centerLetter = puzzleData.centerLetter;
	outerLetters = puzzleData.outerLetters;
	pangrams = puzzleData.pangrams;
	words = puzzleData.words;
	answers = [].concat(_toConsumableArray(pangrams), _toConsumableArray(words));
};

// Global variables affected by progress
var userScore = 0;
var foundWords = [];
var currentLevel = 0;
var percentOfTotalCompleted = 0;
var hasBeenCongratulated = false;
var dayOfTest = void 0;

// Concierge
var concierge = document.querySelector('#concierge'

// Help Modal
);var helpButton = document.querySelector('#help-button');
var helpModal = document.querySelector('#help-modal');
var exitHelp = document.querySelector('#close-help'

// Congrats Modal
);var congrats = document.querySelector('#congrats');
var closeX = document.querySelector('#close-congrats');
var keepPlaying = document.querySelector('#keep-playing');
var backToNews = document.querySelector('#back-to-news'

// Finish Modal
);var finishModal = document.querySelector('#finish-modal');
var closeFinish = document.querySelector('#close-finish');
var finishBackToNews = document.querySelector('#finish-back-to-news'

// Board
);var centerTile = document.querySelector('.center-tile');
var tiles = document.querySelectorAll('.tile'

// Scoreboard
);var pointValue = document.querySelector('#point-value');
var score = document.querySelector('#score'

// Word Bank
);var wordBank = document.querySelector('#word-bank');

var foundModal = document.querySelector('#found-modal'

// Inputs
);var input = document.querySelector('#input');
var inputArray = [];
var backspaceButton = document.querySelector('#backspace');
var shuffleButton = document.querySelector('#shuffle');
var submitButton = document.querySelector('#submit'

// Progress
);var progressBar = document.querySelector('#progress-bar');
var progressFill = document.querySelector('#progress-fill');
var progressLabel = document.querySelector('#progress-label'

// User Score + Point Calculations
);var updateScore = function updateScore(pointsScored) {
	userScore += pointsScored;updateScoreBoard(pointsScored);
};

var updateScoreBoard = function updateScoreBoard(points) {
	pointValue.innerText = '+' + points;
	animate(pointValue, 'poof', 800);
	score.innerText = userScore;
};

var getPointValue = function getPointValue(guess) {
	var pointValue = void 0;
	switch (guess.length) {
		case 4:
			pointValue = 1;
			break;
		case 5:
			pointValue = 5;
			break;
		case 6:
			pointValue = 6;
			break;
		default:
			pointValue = 8; // 7 + letter-long words
	}
	if (pangrams.includes(guess)) pointValue = 10;
	return pointValue;
};
var calculateTotalPoints = function calculateTotalPoints() {
	var totalPoints = 0;
	words.forEach(function (answer) {
		totalPoints += getPointValue(answer);
	});
	totalPoints += pangrams.length * 10;

	return totalPoints;
};

// Levels + Progress
var levelMinimums = [0, 2, 5, 8, 15, 25, 40, 50, 70, 100];
var levelLabels = ['Beginner', 'Good Start', 'Moving Up', 'Good', 'Solid', 'Nice', 'Great', 'Amazing', 'Genius', 'Master'];

var calculatePercentCompleted = function calculatePercentCompleted(completed, total) {
	return completed / total * 100;
};

var updateLevel = function updateLevel() {
	levelMinimums.forEach(function (min, i) {
		if (percentOfTotalCompleted >= min && Math.abs(percentOfTotalCompleted - min) <= Math.abs(levelMinimums[i + 1] - percentOfTotalCompleted)) {
			currentLevel = i;
		}
	});
	progressLabel.innerText = levelLabels[currentLevel];
	saveProgress();
};

var saveProgress = function saveProgress() {
	var progress = {
		'hasProgress': true,
		'foundWords': foundWords,
		'score': userScore,
		'level': currentLevel,
		'percentCompleted': percentOfTotalCompleted
	};

	if (percentOfTotalCompleted > 0) {
		var progressKeys = Object.keys(progress);
		progressKeys.forEach(function (key) {
			return localStorage.setItem('' + key, progress[key]);
		});
	}
};

var updateProgress = function updateProgress(pointValue) {
	updateScore(pointValue);

	var totalPointsPossible = calculateTotalPoints();
	percentOfTotalCompleted = calculatePercentCompleted(userScore, totalPointsPossible);

	if (percentOfTotalCompleted > levelMinimums[currentLevel + 1]) {
		updateProgressBarWithOverflow();
	} else updateProgressBar();

	if (!hasBeenCongratulated && currentLevel >= 3 && foundWords.length >= answers.length * .17) {
		_.delay(congratulate, 500);
	}

	if (percentOfTotalCompleted === 100) _.delay(congratulateAndEnd, 500);
};

var updateProgressBarWithOverflow = function updateProgressBarWithOverflow() {
	progressBar.style.width = '100%';
	animate(progressFill, 'fill-up', 500 // fill up to 100%
	);_.delay(function () {
		updateLevel();
		progressFill.style.width = '0px'; // reset fill to 0 to give the animation a starting point
		updateProgressBar();
	}, 500 // wait 500ms so that user sees bar go to 100, then advance to the next level and animate progress
	);
};

var updateProgressBar = function updateProgressBar() {
	var levelMinimum = levelMinimums[currentLevel];
	var levelMaximum = levelMinimums[currentLevel + 1];
	var range = levelMaximum - levelMinimum;

	var percentOfLevelFilled = (percentOfTotalCompleted - levelMinimum) / range;

	var progressBarWidth = percentOfLevelFilled * window.innerWidth; // initial width
	progressBar.style.width = progressBarWidth + 'px'; // progress bar gets new width

	animate(progressFill, 'fill-up', 500);
	_.delay(function () {
		return progressFill.style.width = progressBarWidth + 'px';
	}, 500 // set the width to the new progress fill width so that it doesn't shrink again after the animation.
	);saveProgress();
};

var loadProgress = function loadProgress() {
	var savedWords = localStorage.getItem('foundWords');
	var savedScore = localStorage.getItem('score');
	var savedLevel = localStorage.getItem('level');
	var savedPercentCompleted = localStorage.getItem('percentCompleted');

	userScore = parseInt(savedScore);
	foundWords = savedWords.split(',');
	currentLevel = parseInt(savedLevel);
	percentOfTotalCompleted = parseFloat(savedPercentCompleted);
	hasBeenCongratulated = localStorage.getItem('hasBeenCongratulated');
};

// Modals
var openModal = function openModal(modal) {
	modal.style.display = 'flex';
	document.querySelector('main').classList.toggle('obscured');
};

var closeModal = function closeModal(modal) {
	modal.style.display = 'none';
	document.querySelector('main').classList.toggle('obscured');
};

// Rendering + Animation
var animate = function animate(el, animation) {
	var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

	el.classList.toggle('' + animation);
	_.delay(function () {
		return el.classList.toggle('' + animation);
	}, duration);
};

var renderBoard = function renderBoard() {
	centerTile.innerHTML = centerLetter;
	renderOuterTiles(outerLetters);
};

var renderOuterTiles = function renderOuterTiles(letters) {
	[].concat(_toConsumableArray(tiles)).forEach(function (tile, i) {
		tile.innerHTML = letters[i];
		animate(tile, 'shuffle');
	});
};

var renderScoreboard = function renderScoreboard() {
	progressLabel.innerText = levelLabels[currentLevel];
	score.innerText = userScore;
	updateProgressBar();
};

var renderWordBank = function renderWordBank() {
	if (foundWords.length) {
		foundWords.forEach(function (word) {
			return renderFoundWord(word);
		});
	}
};

var renderFoundWord = function renderFoundWord(word) {
	var wordBank = document.querySelector('#word-bank');
	var foundWord = document.createElement('li');
	foundWord.innerText = word;
	wordBank.insertBefore(foundWord, wordBank.querySelector('li:last-child'));
	foundWord.scrollIntoView();
};

// Input + Answer Submission
var shuffleTiles = function shuffleTiles() {
	renderOuterTiles(_.shuffle(outerLetters));
};
var debouncedShuffle = _.debounce(shuffleTiles, 800, { 'leading': true, 'trailing': false });
var updateInput = function updateInput() {
	return input.innerHTML = inputArray.join('');
};
var clearInput = function clearInput() {
	inputArray = [];updateInput();
};
var backspace = function backspace() {
	inputArray.pop();updateInput();
	if (!guessMeetsMinimumRequirements()) disableSubmitButton();
};
var guessMeetsMinimumRequirements = function guessMeetsMinimumRequirements() {
	return input.innerText.length > 3;
};
var enableSubmitButton = function enableSubmitButton() {
	submitButton.disabled = false;
};
var disableSubmitButton = function disableSubmitButton() {
	submitButton.disabled = true;
};

var typeLetter = function typeLetter(e, classname) {
	var isCenterTile = e.target.classList[0].includes('center-tile');
	var highlightedLetter = isCenterTile && '<span class=\'highlight\'>' + e.target.innerHTML + '</span>';
	inputArray.push(highlightedLetter || e.target.innerHTML);
	updateInput();
};

var submitAnswer = function submitAnswer() {
	var guess = input.innerText;
	var isValidAnswer = answers.includes(guess);
	var hasBeenFound = foundWords.includes(guess);
	_.delay(function () {
		if (isValidAnswer && !hasBeenFound) {
			var isPangram = pangrams.includes(guess);
			addAnswerToWordBank(guess);
			updateProgress(getPointValue(guess));
		} else if (!input.innerText.includes(centerLetter)) {
			_.delay(function () {
				return animate(centerTile, 'pulse');
			}, 200);
		} else if (hasBeenFound) {
			animate(foundModal, 'blink', 800);
			_.delay(clearInput, 800);
		} else {
			animate(input, 'incorrect');
			_.delay(clearInput, 800);
		}
	}, 300);

	disableSubmitButton();
};

var checkInput = function checkInput() {
	if (guessMeetsMinimumRequirements()) {
		enableSubmitButton();
	}
};

var addAnswerToWordBank = function addAnswerToWordBank(guess) {
	renderFoundWord(guess);
	foundWords.push(guess);
	clearInput();
};

// Game-adjacent things (beginning + end of game)
var congratulate = function congratulate() {
	congrats.querySelector('.score').innerText = userScore;
	congrats.querySelector('.word-count').innerText = foundWords.length;
	localStorage.setItem('hasBeenCongratulated', true);
	hasBeenCongratulated = true; // for continued play in the same session
	openModal(congrats);
};

var congratulateAndEnd = function congratulateAndEnd() {
	finishModal.querySelector('.score').innerText = userScore;
	finishModal.querySelector('.word-count').innerText = answers.length;
	openModal(finishModal);
};

var takeOverScroll = function takeOverScroll() {
	if (window.scrollY > 15) {
		animate(concierge, 'swipe');
		_.delay(function () {
			return concierge.style.display = 'none';
		}, 800);
	}
};

// Timer
var timeInGame = 0;
var tick = function tick() {
	timeInGame += 1;
};

var startTimer = function startTimer() {
	setInterval(tick, 1000);
};

// Event Listeners
var setUpEventListeners = function setUpEventListeners() {
	[].concat(_toConsumableArray(tiles), [centerTile]).forEach(function (tile) {
		tile.addEventListener('click', function (e) {
			typeLetter(e);
			checkInput();
		});
	});

	concierge.addEventListener('touchend', takeOverScroll

	// Help
	);helpButton.addEventListener('click', function () {
		console.log('what');
		openModal(helpModal);
	});
	exitHelp.addEventListener('click', function () {
		closeModal(helpModal);
	}

	// Tools
	);backspaceButton.addEventListener('click', backspace);
	shuffleButton.addEventListener('click', debouncedShuffle());
	submitButton.addEventListener('click', submitAnswer

	// Modals
	);closeX.addEventListener('click', function () {
		closeModal(congrats);
	});
	keepPlaying.addEventListener('click', function () {
		closeModal(congrats);
	});
	backToNews.addEventListener('click', function () {
		window.location.href = "https://www.nytimes.com";
	});
	closeFinish.addEventListener('click', function () {
		closeModal(finishModal);
	});
	finishBackToNews.addEventListener('click', function () {
		window.location.href = "https://www.nytimes.com";
	});
};

initialize();
