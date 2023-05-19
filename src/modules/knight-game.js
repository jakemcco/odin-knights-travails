import GameBoard from "./game-board.js";
// import Knight from "./modules/knight.js";
import Agent from "./agent.js";
import LeaderLine from "leader-line";

const defaultOptions = {
    boardsize: 8,
    knightStart: {x:1, y:1},
    knightGoal: {x:8, y:8}
}

export default function createKnightGame(container, options = defaultOptions) {

    /*
    Create global class for our application
    Game state is independent of DOM, DOM dependent on Game state    
    */
    class Game {
        constructor(gameDOMContainer, gameOptions) {
            this.gameDOMContainer = gameDOMContainer;
            this.gameOptions = gameOptions;
            this.boardsize = gameOptions.boardsize;
            this.knightStart = gameOptions.knightStart;
            this.knightGoal = gameOptions.knightGoal;
            //Init
            this._init();
        }

        //Internal method for constructor to call
        _init(){
            this.board = new GameBoard(this.boardsize);
            this.agent = new Agent;
            // this.inputMgr = new InputManager;
            if (!(this.gameDOMContainer === null)){
                this.createDOM(this.gameDOMContainer);
                this.createEventListeners(this.gameDOMContainer);
            };
            this.setPositions();
        }

        //Create the board, cells, and options DOM elements
        createDOM(container) {
            //Create and add board
            const boardContainer = Object.assign(document.createElement('div'),
                            {
                            id: 'board-container',
                            classList: 'board-container'
                            });

            const cellContainer = Object.assign(document.createElement('div'),
                            {
                            id: 'cell-container',
                            classList: 'cell-container'
                            });

            const leftAxis = Object.assign(document.createElement('div'),
                            {
                            id: 'left-axis',
                            classList: 'left-axis',
                            textContent: 'temp'
                            });
            
            const bottomAxis = Object.assign(document.createElement('div'),
                            {
                            id: 'bottom-axis',
                            classList: 'bottom-axis',
                            textContent: 'temp'
                            });

            const axisLabels = Object.assign(document.createElement('div'),
                            {
                            id: 'axis-labels',
                            classList: 'axis-labels',
                            textContent: 'xy'
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
                    cellContainer.prepend(cellDOM);
                })
            }

            boardContainer.append(leftAxis, cellContainer, axisLabels, bottomAxis);
            container.append(boardContainer);

            //Create and add buttons/options
            const btnContainer = Object.assign(document.createElement('div'),
                                {
                                id: 'game-options-container',
                                classList: 'game-options-container',
                                textContent: 'Options Placeholder',
                                });
            container.append(btnContainer);


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


        /* TODO:

        Currently when executed at a given screen size, the start and end points of the arrows are ~ 10px to the left of center.
        When the screen size is adjusted, i.e. in Dev Tools, the svg immediately changes to the correct start/end points.

        */
        _drawMoveArrow(elem1, elem2, options = {}) {
            //This approach connects edge-to-edge
            // const line = new LeaderLine(elem1, elem2);
            //This approach connects center to center
            const line = new LeaderLine(
                LeaderLine.pointAnchor(elem1),
                LeaderLine.pointAnchor(elem2),
                options)
        };

        _drawKnightPath(arrOfCells) {
            let fromCell = this.knightCell;
            let fromElem = this.getCellDOMByCoords(fromCell.x, fromCell.y);
            for (let i = 0; i < arrOfCells.length; i++){
                let toCell = arrOfCells[i];
                let toElem = this.getCellDOMByCoords(toCell.x, toCell.y);
                this._drawMoveArrow(fromElem, toElem, {color: 'red', size: 5, path: 'straight'});
                fromElem = toElem;
            }

            //Organize our svgs that otherwise are dumped into the document body by leader-line module
            let parentContainer = document.querySelector('#game-container');
            let svgContainer = document.createElement('div')
            svgContainer.classList.add('svg-container');
            parentContainer.appendChild(svgContainer);

            let tmpSVGs = document.querySelectorAll('.leader-line');
            console.log(tmpSVGs);
            tmpSVGs.forEach((node) => {
                svgContainer.appendChild(node);
            });
            let llDefs = document.getElementById('leader-line-defs');
            console.log(llDefs);
            svgContainer.appendChild(llDefs);
    
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

        placePiece() {
            this.piece = 'test piece';
        }

        findKnightPath() {
            console.log(this.knightCell, this.goalCell);
            const path = this.agent.calcKnightPath(this.board, this.knightCell, this.goalCell);
            console.log(path);
            this._drawKnightPath(path);
        }
    };

    //Create global game object
    window.KNIGHTGAME = new Game(container, options);
};