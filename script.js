// Script para mejorar la experiencia del usuario y SEO

document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave al hacer clic en enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para header sticky
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar secciones principales
    const sections = document.querySelectorAll('section, article > h2, .faq-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Resaltar sección actual en la navegación
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Contador de tiempo de lectura (métrica para SEO)
    function estimateReadingTime() {
        const text = document.querySelector('article').innerText;
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        
        // Crear y mostrar el tiempo de lectura
        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `<p>📖 Tiempo de lectura estimado: ${minutes} minutos</p>`;
        readingTimeElement.style.cssText = `
            background: #f0f8ff;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
            font-size: 0.9rem;
            color: #666;
        `;
        
        const article = document.querySelector('article');
        const h1 = article.querySelector('h1');
        h1.insertAdjacentElement('afterend', readingTimeElement);
    }

    estimateReadingTime();

    // Schema.org dinámico para mejor SEO
    function addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Uso de la Inteligencia Artificial: Buenas Prácticas, Ventajas y Riesgos",
            "description": "Descubre cómo usar la inteligencia artificial correctamente, sus ventajas, riesgos y mejores prácticas para empresas y usuarios.",
            "author": {
                "@type": "Organization",
                "name": "IA Guide"
            },
            "publisher": {
                "@type": "Organization",
                "name": "IA Guide"
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": window.location.href
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    addStructuredData();

    // Trackear scroll depth para analítica (si se necesita)
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercentage > maxScroll) {
            maxScroll = scrollPercentage;
        }
    });

    // Enviar datos cuando el usuario sale de la página
    window.addEventListener('beforeunload', function() {
        console.log(`Scroll depth: ${Math.round(maxScroll)}%`);
        // Aquí se podría enviar a un servicio de analítica
    });

    // Mejorar accesibilidad con ARIA labels dinámicos
    function improveAccessibility() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
            const heading = item.querySelector('h3');
            const content = item.querySelector('p');
            
            heading.setAttribute('role', 'button');
            heading.setAttribute('aria-expanded', 'true');
            heading.setAttribute('aria-controls', `faq-content-${index}`);
            content.setAttribute('id', `faq-content-${index}`);
        });
    }

    improveAccessibility();

    // Lazy loading para imágenes (si se añaden en el futuro)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Función para copiar enlace de sección (mejora UX)
function copySectionLink(sectionId) {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
        // Mostrar notificación temporal
        showNotification('Enlace copiado al portapapeles');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Añadir animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        color: #ffd700 !important;
        border-bottom: 2px solid #ffd700;
    }
`;
document.head.appendChild(style);
