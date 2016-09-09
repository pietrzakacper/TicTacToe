'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
	function State(oldState) {
		_classCallCheck(this, State);

		this.turn = '';
		this.oMovesCount = 0;
		this.result = 'still running';
		this.board = [];

		if (typeof oldState !== 'undefined') {
			var length = oldState.board.length;
			this.board = new Array(length);

			for (var i = 0; i < length; ++i) {
				this.board[i] = oldState.board[i];
			}

			this.oMovesCount = oldState.oMovesCount;
			this.result = oldState.result;
			this.turn = oldState.turn;
		}
	}

	_createClass(State, [{
		key: 'advanceTurn',
		value: function advanceTurn() {
			this.turn = this.turn === 'X' ? 'O' : 'X';
		}
	}, {
		key: 'getEmptyCellsIndicies',
		value: function getEmptyCellsIndicies() {
			var indexes = [];
			for (var i = 0; i < 9; i++) {
				if (this.board[i] === 'E') {
					indexes.push(i);
				}
			}
			return indexes;
		}
	}, {
		key: 'isGameEnd',
		value: function isGameEnd() {
			var B = this.board;

			//check rows
			for (var i = 0; i <= 6; i += 3) {
				if (B[i] !== 'E' && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
					this.result = B[i] + '-won';
					return true;
				}
			}

			//check columns
			for (var _i = 0; _i <= 2; _i++) {
				if (B[_i] !== 'E' && B[_i] === B[_i + 3] && B[_i + 3] === B[_i + 6]) {
					this.result = B[_i] + '-won';
					return true;
				}
			}

			//check diagonals
			for (var _i2 = 0, j = 4; _i2 <= 2; _i2 = _i2 + 2, j = j - 2) {
				if (B[_i2] !== 'E' && B[_i2] == B[_i2 + j] && B[_i2 + j] === B[_i2 + 2 * j]) {
					this.result = B[_i2] + '-won';
					return true;
				}
			}

			var cellsLeft = this.getEmptyCellsIndicies();
			if (cellsLeft.length === 0) {
				this.result = 'draw';
				return true;
			} else {
				return false;
			}
		}
	}]);

	return State;
}();

exports.State = State;