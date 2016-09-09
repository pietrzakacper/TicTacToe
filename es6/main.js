var globals = {};

(function() {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	init(ctx);


	// function definitions
	function init() {
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 20;
		drawGrid(ctx);
	}
})();
