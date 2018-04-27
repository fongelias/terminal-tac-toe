

const readline = require('readline');
const EventEmitter = require('events');

const Board = require('./Board');
const HumanPlayer = require('./Players').HumanPlayer;

const config = {
	PLAYER_1_TURN_EVENT : 'player1TurnEvent',
	PLAYER_2_TURN_EVENT : 'player2TurnEvent',
}


function TickTackToeGame() {
	EventEmitter.call(this);
	this.board = null;
	this.players = [];

	const setBoard = () => {
		this.board = new Board();
		this.board.resetBoard();
	}

	const setPlayers = () => {
		if(!this.board) {
			console.log('error, no board property set to TickTackToeGame');
			return false;
		}
		this.players.push(new HumanPlayer(this.board, this, config.PLAYER_1_TURN_EVENT));
		this.players.push(new HumanPlayer(this.board, this, config.PLAYER_2_TURN_EVENT));
	}

	const evalTurn = () => {
		console.log('evalTurn');
		if(this.board.hasEmptySpaces && !this.board.winner()) {
			if(this.board.turn % 2 == 0) {
				console.log('player 1 turn')
				this.emit(config.PLAYER_1_TURN_EVENT);
			} else {
				console.log('player 2 turn')
				this.emit(config.PLAYER_2_TURN_EVENT);

			}
		} else {
			const winner = this.board.winner();
			if(winner) {
				console.log('The winner of this game is: ' + winner);
			} else {
				console.log('Tie game!');
			}
		}
	}

	const setGameLoop = () => {
		this.players.forEach((player, i) => {
			player.on('endTurn', () => {
				evalTurn();
			})
		})
	}

	this.init = () => {
		setBoard();
		setPlayers();
		setGameLoop();
		this.emit(config.PLAYER_1_TURN_EVENT);
	}
}
TickTackToeGame.prototype.__proto__ = EventEmitter.prototype;




let game = new TickTackToeGame();
game.init();

