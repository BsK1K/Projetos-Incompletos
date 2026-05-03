/* ========================================
   ⚙️ PORTFOLIO NOIR - JAVASCRIPT
   Efeitos de scroll, carrossel e interações
   ======================================== */

// 🔧 MARCADOR: Todas as configurações estão aqui para facilitar edição
const CONFIG = {
    scrollOffset: 100,      // Distância para ativar animações de scroll
    carouselSpeed: 500,     // Velocidade da transição do carrossel (ms)
    cursorEnabled: true     // Ativar/desativar cursor personalizado
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initHeaderScroll();
    initCarousel();
    initTabs();
    initMobileNav();
    if (CONFIG.cursorEnabled) initCustomCursor();
});

// ===== ANIMAÇÕES AO SCROLL =====
function initScrollAnimations() {
    // 🔧 MARCADOR: Elementos que terão animação ao aparecer na tela
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 🔧 Opcional: Parar de observar após animar (melhora performance)
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,  // Ativa quando 10% do elemento está visível
        rootMargin: `0px 0px -${CONFIG.scrollOffset}px 0px`
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ===== HEADER COM EFEITO DE SCROLL =====
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > CONFIG.scrollOffset) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== CARROSSEL SIMPLES (Vanilla JS) =====
function initCarousel() {
    // 🔧 MARCADOR: Cada carrossel é inicializado separadamente
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel__track');
        const slides = Array.from(track.children);
        const nextBtn = carousel.querySelector('.carousel__btn--next');
        const prevBtn = carousel.querySelector('.carousel__btn--prev');
        const dotsContainer = carousel.closest('.carousel-wrapper')?.querySelector('.carousel__dots');
        
        let currentIndex = 0;
        
        // Criar dots de navegação
        if (dotsContainer && slides.length > 1) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel__dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        // Função para ir para um slide específico
        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Atualizar dots
            const dots = dotsContainer?.querySelectorAll('.carousel__dot');
            dots?.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Event listeners dos botões
        nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
        prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
        
        // 🔧 Opcional: Auto-play (descomente se quiser)
        // setInterval(() => goToSlide(currentIndex + 1), 5000);
        
        // Swipe para mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchStartX - touchEndX > 50) goToSlide(currentIndex + 1); // Swipe esquerdo
            if (touchEndX - touchStartX > 50) goToSlide(currentIndex - 1); // Swipe direito
        }
    });
}

// ===== TABS PARA CATEGORIAS DE PROJETOS =====
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const carouselWrappers = document.querySelectorAll('.carousel-wrapper');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            carouselWrappers.forEach(w => w.classList.remove('active'));
            
            // Adicionar active ao clicado
            btn.classList.add('active');
            const targetId = btn.dataset.tab;
            document.getElementById(targetId)?.classList.add('active');
        });
    });
}

// ===== MENU MOBILE =====
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Toggle menu
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== CURSOR PERSONALIZADO (efeito visual) =====
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    
    // Seguir o mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animação suave do follower
    function animateCursor() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Efeitos hover em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(1.8)';
            follower.style.opacity = '0.3';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.opacity = '0.5';
        });
    });
}

// ===== UTILITÁRIOS =====

// 🔧 MARCADOR: Função para adicionar smooth scroll em links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 🔧 MARCADOR: Validação simples de formulário (opcional)
const contactForm = document.querySelector('.contact__form');
contactForm?.addEventListener('submit', (e) => {
    // 🔧 Se não usar Formspree ou backend, comente esta prevenção
    // e adicione sua lógica de envio aqui
    // e.preventDefault();
    
    // Exemplo: mostrar mensagem de sucesso
    // alert('Mensagem enviada! Entrarei em contato em breve. 🚀');
});

// 🔧 MARCADOR: Função útil para adicionar novos projetos dinamicamente
// (Use no console do navegador ou integre com um CMS no futuro)
/*
function addProject(category, projectData) {
    const track = document.querySelector(`#${category} .carousel__track`);
    if (!track) return;
    
    const slide = document.createElement('div');
    slide.className = 'carousel__slide';
    slide.innerHTML = `
        <div class="project-card">
            <div class="project-card__image">
                <img src="${projectData.image}" alt="${projectData.title}">
                <span class="project-card__badge">${projectData.badge}</span>
            </div>
            <div class="project-card__content">
                <h4 class="project-card__title">${projectData.title}</h4>
                <p class="project-card__desc">${projectData.description}</p>
                <div class="project-card__tech">
                    ${projectData.techs.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="project-card__links">
                    ${projectData.links.map(l => 
                        `<a href="${l.url}" class="project-card__link">${l.icon} ${l.text}</a>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
    track.appendChild(slide);
    // 🔧 Atualizar dots se necessário
}
*/