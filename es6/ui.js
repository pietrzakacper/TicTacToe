class UI {
	constructor(){
		this.playerCanClick = true;
	}
	showGrid() {
		Array.from(globalsDOM.fields).forEach(
			element => {
				this.disableField(element.id);
				element.classList.add('not-selected');
			}
		);
		globalManagers.canvas.clear();
		globalsDOM.fieldsContainer.classList.add('active');
		globalManagers.canvas.drawGrid();
	}

	hideGrid() {
		globalsDOM.fieldsContainer.classList.remove('active');
		globalManagers.canvas.clear();
	}

	showChoicePanel() {
		globalManagers.canvas.drawChoicePanel();
		const choiceField = document.getElementById('choice-bar');
		choiceField.classList.add('display');
		const msgBar = document.getElementById('msg-bar');
		msgBar.innerText = 'CHOOSE: ';
		globalGameInfo.isPanelVisible = true;
	}

	hideChoicePanel() {
		globalManagers.canvas.clear();
		const choiceField = document.getElementById('choice-bar');
		choiceField.classList.remove('display');
		const msgBar = document.getElementById('msg-bar');
		msgBar.innerText = ' ';
		globalGameInfo.isPanelVisible = false;
	}

	disableField(id) {
		const fieldClicked = document.getElementById(id);
		fieldClicked.classList.remove('not-selected');
	}

	drawMove(indexPosition, turn) {
		let positionY = 0,
			positionX = 0;

		if (indexPosition < 3) {
			positionY = 55;
			positionX = 55 + indexPosition * 110;
		} else if (indexPosition < 6) {
			positionY = 165;
			positionX = 55 + (indexPosition - 3) * 110;
		} else {
			positionY = 275;
			positionX = 55 + (indexPosition - 6) * 110;
		}
		switch (turn) {
		case 'x':
			globalManagers.canvas.drawX(positionX, positionY);
			break;
		case 'o':
			globalManagers.canvas.drawO(positionX, positionY);
		}
		globalManagers.ui.disableField(indexPosition);
	}

	switchViewTo(nameOfState) {
		const msgBar = document.getElementById('msg-bar');

		switch (nameOfState) {
		case 'ai':
			this.disableBoard();
			msgBar.innerText = 'AI\'s TURN';
			break;
		case 'human':
			this.enableBoard();
			msgBar.innerText = 'YOUR TURN';
			break;
		case 'player-won':
			this.disableBoard();
			msgBar.innerText = 'YOU WON!';
			break;
		case 'ai-won':
			this.disableBoard();
			msgBar.innerText = 'YOU LOST!';
			break;
		case 'draw':
			this.disableBoard();
			msgBar.innerText = 'IT\'s A DRAW!';
			break;
		}
	}

	disableBoard() {
		globalsDOM.fieldsContainer.classList.remove('active');
		this.playerCanClick = false;
	}
	enableBoard() {
		globalsDOM.fieldsContainer.classList.add('active');
		this.playerCanClick = true;
	}
}
