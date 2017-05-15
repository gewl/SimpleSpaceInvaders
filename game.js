function Game() {
	// html5 canvas ref/dimensions
	this.canvas = null;
	this.ctx = null;
	this.boardWidth = 480;
	this.cellWidth = this.boardWidth/16;

	this.intervalId = null;
	this.travelingLeft = true;
	this.enemyMovementTimer = 3;

	this.playerX = 7;
	this.playerY = 14;

	this.moveLeft = false;
	this.moveRight = false;

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

	var game = this;
	window.addEventListener("keydown", function(e) {
		if (e.which === 37) {
			game.moveLeft = true;
		} else if (e.which === 39) {
			game.moveRight = true;
		}
	})

	this.draw()
}

Game.prototype.start = function() {
	var game = this;
	this.intervalId = setInterval(function() {
		game.loop()
	}, 200)
}

Game.prototype.loop = function() {
	this.moveEnemies();
	this.movePlayer();
	this.draw();
}

Game.prototype.movePlayer = function() {
	if (this.moveLeft) {
		var x = this.playerX, y = this.playerY, newX = x-1;

		this.cells[y][newX] = "P";
		this.cells[y][x] = 0;
		this.playerX = newX;

		this.moveLeft = false;
	}
	if (this.moveRight) {
		var x = this.playerX, y = this.playerY, newX = x+1;

		this.cells[y][newX] = "P";
		this.cells[y][x] = 0;
		this.playerX = newX;

		this.moveRight = false;
	}
}

Game.prototype.moveEnemies = function() {
	var width = this.cells.length
	this.enemyMovementTimer--;

	if (!this.enemyMovementTimer) {
		this.enemyMovementTimer = 3;

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
				// prevents ugly lingering on edges
				this.enemyMovementTimer = 1;
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
				this.enemyMovementTimer = 1;
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
	}
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

	this.ctx.fillRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);

}

var game = new Game();
game.initialize();
game.start();
