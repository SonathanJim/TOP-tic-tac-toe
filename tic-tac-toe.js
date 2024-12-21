//Gameboard object
function Gameboard() {
    //array of nine 'Cells'
    const board = [];
    for (let i=0; i<9; i++) {
        board.push(Cell());
    };
    //method to return gameboard to UI
    const getBoard = () => board;
    //method to add X/O 'marker'
    //find an empty cell and change to an X or O
    const placeMarker = (cell, player) => {
        board[cell].addMarker(player)
    };
    
    //method to print board
    const printBoard = () => {
        const boardWithCellValues = board.map((Cell) => Cell.getValue());
        console.log(boardWithCellValues);
    }
    //return methods for interface
    return {
        getBoard, 
        placeMarker,
        printBoard
    }
};

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*
** a cell is one square on the board can have 3 states
** "" no content
** "X"
88 "O"
*/
function Cell() {
    //clear cell
    let value = "";
    //method to add marker
    const addMarker = player => value = player;
    //method to get value
    const getValue = () => value;
    //return methods
    return {
        addMarker,
        getValue
    };
}

/*
** GameController will control the turns and win conditions
*/
function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    //board
    const gameboard = Gameboard();
    //player objects(name & marker properties)
    const players = [
        {
            name: playerOneName,
            marker: "X"
        },
        {
            name: playerTwoName,
            marker: "O"
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
        gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };
    //play round
    const playRound = (cell) => {
        //check empty cell
        if (gameboard.getBoard()[cell].getValue() !== "") {
            console.log("NOT A VALID MOVE!!! select a different cell")
         return;
        }
        console.log (
            `Placing ${getActivePlayer().name}\'s ${getActivePlayer().marker} in cell ${cell}...`
        )
        gameboard.placeMarker(cell, getActivePlayer().marker)
        /* check winner HERE */
        if (checkWin(gameboard)) {
            console.log(`${getActivePlayer().name} wins!`);
            return
        }
        //change turn
        changeTurn();
        printNewRound();
    }
    const checkWin = (gameboard) => {
        const board = gameboard.getBoard();
        const activePlayerMarker = getActivePlayer().marker;
        return winConditions.some(combination => {
            return combination.every(index => {
                return board[index].getValue() === activePlayerMarker;
            });
        });
    };
    //Initial play game message
    printNewRound();
    //return methods
    return {
        playRound,
        getActivePlayer
    }
}


const game = GameController();