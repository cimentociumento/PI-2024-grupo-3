document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 2000; // Duração da animação em milissegundos (2 segundos)
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    function adjustHeaderBackground() {
        const headerContent = document.querySelector('.header-content');
        const headerBackground = document.querySelector('.header-background');
        
        if (headerContent && headerBackground) {
            const contentWidth = headerContent.offsetWidth;
            headerBackground.style.width = `${contentWidth + 40}px`; // Adiciona 40px para um pouco de espaço extra
        }
    }

    // Ajusta o tamanho inicialmente
    adjustHeaderBackground();

    // Ajusta o tamanho quando a janela é redimensionada
    window.addEventListener('resize', adjustHeaderBackground);

    const aboutUsBtn = document.getElementById('aboutUsBtn');
    const aboutUsPopup = document.getElementById('aboutUsPopup');
    const closePopup = document.getElementById('closePopup');

    function positionPopup() {
        const footer = document.querySelector('footer');
        const footerRect = footer.getBoundingClientRect();
        const popupHeight = aboutUsPopup.offsetHeight;
        
        // Posiciona o pop-up 20px acima do footer
        aboutUsPopup.style.top = (window.pageYOffset + footerRect.top - popupHeight - 20) + 'px';
    }

    aboutUsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        aboutUsPopup.style.display = 'block';
        positionPopup();
    });

    closePopup.addEventListener('click', function() {
        aboutUsPopup.style.display = 'none';
    });

    // Reposiciona o pop-up ao rolar a página
    window.addEventListener('scroll', function() {
        if (aboutUsPopup.style.display === 'block') {
            positionPopup();
        }
    });

    // Fechar o pop-up se clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target == aboutUsPopup) {
            aboutUsPopup.style.display = 'none';
        }
    });

    // Evitar que cliques dentro do pop-up o fechem
    aboutUsPopup.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    const backToTopBtn = document.getElementById('backToTopBtn');

    // Mostrar ou esconder o botão baseado na posição de rolagem
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Rolar suavemente para o topo quando o botão for clicado
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToTop(1000); // 1000ms = 1 segundo para a animação (mais rápido que antes)
    });

    function scrollToTop(duration) {
        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    
        function scroll() {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, ((now - startTime) / duration));
            
            window.scrollTo(0, Math.ceil((1 - time) * start));
    
            if (time < 1) {
                requestAnimationFrame(scroll);
            }
        }
    
        requestAnimationFrame(scroll);
    }

    document.getElementById('startQuizBtn').addEventListener('click', function() {
        window.location.href = 'quiz/index.html'; // Redireciona para a página do quiz
    });
});

console.log('Script carregado');
