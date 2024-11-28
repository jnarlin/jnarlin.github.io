const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        window.location.href = targetId;
    });
});

const backToTopButton = document.getElementById('backToTop'); 

backToTopButton.addEventListener('click', function (e) {
    e.preventDefault(); 

    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});

// SCROLL FUNCTION (ARROW ON HEADER)

const arrows = document.querySelectorAll('.arrow');

arrows.forEach(arrow => {
    arrow.addEventListener('click', function (e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
});

// RENDER VIS
async function render(field) {
    const data = await d3.csv("GOATstats.csv");
    const vlSpec = vl
        .markLine()
        .data(data)  
        .encode(
            vl.x().fieldQ('Year').title('Year'),  
            vl.y().fieldQ(field).title(`${field} per Game`), 
            vl.color().fieldN('Player').type('nominal')  
        )
        .title(`Comparison of Michael Jordan and LeBron James\' ${field} Over Time`)
        .width(500)
        .height(300)  
        .toSpec();   
  
    const view = await vegaEmbed("#vis1", vlSpec).view;
    view.run();
}

render('PLAYOFF PTS');

// Add event listeners to buttons
document.getElementById('toggleAssists').addEventListener('click', function() {
    render('AST');  
    updateButtonText('Assists');
});

document.getElementById('toggleFT').addEventListener('click', function() {
    render('FT%'); 
    updateButtonText('FT%');
});

document.getElementById('toggleFG').addEventListener('click', function() {
    render('FG%');  
    updateButtonText('FG%');
});

document.getElementById('toggleRegPts').addEventListener('click', function() {
    render('REGULAR SEASON PTS');  
    updateButtonText('Regular Season PTS');
});

document.getElementById('togglePlayoffPts').addEventListener('click', function() {
    render('PLAYOFF PTS'); 
    updateButtonText('Playoff PTS');
});

function updateButtonText(stat) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('Show')) {
            button.textContent = `Show ${stat}`;
        }
    });
}