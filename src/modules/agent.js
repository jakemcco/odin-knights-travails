//Handles calculations for how we want to move the knight

import {Vertex, Edge, Graph} from "./graph.js";
import {Cell} from "./game-board.js";

/*
Agent class holds the logic for graph search
*/

class Agent {
    constructor(){
        //Keeps track of unique objects used to key into verts, in this case cells are the keys, values are the corresponding vertices
        this.vertsFromObjs = new Map;
        //x,y delta from the given coordinates that *could* be a move for the knight (assuming it is on the board)
        this.possibleKnightOffsets = [
            {xOffset:2, yOffset:1},
            {xOffset:1, yOffset:2},
            {xOffset:-1, yOffset:2},
            {xOffset:-2, yOffset:1},
            {xOffset:-2, yOffset:-1},
            {xOffset:-1, yOffset:-2},
            {xOffset:1, yOffset:-2},
            {xOffset:2, yOffset:-1}
        ];
    }

    _createVertFromUniqueObj(obj, distFromRoot, parent) {
        if (!(obj instanceof Object)) throw Error('invalid object to create vert from');
        //Check to see if key exists
        if (!this.vertsFromObjs.has(obj)) {
            const vert = new Vertex(obj, distFromRoot, parent);
            this.vertsFromObjs.set(obj, vert);
            return vert;
        } else {
            throw Error ('A vert for this object already exists')
        }
    }

    _clearVerts() {
        this.vertsFromObjs.clear()
    }

    _doCellsMatch(cell1, cell2) {
        return true? cell1 === cell2: false;
    }

    _calculateValidKnightMoves(board, fromCell) {
        const cells = [];

        for (let offset of this.possibleKnightOffsets){
            let newX = fromCell.x + offset.xOffset;
            let newY = fromCell.y + offset.yOffset;
            let cell = board.getCellByCoords(newX, newY);
            if (cell instanceof Cell) {
                cells.push(cell);
            }
        }

        return cells;
    }

    _compileCellPath(goalVert) {
        let path = [];
        let tmp = goalVert;
        while(tmp.parent){
            path.push(tmp.data);
            tmp = tmp.parent
        }

        return path.reverse();
    }

    /*BFS to find the shortest path
        We create a graph out of vertex abstractions of our board cells so as to not modify the cell objects themselves.
        Currently does not make use of Edge class from Graph module
    */
    _calcKnightMove(board, fromCell, goalCell) {
        let goalFound = false;
        let currDepth = 0;
        const maxDepth = 20;
        //Queues of vertices
        const currQ = [];
        const nextQ = [];
        const rootVert = this._createVertFromUniqueObj(fromCell, currDepth);
        let goalVert = null; //Is later set once we've found our goal
        const g = new Graph;
        g.addVertex(rootVert);
        currQ.push(rootVert);

        //Core search loop with failsafe  of depth
        while (!goalFound && (currDepth < maxDepth)){
            /*
            At the current depth (currQ), evaluate each vertex for goal and expand
            all previously undiscovered children for evaluation at the next depth
            */
            while(currQ.length != 0) {
                let tmpVec = currQ.shift(); //Dequeue vec
                //Check for goal equivalency
                if (tmpVec.data === goalCell){
                    goalVert = tmpVec;
                    goalFound = true;
                    break;
                }
                //Otherwise proceed to expand adjacent vertices
                else {
                    //array of moves that would land on the board (cells exist)
                    let unfilteredAdjCells = this._calculateValidKnightMoves(board, tmpVec.data);

                    //filtered for cells that have already had corresponding vertices created either in a previous search depth or earlier in this depth
                    let filteredAdjCells = unfilteredAdjCells.filter((cell) => {
                        return !(this.vertsFromObjs.has(cell));
                    });

                    //Create vertices for these newly discovered cells
                    let adjVerts = filteredAdjCells.map((cell) => {
                        return this._createVertFromUniqueObj(cell, currDepth+1, tmpVec);
                    });

                    //Add verts and edges to graph, add these new verts to queue for evaluation at the next depth
                    adjVerts.forEach((vert) => {
                        g.addVertex(vert);
                        let newEdge = new Edge(tmpVec, vert);
                        g.addEdge(newEdge);
                        nextQ.push(vert);
                    })
                }
            }
            //Keeps us from doing the end of loop stuff if we've found the goal this time.
            if(goalFound){
                break;
            }
            else {
                nextQ.forEach((elem) => {
                    currQ.push(elem);
                });
                nextQ.length = 0; //Keeps existing array but sets to []
                currDepth += 1;
            }
        }

        //Check reasons we've exited our search loop
        if (goalFound) {
            const cellPath = this._compileCellPath(goalVert)
            this.vertsFromObjs.clear(); //Clears for next time it's called
            return cellPath;
            //Create path using parent connections
        }
        else if (currDepth >= maxDepth) {
            throw Error ('Max search depth reached. Search terminated');
        }
        else {
            throw Error ('Not sure how this got triggered. _calcKnightMove')
        }
    }


    calcKnightPath(board, knightCell, goalCell){
        let path = []
        if (knightCell === goalCell) {
            return path;
        }
        else {
            path = this._calcKnightMove(board, knightCell, goalCell);
        }
        return path;
    }
}

export default Agent;