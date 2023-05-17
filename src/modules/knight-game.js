import GameBoard from "./game-board.js";
// import Knight from "./modules/knight.js";
// import Agent from "./modules/agent.js";

const defaultOptions = {
    boardsize: 8,
    knightStart: {x:2, y:2},
    knightGoal: {x:6, y:6}
}

export default function createKnightGame(container, options = defaultOptions) {

    //Create global object for our application using IIFE
    class Game {
        constructor(gameDOMContainer, gameOptions) {
            this.boardsize = gameOptions.boardsize;
            this.knightStart = gameOptions.knightStart;
            this.knightGoal = gameOptions.knightGoal;
            this.board = new GameBoard(this.boardsize);
            if (!(gameDOMContainer === null)){
                this.createDOM(gameDOMContainer);
            };
        }

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
                                    textContent: `${cell.x}, ${cell.y}`,
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
    };

    window.KNIGHTGAME = new Game(container, options);
};