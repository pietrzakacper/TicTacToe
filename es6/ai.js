var AI = function(){

	function calculateMiniMaxValue(state) {
		if (state.isTerminal()) {
			return globalManagers.game.score(state);
		} else {
			let stateScore;

			if (state.turn === globalGameInfo.playerCharacter)
				stateScore = -1000;
			else
				stateScore = 1000;

			const availablePositions = state.getEmptyCellsIndicies();

			const availableNextStates = availablePositions.map(function(pos) {
				const action = new AIAction(pos);

				return action.applyMove(state);
			});

			const minMax = calculateMiniMaxValue;

			availableNextStates.forEach(function(nextState) {

				const nextScore = minMax(nextState); //recursive call

				if (state.turn === globalGameInfo.playerCharacter) {
					if (nextScore > stateScore)
						stateScore = nextScore;
				} else {
					if (nextScore < stateScore)
						stateScore = nextScore;
				}
			});

			return stateScore;
		}
	}

	this.move =function(turn) {
		const available = globalManagers.game.currentState.getEmptyCellsIndicies();

		const minMax = calculateMiniMaxValue;
		const availableActions = available.map(function(pos) {
			const action = new AIAction(pos); //create the action object
			const next = action.applyMove(globalManagers.game.currentState);
			action.minimaxVal = minMax(next);
			return action;
		});

		if (turn === globalGameInfo.playerCharacter)
			availableActions.sort(AIAction.DESCENDING);
		else
			availableActions.sort(AIAction.ASCENDING);

		const chosenAction = availableActions[0];
		const next = chosenAction.applyMove(globalManagers.game.currentState);

		globalManagers.ui.drawMove(chosenAction.movePosition, turn);
		globalManagers.game.advanceTo(next);
		globalManagers.ui.disableField(chosenAction.movePosition);
	};
};

class AIAction {
	constructor(position) {
		this.movePosition = position;
		this.miniMaxValue = 0;
	}

	applyMove(state) {
		const next = new State(state);
		next.board[this.movePosition] = state.turn;

		if (state.turn === globalGameInfo.AICharacter) {
			next.AIMovesCount++;
		}
		next.advanceTurn();

		return next;
	}
}

AIAction.ASCENDING = (firstAction, secondAction) => {
	if (firstAction.minimaxValue < secondAction.minimaxValue)
		return -1;
	else if (firstAction.minimaxValue > secondAction.minimaxValue)
		return 1;
	else
		return 0;
};

AIAction.DESCENDING = (firstAction, secondAction) => {
	if (firstAction.minimaxValue > secondAction.minimaxValue)
		return -1;
	else if (firstAction.minimaxValue < secondAction.minimaxValue)
		return 1;
	else
		return 0;
};
