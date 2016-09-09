"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function drawX(x, y, ctx) {
	ctx.beginPath();

	ctx.moveTo(x - 20, y - 20);
	ctx.lineTo(x + 20, y + 20);

	ctx.moveTo(x + 20, y - 20);
	ctx.lineTo(x - 20, y + 20);
	ctx.stroke();
}

exports.drawX = drawX;