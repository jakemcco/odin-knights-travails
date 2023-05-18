//Handles calculations for how we want to move the knight

import {Vertex, Edge, Graph} from "./vertex.js";
import {Cell} from "./game-board.js";


class Agent {
    constructor(){
        //Keeps track of unique objects used to key into verts, in this case cells are the keys, values are the corresponding vertices
        this.vertsFromObjs = new Map;
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
            this.vertsFromObjs[obj] = vert;
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
        console.log(goalVert.parent)
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
    */
    _calcKnightMove(board, fromCell, goalCell) {
        let goalFound = false;
        let currDepth = 0;
        const maxDepth = 10;
        //Queues of vertices
        const currQ = [];
        const nextQ = [];
        const rootVert = this._createVertFromUniqueObj(fromCell, currDepth);
        let goalVert = null;
        const g = new Graph;
        g.addVertex(rootVert);
        currQ.push(rootVert);
        while (!goalFound && (currDepth < maxDepth)){
            while(currQ.length != 0) {
                let tmp = currQ.shift();
                console.log('tmp.data: ',tmp.data);
                console.log('tmp.data equality check: ', tmp.data === goalCell);
                if (tmp.data === goalCell){
                    goalVert = tmp;
                    goalFound = true;
                    break;
                }
                else {
                    console.log('does this ever get triggered????');
                    //array of moves that would land on the board (cells exist)
                    let unfilteredAdjCells = this._calculateValidKnightMoves(board, tmp.data);

                    console.log(unfilteredAdjCells);

                    //filtered for cells that have already had corresponding vertices created either in a previous search depth or earlier in this depth
                    let filteredAdjCells = unfilteredAdjCells.filter((cell) => {
                        return !(this.vertsFromObjs.has(cell));
                    });

                    console.log(filteredAdjCells);

                    //Create vertices for these newly discovered cells
                    let adjVerts = filteredAdjCells.map((cell) => {
                        return this._createVertFromUniqueObj(cell, currDepth+1, tmp);
                    });

                    console.log(adjVerts);

                    //Add verts and edges to graph, add these new verts to queue for evaluation at the next depth
                    adjVerts.forEach((vert) => {
                        g.addVertex(vert);
                        let newEdge = new Edge(tmp, vert);
                        g.addEdge(newEdge);
                        nextQ.push(vert);
                        console.log('heres the pushed vert: ', nextQ);
                    })


                    /*
                    build list of valid adj cell objs that can be our next move
                    filter list against vertsFromObjs (already visited)
                    create verts from the filtered cell objs
                    add verts to graph
                    add edges between tmp and new verts
                    push adjVerts to next queue
                    */
                }
            }
            nextQ.forEach((elem) => {
                currQ.push(elem);
            });

            console.log('new currQ: ', currQ);
            nextQ.length = 0;
            currDepth += 1;
            console.log('newDepth', currDepth);
        }

        if (goalFound) {
            const cellPath = this._compileCellPath(goalVert)
            return cellPath;
            //Create path using parent connections
        }
        else if (currDepth >= maxDepth) {
            throw Error ('Max search depth reached. Search terminated');
        }
        else {
            throw Error ('Not sure how this got triggered. _calcKnightMove')
        }

            //Create a list of all valid moves from current position
                //Valid moves that haven't been visited
            //Add each potential new move to the pending queue for visiting
            //While existing queue has elements in it, for each new unvisited cell
                /*
                evaluate if this is the goal cell
                    y? --> add current cell to stack, flag search to end
                
                    n? --> add current cell to stack, then calculate moves from this cell
                    return this._calcKnightMove(board,)
                
                */
               //when each cell at this level has been visited (queue is empty), check flags for goal having been found
                /*
                if flagged --> return path to goal
                else --> set current queue = pending queue, empty pending queue

                */
    }


    calcKnightPath(board, knightCell, goalCell){
        let path = []
        if (knightCell === goalCell) {
            return path;
        }
        else {
            path = this._calcKnightMove(board, knightCell, goalCell);
        }
        //return [cell1, cell2, cell3...]
        return path;
    }
}

export default Agent;