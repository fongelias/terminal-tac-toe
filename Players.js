const readline = require('readline');
const EventEmitter = require('events');

function HumanPlayer(board, game, turnEventName) {
	EventEmitter.call(this);
	this.turnEventName = turnEventName;
	this.board = board;
	this.game = game;

	const turn = () => {
		console.log(this.turnEventName);
		let reader = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		reader.question('Make a move (Enter a tile number): ', (answer) => {
			console.log(answer);
			if(this.board.markTile(answer)) {
				this.board.print();
				this.emit('endTurn');
				reader.close();
			} else {
				console.log('Invalid Move');
				reader.close();
				turn();
			}
		})
	}

	this.takeTurn = () => { turn(); };
	this.game.on(this.turnEventName, () => {
		this.takeTurn();
	});
} 
HumanPlayer.prototype.__proto__ = EventEmitter.prototype;

module.exports = {
	HumanPlayer,
};


