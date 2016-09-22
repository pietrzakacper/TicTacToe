class UI {

	showGrid() {
		Array.from(globalsDOM.fields).forEach(
			element => {
				this.disableField(element.id);
				element.className = element.className + ' not-selected';
			}
		);
		globalManagers.canvas.clear();
		globalsDOM.fieldsContainer.className = globalsDOM.fieldsContainer.className + ' active';
		globalManagers.canvas.drawGrid();
	}

	hideGrid() {
		globalsDOM.fieldsContainer.className = globalsDOM.fieldsContainer.className.replace(/active/g, ' ');
		globalManagers.canvas.clear();
	}

	showChoicePanel() {
		globalManagers.canvas.drawChoicePanel();
		const choiceField = document.getElementById('choice-bar');
		choiceField.className = choiceField.className + ' display';
		globalGameInfo.isPanelVisible = true;
	}

	hideChoicePanel() {
		globalManagers.canvas.clear();
		const choiceField = document.getElementById('choice-bar');
		choiceField.className = choiceField.className.replace(' display', ' ');
		globalGameInfo.isPanelVisible = false;
	}

	disableField(id) {
		const fieldClicked = document.getElementById(id);
		fieldClicked.className = fieldClicked.className.replace(' not-selected', ' ');
	}

	drawMove(indexPosition, turn) {
		let positionY=0, positionX=0;

		if(indexPosition<3){
			positionY=55;
			positionX=55+indexPosition*110;
		} else if(indexPosition<6){
			positionY=165;
			positionX=55+(indexPosition-3)*110;
		} else{
			positionY=275;
			positionX=55+(indexPosition-6)*110;
		}
		switch (turn) {
		case 'x':
			globalManagers.canvas.drawX(positionX,positionY);
			break;
		case 'o':
			globalManagers.canvas.drawO(positionX,positionY);
		}
		globalManagers.ui.disableField(indexPosition);
	}

	switchViewTo(nameOfState){
		switch (nameOfState) {
		case 'ai':
			this.disableBoard();
			break;
		case 'human':
			this.enableBoard();
			break;
		}
	}
	disableBoard(){
		globalsDOM.fieldsContainer.className = globalsDOM.fieldsContainer.className.replace(' active', ' ');
	}
	enableBoard(){
		globalsDOM.fieldsContainer.className = globalsDOM.fieldsContainer.className + ' active';
	}
}
