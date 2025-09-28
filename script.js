document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.service-card, .testimonial-card, .info-card, .benefit');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(number => {
                    animateNumber(number);
                });
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        numberObserver.observe(statsSection);
    }

    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = `&copy; ${currentYear} Ativar Eletrônica. Todos os direitos reservados.`;
    }

    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            const eventLabel = this.textContent.trim();
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'engagement',
                    'event_label': eventLabel
                });
            }
        });
    });

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });

    function createParticles() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(139, 195, 74, 0.5);
                border-radius: 50%;
                pointer-events: none;
                animation: float-particle ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            heroSection.appendChild(particle);
        }
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }

        .scroll-down {
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }

        .scroll-up {
            transform: translateY(0);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    createParticles();

    const heroText = document.querySelector('.hero-text h1');
    if (heroText) {
        const highlightSpan = heroText.querySelector('.highlight');
        const highlightText = highlightSpan ? highlightSpan.textContent : '';

        const textParts = heroText.innerHTML.split(/<span[^>]*>.*?<\/span>/);
        heroText.innerHTML = '';
        let delay = 0;

        textParts[0].split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                animation: fadeInUp 0.5s ease forwards;
                animation-delay: ${delay}ms;
            `;
            heroText.appendChild(span);
            delay += 30;
        });

        if (highlightText) {
            const highlightContainer = document.createElement('span');
            highlightContainer.className = 'highlight';
            highlightContainer.style.cssText = 'display: inline-block;';

            highlightText.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.cssText = `
                    display: inline-block;
                    opacity: 0;
                    animation: fadeInUp 0.5s ease forwards;
                    animation-delay: ${delay}ms;
                `;
                highlightContainer.appendChild(span);
                delay += 30;
            });

            heroText.appendChild(highlightContainer);
        }

        if (textParts[1]) {
            textParts[1].split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.cssText = `
                    display: inline-block;
                    opacity: 0;
                    animation: fadeInUp 0.5s ease forwards;
                    animation-delay: ${delay}ms;
                `;
                heroText.appendChild(span);
                delay += 30;
            });
        }
    }

    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(fadeInStyle);

    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const difference = touchStartY - touchY;

        if (Math.abs(difference) > 5) {
            if (difference > 0) {
                navbar.classList.add('scroll-down');
                navbar.classList.remove('scroll-up');
            } else {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
        }
    });

    console.log('Ativar Eletrônica - Site carregado com sucesso!');
});