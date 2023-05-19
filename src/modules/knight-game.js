import GameBoard from "./game-board.js";
// import Knight from "./modules/knight.js";
import Agent from "./agent.js";

const defaultOptions = {
    boardsize: 8,
    knightStart: {x:1, y:1},
    knightGoal: {x:8, y:8}
}

export default function createKnightGame(container, options = defaultOptions) {

    //Create global object for our application using IIFE
    class Game {
        constructor(gameDOMContainer, gameOptions) {
            this.boardsize = gameOptions.boardsize;
            this.knightStart = gameOptions.knightStart;
            this.knightGoal = gameOptions.knightGoal;
            this.board = new GameBoard(this.boardsize);
            this.agent = new Agent;
            // this.inputMgr = new InputManager;
            if (!(gameDOMContainer === null)){
                this.createDOM(gameDOMContainer);
                this.createEventListeners(gameDOMContainer);
            };
            this.knightCell = null;
            this.goalCell = null;
            this.setPositions();
        }

        //Create the board, cells, and options DOM elements
        createDOM(container) {
            //Create and add board
            const boardDOM = Object.assign(document.createElement('div'),
                            {
                            id: 'game-board',
                            classList: 'game-board'
                            });

            //Create and add cells to board row-by-row, prepending from bottom up to preserve ordering with x/y origin on bottom right
            for (let row of this.board.getAllRows()){
                row.reverse().forEach((cell) => {
                    const cellDOM = Object.assign(document.createElement('div'),
                                    {
                                    classList: 'cell',
                                    textContent: `${cell.x}, ${cell.y}`
                                    });
                    cellDOM.setAttribute('data-xCoord', `${cell.x}`);
                    cellDOM.setAttribute('data-yCoord', `${cell.y}`);
                    cellDOM.setAttribute('data-contents', `${cell.contents}`);
                    cellDOM.style.backgroundColor = cell.color;
                    cellDOM.style.color = cell.fontColor;
                    boardDOM.prepend(cellDOM);
                })
            }

            container.append(boardDOM);
            const btnContainer = Object.assign(document.createElement('div'),
                                {
                                id: 'game-options-container',
                                classList: 'game-options-container',
                                textContent: 'Options Placeholder',
                                });
            container.append(btnContainer);
            //Create and add buttons/options

        };

        //Create event listeners for DOM elements
        createEventListeners(container) {
            container.querySelectorAll(".cell").forEach((elem) => {
                elem.addEventListener('click', (e)=> {
                    console.log(e.target);
                    console.log(e.target.dataset.xcoord, e.target.dataset.ycoord);
                    // this.inputMgr(e.target.dataset.xcoord, e.target.dataset.ycoord);
                })
            })
            // .forEach((elem) => {
            //     elem.addEventListener('click', (e) => {
            //     // this.inputMgr(e.target);
            //     console.log(e.target);
            //     })
            // }
            //);
        }

        //Helper function to access the board cell by coordinates
        getCellDOMByCoords(x, y) {
            if (!this.board.areCoordsValid(x, y)) {
                throw Error ('Invalid x, y coordinates');
            }
            else {
                return document.querySelector(`[data-xcoord='${x}'][data-ycoord='${y}']`);
            }
        }

        setPositions() {
            this.knightCell = this.board.getCellByCoords(this.knightStart.x, this.knightStart.y);
            this.knightCell.contents = "knight";

            this.goalCell = this.board.getCellByCoords(this.knightGoal.x, this.knightGoal.y);
            this.goalCell.contents = 'goal';
        }

        placePiece(piece, coordinates) {

        }

        findKnightPath() {
            console.log(this.knightCell, this.goalCell);
            console.log(this.agent.calcKnightPath(this.board, this.knightCell, this.goalCell));

        }


    


    };

    window.KNIGHTGAME = new Game(container, options);
};