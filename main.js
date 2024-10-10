// SCROLL FUNCTION (HEADER)

const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === "IAT355.html") {
            window.location.href = targetId;
        } else {
        
            e.preventDefault(); 
            const targetElement = document.querySelector(targetId);
        
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
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

// BACK TO TOP (HEADER + FOOTER)

const backToTopButtons = document.querySelectorAll('#backToTop1, #backToTop2');

backToTopButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault(); 

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// NOTE:
// AI (ChatGPT) was incorporated only in this section of my work. I asked AI to make a basic scrolling function; 
// however, I modified my work to create different scrolling functions (for the header, arrow on the hero image, 
// and the footer). I ran into a problem because I have a scroll back-to-top at the bottom right footer and 
// upper left header, therefore, I had to change the function so it can detect which button was being pressed 
// to make sure the scroll performed properly and accordingly (Function 3). I also had to throw in an if-statement 
// (Function 1) at the header since one of the buttons went to visualizations.html. Nonetheless, very minimal AI was 
// used in the making of my portfolio. This also applies to my vis.js file!
//
// If any questions come up, feel free to reach out! :)

/*
This is the Base Function that I asked for:

const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Scroll to the target element smoothly
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
*/