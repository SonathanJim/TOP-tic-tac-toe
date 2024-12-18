//Gameboard object
function Gameboard() {
    //array of nine 'Cells'
    const board = [];
    for (let i=0; i<9; i++) {
        board.push(Cell());
    };
    //method to return gameboard to UI
    const getBoard = () => board;
    //method to add X/O 'token'
    //find an empty cell and change to an X or O
    const placeToken = (cell, player) => {
        //filter to find available cells
        const availableCells = board.filter((Cell) => Cell.getValue() === "").map((Cell) => Cell);
        console.log(availableCells);
        //otherwise valid cell, place token(addToken)
        board[cell].addToken(player);
    };
    //method to print board
    const printBoard = () => {
        const boardWithCellValues = board.map((Cell) => Cell.getValue());
        console.log(boardWithCellValues);
    }
    //return methods for interface
    return {
        getBoard, 
        placeToken,
        printBoard
    }
};

/*
** a cell is one square on the board can have 3 states
** "" no content
** "X"
88 "O"
*/
function Cell() {
    //clear cell
    let value = "";
    //method to add token
    const addToken = player => value = player;
    //method to get value
    const getValue = () => value;
    //return methods
    return {
        addToken,
        getValue
    };
}

/*
** GameController will control the turns and win conditions
*/
function GameController(
    playerOneName = "X",
    playerTwoName = "O"
) {
    //board
    const board = Gameboard();
    //player objects(name & token properties)
    const players = [
        {
            name: "Player One",
            token: "X"
        },
        {
            name: "Player Two",
            token: "O"
        }
    ];
    //set activePlayer
    let activePlayer = players[0]
    //method to change activePlayer variable
    const changeTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    /* anon function to evaluate activePlayer */
    
    //method to get activePlayer
    const getActivePlayer = () => activePlayer;
    //print who's turn to console
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };
    //play round
    const playRound = (cell) => {
        console.log (
            `Placing ${getActivePlayer}\'s ${getActivePlayer.token} in cell ${cell}...`
        )
        board.placeToken(cell, getActivePlayer().token)
        /* check winner HERE */

        //change turn
        changeTurn();
        printNewRound();
    }
    //Initial play game message
    printNewRound();
    //return methods
    return {
        playRound,
        getActivePlayer
    }
}

const game = GameController();