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
	const id = event.target.id;
	if (globalGameInfo.board[id] !== 'e' || AI.isTerminated(globalGameInfo.board)) return;
	movePlayer(id);
	globalManagers.ui.disableBoard();
	if (!AI.isTerminated(globalGameInfo.board)) {
		moveAI();
		if (!AI.isTerminated(globalGameInfo.board)) {
			globalManagers.ui.enableBoard();
		}
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
		globalManagers.ui.disableBoard();
		setTimeout(()=>{moveAI(); globalManagers.ui.enableBoard();}, 50);
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
