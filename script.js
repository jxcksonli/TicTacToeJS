// Cell in the board
function Cell () {
    let value = '';
    const cell = document.createElement('button');
    cell.classList.add("cell");
    cell.textContent = '';

    const getValue = () => value; // Return the stored value (either 'X', 'O', or '')

    const setValue = (newValue) => { 
        value = newValue; 
        this.textContent = newValue; 
    }; // Set the value and update the cell text

    return { getValue, setValue, Cell };
}

// Gameboard
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

    // Return a div containing all the cells (board)
    const render = () => {
        const gameboardContainer = document.createElement('div'); // Create a container for the board
        gameboardContainer.classList.add('board-container'); // Add a class for styling

        // Loop through the board and append each cell
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div'); // Create a row for each row in the board
            row.classList.add('row'); // Add a class for styling
            for (let j = 0; j < columns; j++) {
                row.appendChild(board[i][j]); // Append the cell to the row
            }
            gameboardContainer.appendChild(row); // Append the row to the board container
        }

        return gameboardContainer; // Return the complete board container
    };

    return { getBoard , render };
}

// Display the winner of the round (if valid)
function returnWinner(Winner) {
    const gameboard = document.querySelector('.gameboard');
    if (Winner === 'O') {
        gameboard.textContent = "Knoughts win!";
    } else if (Winner === 'X') {
        gameboard.textContent = "Crosses win!";
    } else {
        gameboard.textContent = "Draw!";
    }
}

// Check if the game is over with winning patterns
function isGameOver(board) {
    const winningPatterns = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    // Check each winning pattern
    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        const valueA = board[a[0]][a[1]].getValue();
        const valueB = board[b[0]][b[1]].getValue();
        const valueC = board[c[0]][c[1]].getValue();

        // Check if all cells in the pattern have the same non-empty value
        if (valueA !== '' && valueA === valueB && valueB === valueC) {
            returnWinner(valueA);
            return valueA; // Return the winner ('X' or 'O')
        }
    }

    // Check for draw (all cells filled)
    const allCellsFilled = board.flat().every((cell) => cell.getValue() !== '');
    if (allCellsFilled) {
        returnWinner('Draw');
        return 'Draw'; // Return 'Draw' if all cells are filled and no winner
    }

    return false; // Game is not over
}

function validMove(board, row, column) {
    // Check if the cell is empty
    if (board[row][column].getValue() === '') {
        return true;
    } else {
        return false;
    }
}

// Play the TicTacToe game
function playGame() {
    const max_rounds = 9;
    const occupied = 0;
    const board = Gameboard();
    const gameboard = document.querySelector('.gameboard');
    gameboard.innerHTML = ''; // Clear any existing content in the gameboard
    gameboard.appendChild(board.render()); // Append the board container with cells
    const whoseTurn = document.querySelector('.whoseturn');
    let currentPlayer = 'X';


    // While game not over, run the game loop
    while (!isGameOver(board.getBoard()) && occupied < max_rounds) {

        whoseTurn.textContent =`${currentPlayer}'s turn`;

// Wait for the current player to make a move
        // This would typically be event-driven, using click listeners
        const handleMove = (event) => {
            const cellElement = event.target;
            const row = Math.floor(Array.from(gameContainer.children).indexOf(cellElement) / 3);
            const column = Array.from(gameContainer.children).indexOf(cellElement) % 3;

            if (validMove(board.getBoard(), row, column)) {
                // 1. Make the move
                board.getBoard()[row][column].setValue(currentPlayer);
                occupied++; // Increment move counter

                // 2. Check if the game is over
                const result = isGameOver(board.getBoard());
                if (result) {
                    // If there's a winner or draw, end the game
                    returnWinner(result);
                    gameContainer.removeEventListener('click', handleMove); // Stop further moves
                    startButton.style.display = 'block'; // Show the restart button
                    return; // Exit the loop early
                }

        // 3. Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        whoseTurn.textContent = `${currentPlayer}'s turn`;
        };
    }
}
}

// Start the game
startButton = document.querySelector('.playButton');
startButton.addEventListener('click', startGame);

function startGame() {
    startButton.style.display = "none";
    playGame();
    startButton.style.display = "block";
}
