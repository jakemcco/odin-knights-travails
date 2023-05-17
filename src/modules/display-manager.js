
/*
Create/Read/Update/Delete DOM elements
Handle user input --> options, request game actions be performed
Handle game state manager calls (update display, render results)
Render DOM elements
*/

class DisplayManager {
    constructor (){
        this.dom = initDOM();

    }

    initDOM() {
        const main = document.getElementById('main');

        const gameContainer = Object.assign(document.createElement('div'),
        {
            id: 'game-container',
            classList: 'game-container',
        });
        



        
    }


}



/*
UI Features
Display board
Display knight position
Display goal position


Buttons:
    Clear board
    Manual place knight, goal
    Random place knight, goal
*/


/*
Board state validator
    Ensures game state remains valid according to ruleset
        i.e. only 1 piece per space
    
Board position query
    maps to a given vertex
    returns vertex contents (empty || occupied by {gamePiece})


Game board has an instance of graph
    Create board position as an nxn grid of vertices with edges connecting adjacent grids

Generic game piece
    Position attribute

    Knight piece extends generic game piece, has

*/



/*
Initializing
Create game board JS object with grid & coordinates
Create 
Create game board HTML elements
Link the HTML board to the JS object coordinates

*/


/*
Testing:
    Highlight designated grid positions
    Highlight adjacent grid positions
    Populate designated grid positions
    De-populate designated grid positions
*/


export default DisplayManager;