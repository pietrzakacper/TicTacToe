class State {

	constructor(oldState) {
		this.turn = '';
		this.AImovesCount = 0;
		this.result = 'still running';
		this.board = [];

		if (typeof oldState !== 'undefined') {
			const length = oldState.board.length;
			this.board = new Array(length);

			for (let i = 0; i < length; ++i) {
				this.board[i] = oldState.board[i];
			}

			this.AImovesCount = oldState.AImovesCount;
			this.result = oldState.result;
			this.turn = oldState.turn;
		}
	}

	advanceTurn() {
		this.turn = this.turn === 'x' ? 'o' : 'x';
	}

	getEmptyCellsIndicies() {
		const indexes = [];
		for (let i = 0; i < 9; i++) {
			if (this.board[i] === 'E') {
				indexes.push(i);
			}
		}
		return indexes;
	}

	isTerminal() {
		const B = this.board;

		//check rows
		for (let i = 0; i <= 6; i += 3) {
			if (B[i] !== 'E' && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
				this.result = `${B[i]}-won`;
				return true;
			}
		}

		//check columns
		for (let i = 0; i <= 2; i++) {
			if (B[i] !== 'E' && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
				this.result = `${B[i]}-won`;
				return true;
			}
		}

		//check diagonals
		for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
			if (B[i] !== 'E' && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
				this.result = `${B[i]}-won`;
				return true;
			}
		}

		const cellsLeft = this.getEmptyCellsIndicies();
		if(cellsLeft.length === 0){
			this.result = 'draw';
			return true;
		} else {
			return false;
		}

	}
}
