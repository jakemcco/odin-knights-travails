// import favicon from "../assets/favicon.ico";
import createKnightGame from "./knight-game.js";
import LeaderLine from "leader-line";

// from "../../node_modules/leader-line/leader-line.min.js"


/* Header with title and basic navbar */
function createHeader() {
    const header = Object.assign(document.createElement('header'),
                {
                    id: 'header',
                    classList: 'header'
                });

    const siteName = Object.assign(document.createElement('h1'),
                {
                    classList: 'site-name',
                    textContent: 'Knights Travails'
                });
    header.appendChild(siteName);

    return header;
}

/* Core content section between header & footer */
function createMain() {
    const main = Object.assign(document.createElement('main'),
                {
                    id: 'main',
                    classList: 'main',
                });

    //Create core DOM stuff, append to main.
    const gameContainer = Object.assign(document.createElement('div'),
    {
        id: 'game-container',
        classList: 'game-container',
    });


    //Define as needed
    const options = {
        boardsize: 8,
        knightStart: {x:2, y:2},
        knightGoal: {x:8, y:8}
    }
    createKnightGame(gameContainer, options);
    main.append(gameContainer);
    return main;
}

/* Basic footer w/ github link */
function createFooter() {
    const footer = Object.assign(document.createElement('footer'),
                {
                    id: 'footer',
                    classList: 'footer'
                });
    
    const copyright = document.createElement("p");
    copyright.textContent = `Copyright © ${new Date().getFullYear()} jakemcco`;
    
    const githubLink = document.createElement("a");
    githubLink.href = "https://github.com/jakemcco";
    
    const githubIcon = document.createElement("i");
    githubIcon.classList.add("fab");
    githubIcon.classList.add("fa-github");

    githubLink.appendChild(githubIcon);
    footer.appendChild(copyright);
    footer.appendChild(githubLink);

    return footer;
}

/* To be called on site load */
function initializeWebsite() {
    const content = document.getElementById("content");

    // Primary site layout
    content.appendChild(createHeader());
    content.appendChild(createMain());
    content.appendChild(createFooter());
    // Primary site functionality
    window.KNIGHTGAME.findKnightPath();
}

export default initializeWebsite;