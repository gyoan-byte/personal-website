// GEO Optimization - Generative Engine Optimization
// Optimización para motores de búsqueda basados en IA (ChatGPT, Gemini, Claude, etc.)

class GEOOptimizer {
    constructor() {
        this.entityRecognition = {
            companies: ['Netflix', 'Nike', 'Google', 'Twitter', 'Duolingo', 'Uber', 'Airbnb'],
            technologies: ['ChatGPT', 'GPT-4o', 'DALL-E', 'Machine Learning', 'Deep Learning', 'NLP'],
            concepts: ['IA generativa', 'inteligencia artificial', 'machine learning', 'deepfakes', 'sesgos algorítmicos'],
            metrics: ['56%', '37%', '15.7 billones', '133 millones', '$128,000', '184,000 millones'],
            locations: ['España', 'Europa', 'América Latina', 'Global']
        };
        
        this.contextualQueries = this.generateContextualQueries();
        this.initializeGEOTracking();
    }

    generateContextualQueries() {
        return {
            // Queries que los usuarios harían a ChatGPT, Gemini, etc.
            implementation: [
                "cómo implementar IA en mi empresa paso a paso",
                "guía para usar inteligencia artificial responsablemente",
                "qué empresas usan IA con éxito casos reales",
                "cuánto cuesta implementar IA en una empresa",
                "mejores prácticas para IA generativa en negocios"
            ],
            risks: [
                "peligros de la inteligencia artificial 2024",
                "cómo protegerse de deepfakes y IA maliciosa",
                "riesgos éticos de la IA en empresas",
                "sesgos algorítmicos cómo detectarlos y evitarlos",
                "impacto de la IA en el empleo real o mito"
            ],
            benefits: [
                "ventajas reales de usar IA en empresas",
                "roi de implementación de inteligencia artificial",
                "cuánto dinero se puede ahorrar con IA",
                "mejoras en productividad con IA datos reales",
                "casos de éxito de IA que generaron dinero"
            ],
            learning: [
                "cómo aprender a usar IA y ChatGPT profesionalmente",
                "mejores cursos y recursos para aprender IA",
                "skills necesarios para trabajar en inteligencia artificial",
                "cómo convertirse en profesional de IA",
                "prompt engineering técnicas avanzadas"
            ]
        };
    }

    initializeGEOTracking() {
        // Track qué preguntas GEO están siendo respondidas
        this.trackGEOQueries();
        
        // Optimizar contenido para entity recognition
        this.optimizeForEntityRecognition();
        
        // Añadir structured data para GEO
        this.addGEOStructuredData();
        
        // Implementar contextual SEO
        this.implementContextualSEO();
    }

    trackGEOQueries() {
        // Detectar si el usuario viene de un motor de búsqueda basado en IA
        const referrer = document.referrer;
        const isAISearch = this.detectAISearchEngine(referrer);
        
        if (isAISearch) {
            this.trackAISearchVisit(referrer);
        }
        
        // Track scroll depth para entender qué contenido GEO es más valioso
        this.trackGEOEngagement();
    }

    detectAISearchEngine(referrer) {
        const aiSearchEngines = [
            'chat.openai.com',
            'chatgpt.com',
            'gemini.google.com',
            'claude.ai',
            'bard.google.com',
            'perplexity.ai',
            'you.com',
            'poe.com'
        ];
        
        return aiSearchEngines.some(engine => referrer.includes(engine));
    }

    trackAISearchVisit(source) {
        if (window.analyticsTracker) {
            window.analyticsTracker.trackEvent('ai_search_visit', {
                search_engine: source,
                page_type: 'geo_optimized_content',
                content_depth: this.getContentDepth()
            });
        }
    }

    trackGEOEngagement() {
        let maxScroll = 0;
        let timeSpent = 0;
        const startTime = Date.now();
        
        window.addEventListener('scroll', () => {
            const scrollPercentage = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            maxScroll = Math.max(maxScroll, scrollPercentage);
            
            // Track engagement milestones
            if (scrollPercentage === 25 || scrollPercentage === 50 || 
                scrollPercentage === 75 || scrollPercentage === 90) {
                this.trackGEOMilestone(scrollPercentage);
            }
        });
        
        window.addEventListener('beforeunload', () => {
            timeSpent = Date.now() - startTime;
            this.trackGEOSession(maxScroll, timeSpent);
        });
    }

    trackGEOMilestone(scrollPercentage) {
        if (window.analyticsTracker) {
            window.analyticsTracker.trackEvent('geo_engagement_milestone', {
                scroll_percentage: scrollPercentage,
                content_sections: this.getVisibleSections(),
                engagement_type: 'geo_content'
            });
        }
    }

    trackGEOSession(maxScroll, timeSpent) {
        if (window.analyticsTracker) {
            window.analyticsTracker.trackEvent('geo_session_complete', {
                max_scroll_depth: maxScroll,
                time_spent_ms: timeSpent,
                content_value: this.calculateContentValue(maxScroll, timeSpent),
                entities_mentioned: this.getMentionedEntities()
            });
        }
    }

    optimizeForEntityRecognition() {
        // Añadir microdata para entity recognition
        this.addEntityMicrodata();
        
        // Optimizar headings para entity recognition
        this.optimizeHeadingsForEntities();
        
        // Añadir context clues para IA
        this.addContextClues();
    }

    addEntityMicrodata() {
        const entities = this.entityRecognition;
        
        // Marcar empresas mencionadas
        entities.companies.forEach(company => {
            this.wrapEntityWithMicrodata(company, 'Organization');
        });
        
        // Marcar tecnologías mencionadas
        entities.technologies.forEach(tech => {
            this.wrapEntityWithMicrodata(tech, 'Technology');
        });
        
        // Marcar métricas importantes
        entities.metrics.forEach(metric => {
            this.wrapEntityWithMicrodata(metric, 'QuantitativeValue');
        });
    }

    wrapEntityWithMicrodata(entity, type) {
        const content = document.body.innerHTML;
        const regex = new RegExp(`\\b${entity}\\b`, 'gi');
        
        if (regex.test(content)) {
            const replacement = `<span itemprop="${type}">${entity}</span>`;
            document.body.innerHTML = content.replace(regex, replacement);
        }
    }

    optimizeHeadingsForEntities() {
        const headings = document.querySelectorAll('h2, h3, h4');
        
        headings.forEach(heading => {
            const text = heading.textContent;
            const entities = this.extractEntitiesFromText(text);
            
            if (entities.length > 0) {
                // Añadir entidades como keywords para mejor entity recognition
                heading.setAttribute('data-entities', entities.join(','));
            }
        });
    }

    extractEntitiesFromText(text) {
        const entities = [];
        const allEntities = [
            ...this.entityRecognition.companies,
            ...this.entityRecognition.technologies,
            ...this.entityRecognition.concepts,
            ...this.entityRecognition.metrics
        ];
        
        allEntities.forEach(entity => {
            if (text.toLowerCase().includes(entity.toLowerCase())) {
                entities.push(entity);
            }
        });
        
        return entities;
    }

    addContextClues() {
        // Añadir contexto para ayudar a los motores de IA a entender el propósito del contenido
        const contextDiv = document.createElement('div');
        contextDiv.style.display = 'none';
        contextDiv.setAttribute('data-context', 'geo-optimization');
        
        contextDiv.innerHTML = `
            <meta itemprop="about" content="guía completa de inteligencia artificial">
            <meta itemprop="audience" content="empresas, profesionales, estudiantes">
            <meta itemprop="educationalLevel" content="intermedio a avanzado">
            <meta itemprop="learningResourceType" content="guía práctica">
            <meta itemprop="timeRequired" content="PT30M">
            <meta itemprop="dateCreated" content="2024-03-25">
            <meta itemprop="dateModified" content="2024-03-25">
            <meta itemprop="inLanguage" content="es">
            <meta itemprop="isAccessibleForFree" content="true">
        `;
        
        document.head.appendChild(contextDiv);
    }

    addGEOStructuredData() {
        // Añadir structured data específico para motores de búsqueda basados en IA
        const geoScript = document.createElement('script');
        geoScript.type = 'application/ld+json';
        geoScript.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Guía Completa de Inteligencia Artificial 2024",
            "description": "Guía exhaustiva sobre implementación de IA, casos de éxito reales, riesgos documentados, mejores prácticas y oportunidades profesionales. Contenido optimizado para empresas y profesionales.",
            "educationalLevel": "Intermediate to Advanced",
            "learningResourceType": "Guide",
            "audience": {
                "@type": "EducationalAudience",
                "educationalRole": ["student", "professional", "business_owner"]
            },
            "about": [
                {
                    "@type": "Thing",
                    "name": "Inteligencia Artificial",
                    "description": "Tecnología que permite a las máquinas simular capacidades humanas"
                },
                {
                    "@type": "Thing", 
                    "name": "Machine Learning",
                    "description": "Subconjunto de IA que permite a los sistemas aprender de datos"
                },
                {
                    "@type": "Thing",
                    "name": "IA Generativa",
                    "description": "IA que puede crear contenido original como texto, imágenes y código"
                }
            ],
            "mentions": [
                "Netflix", "Nike", "Google", "Twitter/X", "Duolingo", "ChatGPT", "GPT-4o"
            ],
            "teaches": [
                "Implementación responsable de IA",
                "Casos de éxito empresarial con IA",
                "Mitigación de riesgos y sesgos",
                "Buenas prácticas en IA generativa",
                "Desarrollo profesional en IA",
                "Cálculo de ROI de proyectos de IA"
            ],
            "keywords": [
                "inteligencia artificial", "IA", "machine learning", "IA generativa",
                "ChatGPT", "implementación IA", "casos de éxito IA", "riesgos IA",
                "guía IA 2024", "mejores prácticas IA", "ética IA", "empresas IA"
            ],
            "dateCreated": "2024-03-25T00:00:00+00:00",
            "dateModified": "2024-03-25T00:00:00+00:00",
            "author": {
                "@type": "Organization",
                "name": "IA Guide",
                "url": "https://localhost:8000"
            },
            "publisher": {
                "@type": "Organization",
                "name": "IA Guide",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://localhost:8000/images/logo.png"
                }
            }
        });
        
        document.head.appendChild(geoScript);
    }

    implementContextualSEO() {
        // Añadir FAQs que responden directamente a queries de usuarios de IA
        this.addGEOFAQs();
        
        // Optimizar para featured snippets
        this.optimizeForFeaturedSnippets();
        
        // Añadir "People Also Ask" structure
        this.addPAAAStructure();
    }

    addGEOFAQs() {
        const geoFAQs = [
            {
                question: "¿Cómo implementar IA en mi empresa paso a paso?",
                answer: "Para implementar IA en tu empresa: 1) Evalúa necesidades específicas, 2) Reúne datos de calidad, 3) Elige la tecnología adecuada (ChatGPT, ML, etc.), 4) Comienza con proyectos piloto, 5) Escala gradualmente, 6) Monitoriza resultados y ajusta. Empresas como Netflix y Nike demuestran que un enfoque gradual reduce riesgos y maximiza ROI."
            },
            {
                question: "Cuánto cuesta implementar IA en una empresa?",
                answer: "Los costos varían según el proyecto: desde $10,000 para chatbots básicos hasta $500,000+ para sistemas complejos. El 49% de empresas invierte hasta 20% de su presupuesto tecnológico en IA. El ROI promedio es de 250% en 3 años, con recuperación de inversión en 6-18 meses para la mayoría de proyectos."
            },
            {
                question: "Qué empresas usan IA con éxito casos reales?",
                answer: "Netflix usa IA para personalización (80% de contenido descubierto), Nike para experiencia aumentada con realidad virtual, Google Ads optimiza campañas (15% más clics), Twitter/X combate contenido dañino (300,000 cuentas eliminadas), Duolingo revolucionó aprendizaje con chatbots (35,000 usuarios primer mes). Estos casos demuestran ROI medible y transformación real."
            },
            {
                question: "Cómo protegerse de deepfakes y riesgos de IA?",
                answer: "Para protegerse de deepfakes: 1) Usa herramientas de verificación de contenido, 2) Implementa políticas de seguridad estrictas, 3) Educa al personal sobre riesgos, 4) Usa marcas de agua digitales, 5) Monitorea menciones de tu marca, 6) Ten planes de respuesta a incidentes. España ya tiene condenas por deepfakes, mostrando seriedad del problema."
            },
            {
                question: "Qué skills necesito para trabajar en IA?",
                answer: "Skills clave para IA: 1) Programación (Python, R), 2) Machine Learning frameworks (TensorFlow, PyTorch), 3) Estadística y matemáticas, 4) Conocimiento del dominio, 5) Ethics y governance, 6) Prompt engineering. El salario promedio es $128,000 anuales y se crearán 133 millones de empleos para 2030."
            }
        ];

        // Añadir estas FAQs al schema FAQ existente
        const faqContainer = document.querySelector('.faq-section');
        if (faqContainer) {
            geoFAQs.forEach((faq, index) => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item geo-faq';
                faqItem.innerHTML = `
                    <h3>${faq.question}</h3>
                    <p>${faq.answer}</p>
                `;
                faqContainer.appendChild(faqItem);
            });
        }
    }

    optimizeForFeaturedSnippets() {
        // Estructurar contenido para featured snippets
        const steps = [
            "Evaluar necesidades específicas",
            "Reunir datos de calidad",
            "Elegir tecnología adecuada",
            "Comenzar con proyectos piloto",
            "Escalar gradualmente",
            "Monitorizar y ajustar"
        ];

        const stepsSection = document.createElement('section');
        stepsSection.className = 'featured-snippet-steps';
        stepsSection.innerHTML = `
            <h2>Cómo Implementar IA en tu Empresa en 6 Pasos</h2>
            <ol>
                ${steps.map((step, index) => `<li><strong>Paso ${index + 1}:</strong> ${step}</li>`).join('')}
            </ol>
            <p><strong>Resultado:</strong> Implementación exitosa con ROI de 250% en 3 años según McKinsey.</p>
        `;

        // Insertar después de la sección de prácticas
        const practicesSection = document.getElementById('practicas');
        if (practicesSection) {
            practicesSection.parentNode.insertBefore(stepsSection, practicesSection.nextSibling);
        }
    }

    addPAAAStructure() {
        // Añadir estructura "People Also Ask"
        const paaSection = document.createElement('section');
        paaSection.className = 'paa-questions';
        paaSection.innerHTML = `
            <h2>Preguntas Relacionadas que También se Hacen</h2>
            <div class="paa-grid">
                <div class="paa-item">
                    <h4>¿Qué porcentaje de empresas usa IA en 2024?</h4>
                    <p>El 56% de líderes empresariales ya adoptan IA, con 42% usando chatbots y 51% IA generativa.</p>
                </div>
                <div class="paa-item">
                    <h4>¿Cuál es el salario de un profesional de IA?</h4>
                    <p>$128,000 anuales en promedio, 40% superior al sector tecnológico general.</p>
                </div>
                <div class="paa-item">
                    <h4>¿Cuántos empleos creará la IA?</h4>
                    <p>Se crearán 133 millones de empleos para 2030, principalmente en ciencia de datos y ML.</p>
                </div>
                <div class="paa-item">
                    <h4>¿Cómo empezar a usar ChatGPT profesionalmente?</h4>
                    <p>Aprende prompt engineering, usa prompts específicos, valida respuestas y personaliza según tu industria.</p>
                </div>
            </div>
        `;

        // Insertar antes del footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.parentNode.insertBefore(paaSection, footer);
        }
    }

    // Métodos de ayuda para tracking
    getContentDepth() {
        const sections = document.querySelectorAll('section[id]');
        return sections.length;
    }

    getVisibleSections() {
        const sections = document.querySelectorAll('section[id]');
        const visible = [];
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                visible.push(section.id);
            }
        });
        
        return visible.join(',');
    }

    calculateContentValue(maxScroll, timeSpent) {
        // Calcular valor del contenido basado en engagement
        const scrollWeight = maxScroll / 100;
        const timeWeight = Math.min(timeSpent / 300000, 1); // 5 minutos = 100%
        return Math.round((scrollWeight * 0.6 + timeWeight * 0.4) * 100);
    }

    getMentionedEntities() {
        const content = document.body.textContent.toLowerCase();
        const mentioned = [];
        
        Object.values(this.entityRecognition).flat().forEach(entity => {
            if (content.includes(entity.toLowerCase())) {
                mentioned.push(entity);
            }
        });
        
        return mentioned.join(',');
    }
}

// Inicializar GEO Optimization
document.addEventListener('DOMContentLoaded', function() {
    const geoOptimizer = new GEOOptimizer();
    
    // Hacer disponible globalmente
    window.geoOptimizer = geoOptimizer;
    
    console.log('GEO Optimization inicializado para motores de búsqueda basados en IA');
});

// Exportar para uso en otras partes
window.GEOOptimizer = GEOOptimizer;
