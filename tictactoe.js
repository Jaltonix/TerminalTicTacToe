let prompt = require('prompt');
let currentPlayer = 'X';
let newBoard = '┌─────┐\n│R│T│Y│\n├─┼─┼─┤\n│F│G│H│\n├─┼─┼─┤\n│V│B│N│\n└─────┘';
let board = '┌─────┐\n│R│T│Y│\n├─┼─┼─┤\n│F│G│H│\n├─┼─┼─┤\n│V│B│N│\n└─────┘';
let validMoves = ['R', 'T', 'Y', 'F', 'G', 'H', 'V', 'B', 'N'];
let winner = null;

function validMove(move) {
  return validMoves.indexOf(move) !== -1;
}

function winCon(player) {
  switch(true) {
    case  board[9] === player && board[11] === player && board[13] === player: return true;
    case board[25] === player && board[27] === player && board[29] === player: return true;
    case board[41] === player && board[43] === player && board[45] === player: return true;
    case  board[9] === player && board[25] === player && board[41] === player: return true;
    case board[11] === player && board[27] === player && board[43] === player: return true;
    case board[13] === player && board[29] === player && board[45] === player: return true;
    case  board[9] === player && board[27] === player && board[45] === player: return true;
    case board[41] === player && board[27] === player && board[13] === player: return true;
    default: return false; 
  }
}

function placeMark () {
  if(validMoves.length === 0) {
      console.log('╭─────╮\n|Draw!|\n╰─────╯');
  } else {
    console.log(`╭──────────────────────────────╮\n│          ${currentPlayer} to move.          │\n│Place your mark at a location.│\n╰──────────────────────────────╯`)
    console.log(board);
    prompt.start();
    prompt.get(['move'], function(err, res) {
      let move = res.move.toUpperCase();
       if(validMove(move)) {
        validMoves.splice(validMoves.indexOf(move),1);
        board = board.replace(move, currentPlayer);
        if(winCon(currentPlayer)) {
          console.log(`╭───────╮\n|${currentPlayer} Wins!|\n╰───────╯`);
        } else {
          currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
          placeMark(currentPlayer);
        }
      } else if(validMoves.length !== 0) {
        console.log(`Please make a valid move, ${currentPlayer}`);
        placeMark();
      } 
    });
  }
}
placeMark(currentPlayer);
