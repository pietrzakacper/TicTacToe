'use strict';

var _draw = require('draw.js');

var canvas = document.getElementById('canvas');

if (canvas.getContext) {
	var ctx = canvas.getContext('2d');
	init(ctx);
} else {
	console.log('Canvas is not supported!');
}

function init(ctx) {
	ctx.lineWidth = 10;
	ctx.strokeStyle = 'white';
	(0, _draw.drawX)(50, 50, ctx);
}