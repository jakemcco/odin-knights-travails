

class Vertex {
    constructor(data = null) {
        this.data = data;
        //this.connections = new Map; //key: vertex, value: edge list object (supports multiple edges between two vertices)
    }
}

class Edge {
    constructor(from, to, data = null) {
        this.from = from;
        this.to = to;
        this.data = data; //reserve for weights or other richer data
    }

    getOtherVertex(vert) {
        if (!(vert === this.from) || !(vert === this.to)) throw Error('Invalid vertex, this edge doesn\'t reference that vertex');
        return (vert === this.to ? this.from : this.to);
    }
}

class Graph {
    constructor() {
        this.verts = new Set;
        this.adjMap = new Map; //key:vertex, value: Set of vertices with values being edge lists
    }

    //Returns true if successfully added, false if it already was in the set
    addVertex(vertex) {
        if (!vertex || !(vertex instanceof Vertex)) throw Error('Invalid vertex');
        if (!this.verts.has(vertex)) {
            this.verts.add(vertex);
            this.adjMap.set(vertex, new Map);
            return true;
        }
        else {
            return false;
        }
    }

    removeVertex(vertexToRemove) {
        if (!vertexToRemove || !(vertexToRemove instanceof Vertex)) throw Error('Invalid vertex');
        if (this.verts.has(vertexToRemove)){
            //First remove references to this vertex from all connected vertices
            let adjVerts = this.adjMap.get(vertexToRemove).keys();
            for (let vert of adjVerts) {
                this.adjMap.get(vert).delete(vertexToRemove);
            }
            //Then remove this vertex from the graph's adjacency matrix
            this.adjMap.delete(vertexToRemove);
            //Then delete the vertex from the graph
            this.verts.delete(vertexToRemove);
            return true;
        }
        else {
            return false;
        }
    }

    //Edges are not unique with this implementation, can have multiple with the same values
    addEdge(edge) {
        if (!edge || !(edge instanceof Edge)) throw Error('Invalid edge');
        if (!this.verts.has(edge.from) || !this.verts.has(edge.to)) throw Error('Invalid edge, verts no in graph');

        //If there's no key, create the array
        if (g.adjMap.get(edge.from).get(edge.to) === undefined) {
            g.adjMap.get(edge.from).set(edge.to, [edge]);
            g.adjMap.get(edge.to).set(edge.from, [edge]);
        }
        //Otherwise, add this edge to the existing array
        else {
            g.adjMap.get(edge.from).get(edge.to).push(edge);
            g.adjMap.get(edge.to).get(edge.from).push(edge);
        }

        return true;
    }

    //Basic implementation currently only handles 1 edge
    removeEdge(edge) {
        if (!edge || !(edge instanceof Edge)) throw Error('Invalid edge');
        if (!this.verts.has(edge.from) || !this.verts.has(edge.to)) throw Error('Invalid edge, verts no in graph');
        console.log('Before removal: ', this.adjMap.get(edge.from).get(edge.to));
        let edgeList = g.adjMap.get(edge.from).get(edge.to);
        if (edgeList.includes(edge)) {
            //Preserve additional edges if they exist
            if(edgeList.length > 1) {
                //Remove the edge
                edgeList = edgeList.filter(elem => elem !== edge);
                //Reset the edgelists in both vert adjacency maps
                g.adjMap.get(edge.from).set(edge.to, edgeList);
                g.adjMap.get(edge.to).set(edge.from, edgeList);
            }
            //Otherwise completely remove the key from both maps since there are no more edges connecting the vertices
            else {
                g.adjMap.get(edge.from).delete(edge.to);
                g.adjMap.get(edge.to).delete(edge.from);
            }
        }
        console.log('After removal: ',this.adjMap.get(edge.from).get(edge.to));
        return true;
    }
}

/* Testing */

let g = new Graph;
let a = new Vertex('A');
let b = new Vertex('B');
let c = new Vertex('C');

g.addVertex(a);
g.addVertex(b);
g.addVertex(c);

let eAB = new Edge(a, b,100);
let eAC1 = new Edge(a, c, 50);
let eAC2 = new Edge(a, c, 333);

g.addEdge(eAB);
g.addEdge(eAC1);
g.addEdge(eAC2);

console.log(g.verts);
console.log(g.adjMap);
g.removeEdge(eAC1);

g.removeVertex(b);

console.log(g.verts);
console.log(g.adjMap);