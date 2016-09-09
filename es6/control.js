let globals={};


const fields = document.getElementsByClassName('field');
const startButton = document.getElementById('start');
const canvas = document.getElementById('canvas');

	//bind Events
startButton.addEventListener('click',startGame);

Array.from(fields).forEach(
	element=>{element.addEventListener('click',handleFieldClick);}
);

	//define functions
function handleFieldClick(event){
	const id=event.target.id;
	disableField(id);
}

function disableField(id){
	const fieldClicked = document.getElementById(id);
	fieldClicked.className = fieldClicked.className.replace(' not-selected', ' ');
}

function startGame(){
	console.log('start...');
	globals.canvas=new Canvas(canvas);
	globals.canvas.drawChoicePanel();
	const choiceField = document.getElementById('choice-bar');
	choiceField.className = choiceField.className + ' display';
	//const fieldsContainer = document.getElementById('fields-container');
	//fieldsContainer.className = fieldsContainer.className+' active';
	console.log('after init');
}
