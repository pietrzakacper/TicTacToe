const fields = document.getElementsByClassName('field');
const startButton = document.getElementById('start');

function myFunction(event){
	const id=event.target.id;
	disableField(id);
}

function disableField(id){
	const fieldClicked = document.getElementById(id);
	fieldClicked.className = fieldClicked.className.replace(' not-selected', ' ');
}

Array.from(fields).forEach(
	element=>{element.addEventListener('click',myFunction);}
);

function startGame(){
	console.log('start');
}

startButton.addEventListener('click',startGame);
