class Game {
	constructor(aiPlayer) {
		this.ai = aiPlayer;
		this.currentState = new State();
		this.currentState.board = (new Array(9)).fill('E');
		this.currentState.turn = 'x';
		this.status = 'beginning';
	}

	advanceTo(_state) {
		this.currentState = _state;
		if (_state.isTerminal()) {
			this.status = 'ended';
			console.log('endOFGame');
			if (_state.result === `${globalGameInfo.playerCharacter}-won`) {
				globalManagers.ui.switchViewTo('won');
			} else if (_state.result === `${globalGameInfo.AICharacter}-won`) {
				globalManagers.ui.switchViewTo('lost');
			} else {
				globalManagers.ui.switchViewTo('draw');
			}
		} else {
			//the game is still running
			if (this.currentState.turn === globalGameInfo.playerCharacter) {
				globalManagers.ui.switchViewTo('human');
				//this.currentState.turn = globalGameInfo.AICharacter;
			} else {
				globalManagers.ui.switchViewTo('ai');
				this.ai.move(globalGameInfo.AICharacter);
				//this.currentState.turn = globalGameInfo.playerCharacter;
			}
		}
	}

	start() {
		this.status = 'beginning';
		this.advanceTo(this.currentState);
		this.status = 'running';
	}

	score(_state) {
		if (_state.result !== 'still running') {
			if (_state.result === `${globalGameInfo.playerCharacter}-won`) {
				return 10 - _state.oMovesCount;
			} else if (_state.result === `${globalGameInfo.AICharacter}-won`) {
				return -10 + _state.oMovesCount;
			} else {
				return 0;
			}
		}
	}
}
