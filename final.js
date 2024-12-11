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
            vl.x().fieldQ('Year').title('Year')  
                .axis({ labelColor: 'white', titleColor: 'white' }),  // White text for x-axis labels and title
            vl.y().fieldQ(field).title(`${field} per Game`) 
                .axis({ labelColor: 'white', titleColor: 'white' }),  // White text for y-axis labels and title
            vl.color().fieldN('Player').type('nominal')  
        )
        .title(`Comparison of Michael Jordan and LeBron James' ${field} Over Time`)
        .width(500)
        .height(300)
        .config({
            background: '#1f1f1f',  // Dark background for the chart area
            title: {
                color: 'white',  // Set title text to white
            },
            axis: {
                gridColor: '#333',  // Lighter grid lines for contrast
                domainColor: '#555',  // Darker axis lines to blend in with background
            },
            legend: {
                labelColor: 'white',  // Set legend labels to white
                titleColor: 'white',   // Set legend title to white
            }
        })
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

document.getElementById('toggleSTL').addEventListener('click', function() {
    render('STL'); 
    updateButtonText('Steals');
});

function updateButtonText(stat) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('Show')) {
            button.textContent = `Show ${stat}`;
        }
    });
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get all elements inside .content that should fade in
    const fadeElements = document.querySelectorAll('.content .fade-in');

    // Intersection Observer to detect when elements come into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'visible' class to make them fade in
                entry.target.classList.add('visible');
            } else {
                // Remove 'visible' class to make them fade out when out of view
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    // Observe each element
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
