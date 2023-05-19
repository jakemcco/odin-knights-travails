
export class Cell {
    constructor(x, y, contents = null) {
        this.x = x;
        this.y = y;
        this.contents = contents;
        this.color = 'green';
        this.fontColor = 'goldenrod';
    }

    clearContents() {
        this.contents = null;
    }
}

export default class GameBoard {
    constructor(size = 8) {
        this.size = size;
        this.cells = this.createBoard(this.size);
    }

    //Creates by row, important when iterating through cell elsewhere
    createBoard(requestedSize) {
        const cells = {};

        for (let j = 1; j <= requestedSize; j++) {
            for (let i = 1; i <= requestedSize; i++) {
                const cell = new Cell(i, j);
                //Determine cell color
                if ((i % 2 && !(j % 2)) || (!(i % 2) && (j % 2))) {
                    cell.color = 'white';
                    cell.fontColor = 'black';
                } else {
                    cell.color = 'black';
                    cell.fontColor = 'white';
                }
                cells[[i,j]] = cell;
            }
        }
        return cells;
    }

    areCoordsValid(x, y){
        return true ? (x >= 1 && x <= this.size && y >= 1 && y <= this.size) : false;
    }

    getCellByCoords(x, y){
        if (this.areCoordsValid(x, y)) {
            return this.cells[[x,y]];
        } else {
            return false
            // throw Error ('Invalid cell requested, x or y out of range');
        }
    }

    getCellContentsByCoords(x, y) {
        if (this.areCoordsValid(x, y)) {
            return this.cells[[x,y]].contents;
        } else {
            throw Error ('Invalid cell requested, x or y out of range');
        }
    }

    clearAllCellsContents() {
        for (let cell of this.cells.values){
            cell.contents = null;
        }
    }

    printCells() {
        for (const [key, value] of Object.entries(this.cells)) {
            console.log(key, value);
        }
    }

    exportCellArray() {
        let output = [];
        for (const [key, value] of Object.entries(this.cells)) {
            output.push(value);
        }
        return output;
    }

    getRowofCells(yIndex) {
        let output = [];
        for(let i = 1; i<= this.size; i++) {
            output.push(this.cells[[i,yIndex]]);
        }
        return output;
    }

    getAllRows() {
        let output = [];

        for (let j = 1; j<= this.size; j++) {
            output.push(this.getRowofCells(j));
        }
        return output;
    }
    
}


/* Testing Stuff */

// let myBoard = new GameBoard;

// let testCell = myBoard.getCellByCoords(2,3);

// const testRow = myBoard.getRowofCells(2);
// const testArr = myBoard.getAllRows();
