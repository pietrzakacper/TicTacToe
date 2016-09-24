//define globalsObjects
let globalGameInfo = {
	isPanelVisible: false
};
const globalsDOM = {};
const globalManagers = {};
//---------------

//cacheDOM
globalsDOM.fields = document.getElementsByClassName('field');
globalsDOM.resetButton = document.getElementById('reset');
globalsDOM.canvas = document.getElementById('canvas');
globalsDOM.choices = document.getElementsByClassName('choose');
globalsDOM.fieldsContainer = document.getElementById('fields-container');
//----------------

//bind Events
globalsDOM.resetButton.addEventListener('click', resetGame);

Array.from(globalsDOM.fields).forEach(
	element => {
		element.addEventListener('click', handleFieldClick);
	}
);

Array.from(globalsDOM.choices).forEach(
	element => {
		element.addEventListener('click', chooseCharacter);
	}
);
//--------------

//define functions
function initGame() {
	globalManagers.canvas = new Canvas(canvas);
	globalManagers.ui = new UI();
	globalManagers.ui.showChoicePanel();
	globalGameInfo.board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
}

function resetGame() {
	globalGameInfo = {
		isPanelVisible: false
	};
	globalManagers.ui.hideGrid();
	globalManagers.ui.hideChoicePanel();
	initGame();
}

function handleFieldClick(event) {
	if(!globalManagers.ui.playerCanClick)return;
	globalManagers.ui.switchViewTo('ai');
	const id = event.target.id;
	if (globalGameInfo.board[id] !== 'e' || AI.isTerminated(globalGameInfo.board)) return;
	movePlayer(id);
	if (!AI.isTerminated(globalGameInfo.board)) {
		setTimeout(() => {
			moveAI();
			if (!AI.isTerminated(globalGameInfo.board)) {
				globalManagers.ui.switchViewTo('human');
			} else {
				endGame();
			}
		}, 800);
	} else {
		endGame();
	}
}

function chooseCharacter(event) {
	let id = event.target.id;
	if (id === 'x') {
		globalGameInfo.playerCharacter = 'x';
		globalGameInfo.AICharacter = 'o';
	} else {
		globalGameInfo.playerCharacter = 'o';
		globalGameInfo.AICharacter = 'x';
	}
	globalManagers.ui.hideChoicePanel();
	startGame();
}

function startGame() {
	globalManagers.ui.showGrid();
	if (globalGameInfo.playerCharacter === 'o') {
		globalManagers.ui.switchViewTo('ai');
		setTimeout(() => {
			moveAI();
			globalManagers.ui.switchViewTo('human');
		}, 50);
	} else{
		globalManagers.ui.switchViewTo('human');
	}
}

function movePlayer(id) {
	globalGameInfo.board[id] = globalGameInfo.playerCharacter;
	globalManagers.ui.drawMove(id, globalGameInfo.playerCharacter);
}

function moveAI() {
	const data = {
		aiCharacter: globalGameInfo.AICharacter,
		playerCharacter: globalGameInfo.playerCharacter,
		startingCharacter: 'x',
		board: globalGameInfo.board
	};
	const id = AI.getAIMove(data);
	globalGameInfo.board[id] = globalGameInfo.AICharacter;
	globalManagers.ui.drawMove(id, globalGameInfo.AICharacter);
}

function endGame() {
	const gameState = AI.getStateOfGame(globalGameInfo.board);
	let uiState = '';
	if (gameState !== 'draw') {
		uiState = (globalGameInfo.playerCharacter === gameState.charAt(0)) ? 'player-won' : 'ai-won';
	} else {
		uiState = 'draw';
	}
	globalManagers.ui.switchViewTo(uiState);
}
