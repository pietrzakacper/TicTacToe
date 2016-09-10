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
}

function handleFieldClick(event) {
	const id = event.target.id;
	const next = new State(globalManagers.game.currentState);
	if(next.board[id] !== 'E')return;
	if(globalManagers.game.status === 'running' && globalManagers.game.currentState.turn === globalGameInfo.playerCharacter){
		next.board[id]=globalGameInfo.playerCharacter;
		globalManagers.ui.drawMove(id,globalGameInfo.playerCharacter);
		next.advanceTurn();
		globalManagers.game.advanceTo(next);
	}
	globalManagers.ui.disableField(id);
}

function chooseCharacter(event) {
	let id = event.target.id;
	if(id==='x') {
		globalGameInfo.playerCharacter = 'x';
		globalGameInfo.AICharacter = 'o';
	} else {
		globalGameInfo.playerCharacter = 'o';
		globalGameInfo.AICharacter = 'x';
	}
	globalManagers.ui.hideChoicePanel();
	startGame();
}

function startGame(){
	globalManagers.ui.showGrid();
	globalManagers.ai = new AI();
	globalManagers.game=new Game(globalManagers.ai);
	globalManagers.game.start();

}

function resetGame(){
	globalGameInfo = {
		isPanelVisible: false
	};
	globalManagers.ui.hideGrid();
	globalManagers.ui.hideChoicePanel();
	initGame();
}
//----------------
