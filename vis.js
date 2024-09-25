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
