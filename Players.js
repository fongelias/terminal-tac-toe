const reader = require('./Reader');
const EventEmitter = require('events');

function HumanPlayer(board, game, turnEventName) {
	EventEmitter.call(this);
	this.turnEventName = turnEventName;
	this.board = board;
	this.game = game;

	const turn = () => {
		reader.question('Make a move (Enter a tile number): ', (answer) => {
			if(this.board.markTile(answer)) {
				this.board.print();
				this.emit('endTurn');
			} else {
				console.log('Invalid Move');
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


