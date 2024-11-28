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
