let board = [];//star the board as an array.
//Set it up as a multi-dimensional array, to represent the col/row value for the board
//every section of the board will be represented by a point on the grid X and Y (col and row).
//Top left will be 0,0 and as it moves to the right, that will be +x and down will be +y.
for (row = 0; row < 6; row++) {
		board[row] = [];
		for (col = 0; col < 7; col++) {
				board[row][col] = 0;
		}
}
/*
Board div will hold 42 cells for game, to render use nested loop to create one div a time.
add class name to each dev = 'cell'
And set data attributes column, row and a default 0 value;
*/
const boardElement = document.querySelector('.board');
const renderBoard = () =>{
  boardElement.innerHTML = '';
  for (let row = 0; row < 6; row++) {
	   for (let col = 0; col < 7; col++) {
	       const cellElement = document.createElement('div');
         cellElement.className = 'cell';
         boardElement.appendChild(cellElement);
         const value = board[row][col];
         if(value == 1){
           cellElement.classList.add("playerOne");
           move(cellElement);
           document.querySelector('#playerTurn').innerHTML = `Current Player: ${currentPlayer}`;
         }else if (value == 2){
           cellElement.classList.add("playerTwo");
           move(cellElement);
           document.querySelector('#playerTurn').innerHTML = `Current Player: ${currentPlayer}`;
         }
         else{
           cellElement.classList.add('board');
         }
	    }
  }
}
renderBoard();
//=============================================================

//set current player to 1 at the star of game
let currentPlayer = 1;
//update players turn
function updatePlayer (){
  if (currentPlayer === 1) {
    currentPlayer = 2;
  }
  else{
    currentPlayer = 1;
  }
}
const displayWinMessage = () => {
  if (document.querySelector('.win-message') !== null) {
    return;
  }
  //create div with innerHTML mesage and append to board
  const winMessageElement = document.createElement('div');
  winMessageElement.className = 'win-message';
  winMessageElement.innerHTML = `Player ${currentPlayer} is the winner`;
  document.querySelector('.board').appendChild(winMessageElement);
}
const cellsElements = document.querySelectorAll('.cell');
//check if cell value is empty and decide where to drop disk
function drop(col) {//takes the column
  for (let row = 5; row >= 0; row--) {//6,5,4,3,2,1 total 6 rows
      if(board[row][col] === 0){//initial value is 0
        board[row][col] = currentPlayer;//change the value of that cell
        renderBoard();//update the board with current state of board
        checkWin();//check if any win conditions have met
        break;
      }
      else {
        //do nothing and move up in the column
      }
  }
  updatePlayer();//change players turn
}
function horizontalWin() {
  for(let row = 0; row <= 5; row++){
    for(let col = 0; col <= 3; col++){
      if(board[row][col] != 0 &&
         board[row][col] == board[row][col+1] &&
         board[row][col] == board[row][col+2] &&
         board[row][col] == board[row][col+3]){
           return true;
      }
    }
  }
  return false;
}
function verticalWin() {
  for(let row = 0; row <= 2; row++){
    for(let col = 0; col <= 6; col++){
      if(board[row][col] != 0 &&
         board[row][col] === board[row+1][col] &&
         board[row][col] === board[row+2][col] &&
         board[row][col] === board[row+3][col]){
            return true;
      }
    }
  }
  return false;
}
function topRightToBottomLeft(){
  for (let row = 0; row <= 2; row++) {
    for(let col = 0; col <= 3; col++){
      if(board[row][col] != 0 &&
         board[row][col] == board[row+1][col+1] &&
         board[row][col] == board[row+2][col+2] &&
         board[row][col] == board[row+3][col+3]){
           return true;
      }
    }
  }
  return false;
}
function bottomRigthToUpperLeft(){
  for(let row = 3; row <= 5; row++){
    for(col = 0; col <= 3; col++){
      if(board[row][col] != 0 &&
         board[row][col] == board[row-1][col+1] &&
         board[row][col] == board[row-2][col+2] &&
         board[row][col] == board[row-3][col+3]){
           return true;
      }
    }
  }
  return false;
}
function checkWin(){
  let isWinner = false;
  let hWin = horizontalWin();
  let vWin = verticalWin();
  let dWin = topRightToBottomLeft();
  let d2Win = bottomRigthToUpperLeft();
  if(hWin || vWin || dWin || d2Win === true){
    isWinner = true;
  }
  if(isWinner){
    displayWinMessage();
  }
}
function move(cell) {
  // var elem = document.getElementById("myAnimation");
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 500) {
      clearInterval(id);
    } else {
      pos++;
      cell.style.top = pos + 'px';
    }
  }
}
