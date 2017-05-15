function Game() {
	// html5 canvas ref/dimensions
	this.canvas = null;
	this.ctx = null;
	this.boardWidth = 480;
	this.cellWidth = this.boardWidth/16;

	// object positioins	
	this.cells = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0, 'E', 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 'P', 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
}

Game.prototype.initialize = function() {
	// render board
	const canvas = document.createElement("canvas");
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");

	canvas.width = this.boardWidth
	canvas.height = this.boardWidth

	document.body.appendChild(canvas);

	for (let i = 0; i <= this.boardWidth; i += this.cellWidth) {
		this.ctx.beginPath();
		this.ctx.moveTo(0, i);
		this.ctx.lineTo(this.boardWidth, i);
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
	}

	this.draw()
}

// draw board onto canvas
Game.prototype.draw = function() {
	var length = this.cells.length;
	for (var y = 0; y < length; y++) {
		var row = this.cells[y];
		for (var x = 0; x < length; x++) {
			var cell = row[x];
			if (cell != 0) {
				this.drawCell(cell, x, y);
			}
		}
	}
}

Game.prototype.drawCell = function(cell, x, y) {
	// choose color to draw based on vallue of cell
	switch (cell) {
		case 'E':
			this.ctx.fillStyle = "red";
			break;
		case 'P':
			this.ctx.fillStyle = "blue";
			break;
	}

	this.ctx.fillRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);

}

var game = new Game();
game.initialize();
