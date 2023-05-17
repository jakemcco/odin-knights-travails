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
            console.log(gameDOMContainer === null);
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
            container.append(boardDOM);
            
            //Create and add cells to board row-by-row, prepending from bottom up to preserve ordering


            //Create and add buttons/options
        };
    };

    window.KNIGHTGAME = new Game(container, options);
};