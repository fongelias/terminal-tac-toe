const Space = require('./Space');


module.exports = function Board() {
	this.spaces = [];
	this.turn = 0;

	this.resetBoard = () => {
		this.spaces = [];
		this.turn = 0;
		for(let i = 0; i < 3; i++) {
			this.spaces.push([])
			for(let j = 0; j < 3; j++) {
				this.spaces[i].push(new Space((i * 3) + (j + 1)));
			}
		}
	}

	this.print = () => {
		this.spaces.forEach((row) => {
			console.log(row.map(space => space.toString()).join(""));
		})
	}
	
	this.hasEmptySpaces = () => {
		return this.turn < 9
	}

	this.markTile = (tileNumber) => {
		if(tileNumber > 9 || tileNumber < 1) {
			return false;
		}
		const row = Math.floor((tileNumber - 1) / 3);
		const col = (tileNumber - 1) % 3;
		if(this.turn % 2 == 0) {
			this.turn++;
			return this.spaces[row][col].setX();
	    } else {
	    	this.turn++;
			return this.spaces[row][col].setO();
	    }
	}

	const isSameSymbol = (val1, val2, val3) => {
		return val1 & (val1 == val2 == val3) ? val1 : null;
	}

	const hasHorizontalWinner = () => {
		for(let i = 0; i < 3; i++) {
			const winner = isSameSymbol(this.spaces[i][0], this.spaces[i][1], this.spaces[i][2]);
			if(winner) {
				return winner;
			}
		}
		return null;
	}

	const hasVerticalWinner = () => {
		for(let i = 0; i < 3; i++) {
			const winner = isSameSymbol(this.spaces[0][i], this.spaces[1][i], this.spaces[2][i]);
			if(winner) {
				return winner;
			}
		}
		return null;
	}

	const hasDiagonalWinner = () => {
		return isSameSymbol(this.spaces[0][0],this.spaces[1][1],this.spaces[2][2]) 
			|| isSameSymbol(this.spaces[0][2],this.spaces[1][1],this.spaces[2][0]);
	}

	this.winner = () => {
		return hasHorizontalWinner() || hasDiagonalWinner() || hasVerticalWinner();
	}
	
}