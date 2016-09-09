class Canvas {
	constructor(domCanvas) {
		this.canvas = domCanvas;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.strokeStyle = 'white';
		this.ctx.lineWidth = 20;
	}

	init() {
		this.drawGrid();
	}

	drawX(x, y) {
		this.ctx.beginPath();
		let size = 30;
		this.ctx.moveTo(x - size, y - size);
		this.ctx.lineTo(x + size, y + size);

		this.ctx.moveTo(x + size, y - size);
		this.ctx.lineTo(x - size, y + size);
		this.ctx.stroke();
	}

	drawO(x,y){
		let radius=30;
		this.ctx.beginPath();
		this.ctx.arc(x,y,radius,0,Math.PI*2,true);
		this.ctx.stroke();
	}

	drawChoicePanel(){
		let positionY = 80+29+55+22.5;
		this.drawX(77.5,positionY);
		this.drawO(22.5+110+22.5+22.5+55,positionY);
	}

	drawGrid(){
		let initialWidth = this.ctx.lineWidth;
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.moveTo(110,0);
		this.ctx.lineTo(110,330);
		this.ctx.moveTo(220,0);
		this.ctx.lineTo(220,330);
		this.ctx.moveTo(0,110);
		this.ctx.lineTo(330,110);
		this.ctx.moveTo(0,220);
		this.ctx.lineTo(330,220);
		this.ctx.stroke();
		this.ctx.lineWidth = initialWidth;
	}

}
