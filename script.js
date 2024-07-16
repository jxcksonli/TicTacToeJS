function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create 2D array gameboard
    for (i=0; i<rows; i++){
        board[i] = []
        for (j=0; j<columns; j++){
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

    return { getBoard, selectCell, printBoard };
}



function Cell () {
    // Default value (Nothing)
    let value = 0

}