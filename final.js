// SITE NAVIGATION
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

// SCROLL FUNCTION (ARROW ON HERO IMAGE)

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

// FADING EFFECT
document.addEventListener('DOMContentLoaded', function () {
    const fadeElements = document.querySelectorAll('.content .fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); 

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// Global variables to keep track of current chart type and stat type
let currentChartType = 'bar';  
let currentStat = 'REGULAR SEASON PTS';  

// Render Bar Chart Using VegaLite
async function renderBar(field) {
    const data = await d3.csv("GOATstats.csv");  

    const vlSpec = vl
        .markBar()  
        .data(data)
        .transform(
            vl.aggregate({ // CALCULATE AVERAGE OF PLAYER'S RESPECTIVE STAT
                op: 'average',  
                field: field, 
                as: `average_${field.toLowerCase().replace(/%/g, '')}` 
            })
            .groupby(['Player'])  
        )
        .encode(
            vl.y().fieldN('Player').axis({ labelColor: 'white', titleColor: 'white', labelFontSize: 18, title: null }),  
            vl.x().fieldQ(`average_${field.toLowerCase().replace(/%/g, '')}`).title(`${field}`).axis({ labelColor: 'white', titleFontSize: 18, titleColor: 'white' }),  
            vl.color().fieldN('Player').type('nominal').legend(null)  
        )
        .title(`Comparison of Average ${field}: Michael Jordan vs. LeBron James`)
        .width(700)
        .height(500)
        .config({
            mark: { bar: { size: 20 } },  
            background: '#1f1f1f',  
            title: { color: 'white', fontSize: 24 },
            axis: { gridColor: '#333', domainColor: '#555' }
        });

    const view = await vegaEmbed("#vis1", vlSpec.toSpec()).view;
    view.run();
}

// Render Line Chart Using VegaLite
async function renderLine(field) {
    const data = await d3.csv("GOATstats.csv");

    const vlSpec = vl
        .markLine() 
        .data(data)
        .encode(
            vl.x().fieldQ('Year').title('Year')  
                .axis({ labelColor: 'white', titleColor: 'white', titleFontSize: 18 }), 
            vl.y().fieldQ(field).title(`${field} per Game`) 
                .axis({ labelColor: 'white', titleColor: 'white', titleFontSize: 18 }), 
            vl.color().fieldN('Player').type('nominal')  
        )
        .title(`Comparison of Michael Jordan and LeBron James' ${field} Over Time`)
        .width(700)
        .height(500)
        .config({
            background: '#1f1f1f',  
            title: {
                color: 'white',  
                fontSize: 24
            },
            axis: {
                gridColor: '#333',  
                domainColor: '#555',  
            },
            legend: {
                labelColor: 'white', 
                titleColor: 'white',
                labelFontSize: 18,     
                titleFontSize: 20 
            }
        })
        .toSpec();

    const view = await vegaEmbed("#vis1", vlSpec).view;
    view.run();
}

// EVENT LISTENER TO UPDATE GLOBAL VARIABLE CHART TYPE AND RERENDER CHART
document.getElementById('toggleChartType').addEventListener('click', function() {
    currentChartType = currentChartType === 'bar' ? 'line' : 'bar';
    this.textContent = `Switch to ${currentChartType === 'bar' ? 'Line' : 'Bar'} Chart`;
    renderChart(currentStat);
});

// EVENT LISTENERS TO UPDATE GLOBAL VARIABLE STAT TYPE AND RERENDER CHART AND UPDATE STAT DESCRIPTION
document.getElementById('toggleAssists').addEventListener('click', function() {
    currentStat = 'AST';  
    renderChart(currentStat);  
    updateButtonText('Assists');  
    updateStatDescription(); 
});

document.getElementById('toggleFT').addEventListener('click', function() {
    currentStat = 'FT%';  
    renderChart(currentStat);  
    updateButtonText('FT%'); 
    updateStatDescription(); 
});

document.getElementById('toggleFG').addEventListener('click', function() {
    currentStat = 'FG%';  
    renderChart(currentStat);  
    updateButtonText('FG%');  
    updateStatDescription(); 
});

document.getElementById('toggleRegPts').addEventListener('click', function() {
    currentStat = 'REGULAR SEASON PTS';  
    renderChart(currentStat);  
    updateButtonText('Regular Season PTS');  
    updateStatDescription(); 
});

document.getElementById('togglePlayoffPts').addEventListener('click', function() {
    currentStat = 'PLAYOFF PTS';  
    renderChart(currentStat);  
    updateButtonText('Playoff PTS');  
    updateStatDescription(); 
});

document.getElementById('toggleSTL').addEventListener('click', function() {
    currentStat = 'STL'; 
    renderChart(currentStat);  
    updateButtonText('Steals');  
    updateStatDescription(); 
});

// Update According to User Interaction with Buttons
function updateButtonText(stat) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('Show')) {
            button.textContent = `Show ${stat}`;
        }
    });
}

// Inital Render (Bar Chart + Regular Season Points) + Render Stat Description
renderChart('REGULAR SEASON PTS');
updateStatDescription();

// Function that reads Global Variables and Renders Chart According to User Interaction
function renderChart(field) {
    if (currentChartType === 'bar') {
        renderBar(field);  
    } else {
        renderLine(field); 
    }
}

// Function to update the stat description based on currentStat
function updateStatDescription() {
    let description = '';

    switch (currentStat) {
        case 'AST':
            description = 'Assists: The total number of assists made by the player, where they pass the ball to a teammate who then scores.Assists are a crucial part of a player’s playmaking ability. LeBron James is known for his exceptional court vision and ability to set up teammates, consistently ranking among the league leaders in assists. In contrast, Michael Jordan was less focused on assists, as his scoring ability often took priority. While both players had impressive assists numbers, LeBron’s passing ability is often considered one of his greatest strengths.';
            break;
        case 'FT%':
            description = 'Free Throw Percentage: The career average percentage of successful free throws made by the player out of the total free throws attempted. This stat is important for evaluating a player’s consistency and ability to capitalize on free opportunities. Michael Jordan, known for his ability to perform under pressure, had a solid free throw percentage but was not elite in this category. On the other hand, LeBron James, despite his athleticism, has struggled with free throws throughout his career, often leading to criticisms, especially in late-game situations.';
            break;
        case 'FG%':
            description = 'Field Goal Percentage: The career average percentage of successful field goals made by the player in relation to the total number of field goals attempted. Field goal percentage is a key indicator of shooting efficiency. Michael Jordan had a higher FG%, often taking high-percentage shots in the paint, particularly when attacking the rim. LeBron James, known for his versatility, has maintained an impressive field goal percentage as well, thanks to his ability to finish around the basket and his evolving jump shot over the years.';
            break;
        case 'REGULAR SEASON PTS':
            description = 'Regular Season Points: The career average of points scored by the player during the regular season games. This stat is a direct reflection of a player’s ability to score consistently. Michael Jordan is widely regarded as one of the greatest scorers in NBA history, having led the league in points per game multiple times. LeBron James, while also a prolific scorer, has focused on other aspects of the game, including playmaking and defense, but his ability to score in different ways has kept him near the top of the all-time scoring list.';
            break;
        case 'PLAYOFF PTS':
            description = 'Playoff Points: The career average of points scored by the player during playoff games. Playoff performance is often what separates the all-time greats from the rest, and Michael Jordan’s 6 NBA Championships with 6 Finals MVPs and his dominant playoff performances are a big part of his legacy. LeBron James has also had remarkable playoff performances, leading multiple teams to Finals appearances, but his number of championships (4 as of now) has been a point of comparison in the MJ vs LeBron debate.';
            break;
        case 'STL':
            description = 'Steals: The career average of steals made by the player, where they take the ball away from an opponent. Steals are a key defensive stat, and both players were outstanding defenders in their prime. Michael Jordan was known for his tenacity on defense and his ability to create turnovers, contributing greatly to his team’s defensive prowess. LeBron James, while often praised for his defense, is known for his versatility and ability to guard multiple positions, accumulating steals in key moments, especially during the playoffs.';
            break;
        default:
            description = ''; 
    }
    

    document.getElementById('statDescription').textContent = description;
}
