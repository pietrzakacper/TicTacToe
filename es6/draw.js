function drawX(x, y, ctx) {
	ctx.beginPath();
	let size = 30;
	ctx.moveTo(x - size, y - size);
	ctx.lineTo(x + size, y + size);

	ctx.moveTo(x + size, y - size);
	ctx.lineTo(x - size, y + size);
	ctx.stroke();
}

function drawO(x,y,ctx){
	let radius=30;
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2,true);
	ctx.stroke();
}

function drawGrid(ctx){
	let initialWidth = ctx.lineWidth;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(110,0);
	ctx.lineTo(110,330);
	ctx.moveTo(220,0);
	ctx.lineTo(220,330);
	ctx.moveTo(0,110);
	ctx.lineTo(330,110);
	ctx.moveTo(0,220);
	ctx.lineTo(330,220);
	ctx.stroke();
	ctx.lineWidth = initialWidth;
}
