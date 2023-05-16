// import favicon from "../assets/favicon.ico";

import displayController from "./displayController";


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

    //Call core content creation, append to main.
    main.append(A, B, C, D);
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

}

export default initializeWebsite;