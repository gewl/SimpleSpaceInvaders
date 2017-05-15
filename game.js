function Game() {
	// html5 canvas ref/dimensions
	this.canvas = null;
	this.ctx = null;
	this.boardWidth = 480;
	this.cellWidth = this.boardWidth/16;

	this.intervalId = null;
	this.travelingLeft = true;

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

	this.draw()
}

Game.prototype.start = function() {
	var game = this;
	this.intervalId = setInterval(function() {
		game.loop()
	}, 200)
}

Game.prototype.loop = function() {
	var width = this.cells.length
	if (this.travelingLeft) {
		var atLeftEdge = false;

		for (var i = 0; i < width; i++) {
			if (this.cells[i][0] === "E") {
				atLeftEdge = true;
				break;
			}
		}

		if (atLeftEdge) {
			this.travelingLeft = false;
		} else {
			for (var y = 0; y < width; y++) {
				var row = this.cells[y];
				for (var x = 0; x < width; x++) {
					var cell = row[x];
					if (cell === "E") {
						row[x-1] = "E";
						row[x] = 0;
					}
				}
			}
		}
	} else {
		var atRightEdge = false;

		for (var i = 0; i < width; i++) {
			if (this.cells[i][width-1] === "E") {
				atRightEdge = true;
				break;
			}
		}

		if (atRightEdge) {
			this.travelingLeft = true;
		} else {
			for (var y = width - 1; y >= 0; y--) {
				var row = this.cells[y];
				for (var x = width - 1; x >= 0; x--) {
					var cell = row[x];
					if (cell === "E") {
						row[x+1] = "E";
						row[x] = 0;
					}
				}
			}
		}
	}

	this.draw();
}

// draw board onto canvas
Game.prototype.draw = function() {
	var width = this.cells.length;
	for (var y = 0; y < width; y++) {
		var row = this.cells[y];
		for (var x = 0; x < width; x++) {
			var cell = row[x];
			this.drawCell(cell, x, y);
		}
	}
	for (let i = 0; i <= this.boardWidth; i += this.cellWidth) {
		this.ctx.beginPath();
		this.ctx.moveTo(0, i);
		this.ctx.lineTo(this.boardWidth, i);
		this.ctx.moveTo(i, 0);
		this.ctx.lineTo(i, this.boardWidth);
		this.ctx.lineWidth = 1;
		this.ctx.stroke();
	}
}

Game.prototype.drawCell = function(cell, x, y) {
	var cellWidth = this.cellWidth, ctx = this.ctx;
	// choose color to draw based on vallue of cell
	switch (cell) {
		case 'E':
			ctx.fillStyle = "red";
			break;
		case 'P':
			ctx.fillStyle = "blue";
			break;
		default:
			ctx.fillStyle = "white";
			break;
	}

	// ctx.beginPath();
	// ctx.arc(x + cellWidth/2, y + cellWidth/2, cellWidth/2 - 3, 0, Math.PI*2, true);
	// ctx.lineWidth = 1;
	// ctx.fill();
	// ctx.stroke();

	this.ctx.fillRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);

}

var game = new Game();
game.initialize();
game.start();
