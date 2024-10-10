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

// RENDER VIS 1.1
async function render() {
    // load data
    const data = await d3.csv("videogames_long.csv");
  
    // create a bar chart
    const vlSpec = vl
      .markBar()
      .data(data)
      .title("Global Sales by Genre")
      .encode(
        vl.x().fieldN("genre").title("Genre"),
        vl.y().fieldQ("global_sales").title("Global Sales (in millions)").aggregate("sum")
      )
      .width(250)
      .height(200)
      .toSpec();
  
    const view = await vegaEmbed("#vis", vlSpec).view;
    view.run();
}
// RENDER VIS 1.1
async function render() {
    // load data
    const data = await d3.csv("videogames_long.csv");
  
    // create a bar chart
    const vlSpec = vl
      .markBar()
      .data(data)
      .title("Global Sales by Genre")
      .encode(
        vl.x().fieldN("genre").title("Genre"),
        vl.y().fieldQ("global_sales").title("Global Sales (in millions)").aggregate("sum")
      )
      .width(250)
      .height(200)
      .toSpec();
  
    const view = await vegaEmbed("#vis", vlSpec).view;
    view.run();
}
render();

// RENDER VIS 1.2
async function render1() {
    // load data
    const data = await d3.csv("videogames_long.csv");
  
    // create a bar chart
    const vlSpec = vl
        .markBar()
        .data(data)
        .title("Global Sales by Platform")
        .encode ( 
        vl.x().fieldN('platform').title("Platform"), 
        vl.y().fieldQ("global_sales").title("Global Sales (millions)").aggregate('sum')
        )
        .width(400)   
        .height(200) 
        .toSpec();
  
    const view = await vegaEmbed("#vis1", vlSpec).view;
    view.run();
}
render1();


// RENDER VIS 2.1
async function render2() {
    // load data
    const data = await d3.csv("videogames_long.csv");
  
    // create a bar chart
    const vlSpec = vl
        .markLine()
        .data(data)
        .title("Sales Over Time by Genre")
        .encode(
            vl.x().fieldT("year").title("Year"),
            vl.y().aggregate("sum").fieldQ("global_sales").title("Global Sales (millions)"),
            vl.color().fieldN("genre").title("Genres"),
        )
        .width(1000)  
        .height(400) 
        .toSpec();
  
    const view = await vegaEmbed("#vis2", vlSpec).view;
    view.run();
}
render2();

// RENDER VIS 2.2
async function render3() {
    // load data
    const data = await d3.csv("videogames_long.csv");
  
    // create a bar chart
    const vlSpec = vl
        .markLine()
        .data(data)
        .title("Sales Over Time by Platform")
        .encode(
            vl.x().fieldT("year").title("Year"),
            vl.y().aggregate("sum").fieldQ("global_sales").title("Global Sales (millions)"),
            vl.color().fieldN("platform").title("Platform"),
        )
        .width(800)  
        .height(400) 
        .toSpec();
  
    const view = await vegaEmbed("#vis3", vlSpec).view;
    view.run();
}
render3();

// RENDER VIS 4
async function render4() {
    // load data
    const data = await d3.csv("videogames_long.csv");
  
    // create a bar chart
    const vlSpec = vl
        .markBar()
        .data(data)
        .title("Regional Sales vs. Platform")
        .encode(
            vl.x().fieldN("platform").title("Platform"), 
            vl.y().aggregate("sum").fieldQ("sales_amount").title("Global Sales (in millions)"), 
            vl.color().fieldN("sales_region").title("Region")
        )
        .width(500)
        .height(300)
        .toSpec();
  
    const view = await vegaEmbed("#vis4", vlSpec).view;
    view.run();
}
render4();

// RENDER VIS 5
async function render5() {
    // load data
    const data = await d3.csv("videogames_long.csv");
  
    // create a bar chart
    const vlSpec = vl
        .markLine()
        .data(data) 
        .title("Total Number of Games Sold Each Year")
        .transform(
        vl.groupby('year')  
            .aggregate(vl.count().as('total_games'))  
        )
        .encode(
            vl.x().fieldT('year').title("Year"),  
            vl.y().fieldQ('total_games').title("Total Games Sold"),  
        )
        .width(600)  
        .height(400)  
        .toSpec();
  
    const view = await vegaEmbed("#vis5", vlSpec).view;
    view.run();
}
render5();