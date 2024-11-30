function Cell () {
    let cell = document.createElement('div');
    cell.classList.add("cell");
    cell.textContent = "test"; // Nothing by default

    return cell;
}

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create 2D array gameboard
    for (i=0; i < rows; i++){
        board[i] = []
        for (j=0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const selectCell = (row, column) => {
        if (board[row][column] == 0){
            return
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      }
      
    const renderBoard = () => {

    }

    console.log("GAMEBOARD SET UP COMPLETE")

    return { getBoard, selectCell, printBoard, renderBoard };
}

function isGameOver() {
    return false;
}

function playGame() {
    const board = Gameboard();
    const gameboard = document.querySelector('.gameboard');
    gameboard.appendChild(board);


    while (isGameOver()){
        console.log("TEST")
    }
}

// Start the game
startButton = document.querySelector('.playButton');
startButton.addEventListener('click', startGame);

function startGame() {
    console.log("Game started");
    playGame();
}
