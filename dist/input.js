'use strict';

var fields = document.getElementsByClassName('field');

var myFunction = function myFunction() {
	console.log('clicked');
};

Array.from(fields).forEach(function (element) {
	element.addEventListener('click', myFunction);
});