// Funciones para Fase 4: Multimedia y Recursos

// Descargar recursos
function downloadResource(resourceType) {
    const resources = {
        'implementation-guide': {
            filename: 'guia-implementacion-ia.pdf',
            content: generateImplementationGuide()
        },
        'checklist-printable': {
            filename: 'checklist-ia-imprimible.pdf',
            content: generatePrintableChecklist()
        },
        'evaluation-template': {
            filename: 'template-evaluacion-ia.xlsx',
            content: generateEvaluationTemplate()
        },
        'prompting-cheatsheet': {
            filename: 'cheatsheet-prompting-ia.pdf',
            content: generatePromptingCheatsheet()
        }
    };
    
    const resource = resources[resourceType];
    if (resource) {
        const blob = new Blob([resource.content], { 
            type: resourceType.includes('pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = resource.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification(`📄 ${resource.filename} descargado correctamente`);
    }
}

// Generar contenido de recursos
function generateImplementationGuide() {
    return `Guía de Implementación de IA Responsable
==========================================

ÍNDICE:
1. Evaluación Inicial
2. Framework de Implementación
3. Mejores Prácticas
4. Monitoreo y Optimización
5. Casos de Éxito

EVALUACIÓN INICIAL:
• Análisis de necesidades específicas
• Evaluación de datos disponibles
• Análisis de riesgos éticos
• Definición de métricas de éxito

FRAMEWORK DE IMPLEMENTACIÓN:
• Fase 1: Planificación y Diseño
• Fase 2: Desarrollo y Pruebas
• Fase 3: Implementación Gradual
• Fase 4: Monitoreo Continuo

MEJORES PRÁCTICAS:
• Transparencia en algoritmos
• Supervisión humana constante
• Auditorías regulares de sesgos
• Documentación completa

MONITOREO:
• KPIs de rendimiento
• Métricas de satisfacción
• Indicadores éticos
• Feedback continuo

CASOS DE ÉXITO:
• Netflix: Personalización de contenido
• Nike: Experiencia aumentada
• Google Ads: Optimización automática
• Twitter/X: Moderación inteligente

Fecha: ${new Date().toLocaleDateString('es-ES')}
Generado por: IA Guide - www.ia-guide.com`;
}

function generatePrintableChecklist() {
    return `CHECKLIST DE IMPLEMENTACIÓN DE IA RESPONSABLE
=============================================

ANTES DE IMPLEMENTAR:
☐ ¿El problema requiere realmente IA?
☐ ¿Tenemos datos de calidad suficientes?
☐ ¿Hemos evaluado riesgos éticos?
☐ ¿Contamos con expertise técnica?

DURANTE IMPLEMENTACIÓN:
☐ ¿Estamos documentando decisiones?
☐ ¿Estamos probando con diversos usuarios?
☐ ¿Tenemos supervisión humana?
☐ ¿Estamos midiendo impacto?

DESPUÉS DEL LANZAMIENTO:
☐ ¿Monitoreamos sesgos continuamente?
☐ ¿Tenemos canales de feedback?
☐ ¿Actualizamos el sistema regularmente?
☐ ¿Reportamos transparencia?

NOTAS:
Fecha de evaluación: _______________
Responsable: _______________
Firma: _______________

Fecha: ${new Date().toLocaleDateString('es-ES')}
Generado por: IA Guide - www.ia-guide.com`;
}

function generateEvaluationTemplate() {
    return `EVALUACIÓN DE PROYECTO DE IA
=============================

DATOS DEL PROYECTO:
Nombre: _______________
Departamento: _______________
Fecha: _______________
Responsable: _______________

ANÁLISIS DE INVERSIÓN:
Inversión inicial: $_________
Costos mensuales: $_________
Costos anuales totales: $_________

BENEFICIOS ESPERADOS:
Ahorro de tiempo (horas/mes): _______________
Reducción de errores (%): _______________
Mejora de productividad (%): _______________
Satisfacción del cliente: _______________

CÁLCULO DE ROI:
Ahorro mensual estimado: $_________
ROI anual: ________%
Período de recuperación: ________ meses

RIESGOS Y MITIGACIÓN:
Riesgos identificados: _______________
Plan de mitigación: _______________
Nivel de riesgo (Bajo/Medio/Alto): _______________

EVALUACIÓN FINAL:
Viabilidad técnica: ________/10
Viabilidad económica: ________/10
Impacto estratégico: ________/10
Recomendación: _______________

Fecha: ${new Date().toLocaleDateString('es-ES')}
Generado por: IA Guide - www.ia-guide.com`;
}

function generatePromptingCheatsheet() {
    return `CHEAT SHEET: PROMPTING EFECTIVO PARA IA
=========================================

PRINCIPIOS BÁSICOS:
• Sé específico y claro
• Proporciona contexto relevante
• Define el formato de salida deseado
• Incluye ejemplos cuando sea necesario

PLANTILLAS EFECTIVAS:

1. PARA ANÁLISIS:
"Analiza [texto/documento] y extrae [información específica].
Considera [contexto relevante] y presenta el resultado en [formato]."

2. PARA CREACIÓN:
"Crea [tipo de contenido] sobre [tema].
Audiencia: [descripción de la audiencia]
Tono: [formal/informal/etc]
Longitud: [número de palabras]
Incluir: [elementos específicos]"

3. PARA RESUMEN:
"Resume el siguiente texto en [número] puntos clave:

[texto a resumir]

Enfócate en [aspectos importantes]."

4. PARA CORRECCIÓN:
"Revisa y mejora el siguiente [tipo de texto]:

[texto original]

Considera: [criterios de mejora]
Sugiere cambios específicos."

5. PARA BRAINSTORMING:
"Actúa como [rol/experto] y ayuda con [tarea].

Contexto: [información relevante]
Objetivo: [meta específica]
Limitaciones: [restricciones]"

TÉCNICAS AVANZADAS:
• Chain of Thought: "Piensa paso a paso"
• Few-shot: "Aquí tienes ejemplos: [ejemplos]"
• Role-playing: "Eres un [rol]"
• Constraints: "Sin usar [palabras prohibidas]"

ERRORES COMUNES A EVITAR:
• Preguntas demasiado vagas
• Contexto insuficiente
• Múltiples instrucciones contradictorias
• Falta de formato de salida

MEJORES PRÁCTICAS:
• Iterar y refinar prompts
• Usar variables y plantillas
• Combinar diferentes técnicas
• Validar resultados

Fecha: ${new Date().toLocaleDateString('es-ES')}
Generado por: IA Guide - www.ia-guide.com`;
}

// Reproducir videos
function playVideo(videoType) {
    const videos = {
        'intro': {
            title: 'Introducción a la IA',
            description: 'Conceptos básicos y aplicaciones actuales',
            duration: '3:20'
        },
        'cases': {
            title: 'Casos de Éxito Reales',
            description: 'Análisis de Netflix, Nike y otras empresas',
            duration: '5:45'
        },
        'risks': {
            title: 'Riesgos y Ética en IA',
            description: 'Mitigación de riesgos y consideraciones éticas',
            duration: '4:15'
        }
    };
    
    const video = videos[videoType];
    if (video) {
        // Simular reproducción de video
        showNotification(`🎥 Reproduciendo: ${video.title}`);
        
        // Aquí se integraría con un reproductor de video real
        console.log(`Video: ${video.title}`);
        console.log(`Duración: ${video.duration}`);
        console.log(`Descripción: ${video.description}`);
        
        // Simular que el video se está reproduciendo
        setTimeout(() => {
            showNotification(`✅ Video completado: ${video.title}`);
        }, 3000);
    }
}

// Calculadora de ROI
function calculateROI() {
    const investment = parseFloat(document.getElementById('investment').value) || 0;
    const employees = parseFloat(document.getElementById('employees').value) || 0;
    const hoursSaved = parseFloat(document.getElementById('hours-saved').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;
    
    if (investment <= 0 || employees <= 0 || hoursSaved <= 0 || hourlyRate <= 0) {
        showNotification('⚠️ Por favor, complete todos los campos con valores válidos');
        return;
    }
    
    // Cálculos
    const monthlySavings = employees * hoursSaved * hourlyRate;
    const annualSavings = monthlySavings * 12;
    const annualROI = ((annualSavings - investment) / investment) * 100;
    const paybackPeriod = investment / monthlySavings;
    const threeYearReturn = (annualSavings * 3) - investment;
    
    // Actualizar resultados
    document.getElementById('monthly-savings').textContent = `$${monthlySavings.toLocaleString()}`;
    document.getElementById('annual-roi').textContent = `${annualROI.toFixed(1)}%`;
    document.getElementById('payback-period').textContent = `${paybackPeriod.toFixed(1)} meses`;
    document.getElementById('three-year-return').textContent = `$${threeYearReturn.toLocaleString()}`;
    
    // Mostrar resultados
    document.getElementById('roi-results').style.display = 'block';
    
    // Dibujar gráfico simple
    drawROIChart(investment, annualSavings);
    
    showNotification('🧮 ROI calculado correctamente');
}

function drawROIChart(investment, annualSavings) {
    const canvas = document.getElementById('roi-chart-canvas');
    const ctx = canvas.getContext('2d');
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configuración
    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;
    
    // Datos para el gráfico
    const years = 3;
    const data = [
        { year: 0, value: -investment },
        { year: 1, value: annualSavings - investment },
        { year: 2, value: (annualSavings * 2) - investment },
        { year: 3, value: (annualSavings * 3) - investment }
    ];
    
    // Encontrar valores máximos y mínimos
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue;
    
    // Dibujar ejes
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Línea cero
    const zeroY = canvas.height - padding - ((0 - minValue) / range) * chartHeight;
    ctx.strokeStyle = '#6c757d';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, zeroY);
    ctx.lineTo(canvas.width - padding, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Dibujar línea de datos
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = canvas.height - padding - ((point.value - minValue) / range) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Dibujar punto
        ctx.fillStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Etiqueta
        ctx.fillStyle = '#495057';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Año ${point.year}`, x, y - 10);
        ctx.fillText(`$${point.value.toLocaleString()}`, x, y + 20);
    });
    
    ctx.stroke();
    
    // Título
    ctx.fillStyle = '#495057';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Retorno de Inversión (3 años)', canvas.width / 2, 20);
}

// Quiz interactivo
let currentQuestion = 1;
const totalQuestions = 5;
const correctAnswers = {
    'q1': 'b', // 56%
    'q2': 'b', // $128,000
    'q3': 'b', // 133 millones
    'q4': 'c', // 37%
    'q5': 'b'  // IA generativa
};

function nextQuestion() {
    // Validar respuesta actual
    const currentQuestionName = `q${currentQuestion}`;
    const selectedAnswer = document.querySelector(`input[name="${currentQuestionName}"]:checked`);
    
    if (!selectedAnswer) {
        showNotification('⚠️ Por favor, selecciona una respuesta');
        return;
    }
    
    // Guardar respuesta
    if (!window.quizAnswers) {
        window.quizAnswers = {};
    }
    window.quizAnswers[currentQuestionName] = selectedAnswer.value;
    
    // Avanzar a siguiente pregunta
    if (currentQuestion < totalQuestions) {
        document.querySelector(`.question-card[data-question="${currentQuestion}"]`).classList.remove('active');
        currentQuestion++;
        document.querySelector(`.question-card[data-question="${currentQuestion}"]`).classList.add('active');
        
        // Actualizar UI
        document.getElementById('current-question').textContent = currentQuestion;
        document.getElementById('quiz-progress').style.width = `${(currentQuestion / totalQuestions) * 100}%`;
        document.getElementById('quiz-progress').textContent = `${Math.round((currentQuestion / totalQuestions) * 100)}%`;
        
        // Actualizar botones
        document.getElementById('prev-btn').style.display = currentQuestion > 1 ? 'inline-block' : 'none';
        document.getElementById('next-btn').style.display = currentQuestion < totalQuestions ? 'inline-block' : 'none';
        document.getElementById('submit-btn').style.display = currentQuestion === totalQuestions ? 'inline-block' : 'none';
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        document.querySelector(`.question-card[data-question="${currentQuestion}"]`).classList.remove('active');
        currentQuestion--;
        document.querySelector(`.question-card[data-question="${currentQuestion}"]`).classList.add('active');
        
        // Actualizar UI
        document.getElementById('current-question').textContent = currentQuestion;
        document.getElementById('quiz-progress').style.width = `${(currentQuestion / totalQuestions) * 100}%`;
        document.getElementById('quiz-progress').textContent = `${Math.round((currentQuestion / totalQuestions) * 100)}%`;
        
        // Actualizar botones
        document.getElementById('prev-btn').style.display = currentQuestion > 1 ? 'inline-block' : 'none';
        document.getElementById('next-btn').style.display = 'inline-block';
        document.getElementById('submit-btn').style.display = 'none';
    }
}

function submitQuiz() {
    // Validar última respuesta
    const currentQuestionName = `q${currentQuestion}`;
    const selectedAnswer = document.querySelector(`input[name="${currentQuestionName}"]:checked`);
    
    if (!selectedAnswer) {
        showNotification('⚠️ Por favor, selecciona una respuesta');
        return;
    }
    
    window.quizAnswers[currentQuestionName] = selectedAnswer.value;
    
    // Calcular puntaje
    let score = 0;
    const explanations = [];
    
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = `q${i}`;
        if (window.quizAnswers[questionName] === correctAnswers[questionName]) {
            score++;
        }
        
        // Generar explicación
        const questions = [
            {
                question: '¿Qué porcentaje de empresas utilizan actualmente IA según datos de 2024?',
                correct: '56%',
                explanation: 'El 56% de líderes empresariales afirman haber adoptado IA de forma temprana o moderada según datos de 2024.'
            },
            {
                question: '¿Cuál es el salario medio de un profesional de IA en 2024?',
                correct: '$128,000',
                explanation: 'El salario medio de profesionales de IA es de $128,000 dólares anuales según estadísticas actuales.'
            },
            {
                question: '¿Cuántos nuevos puestos de trabajo se espera que cree la IA para 2030?',
                correct: '133 millones',
                explanation: 'Se estima que la IA creará 133 millones de nuevos puestos para 2030, principalmente en ciencia de datos y machine learning.'
            },
            {
                question: '¿Cuál es el crecimiento anual del mercado de IA entre 2024-2030?',
                correct: '37%',
                explanation: 'El mercado mundial de IA crece 37% anual entre 2024-2030, según proyecciones de analistas.'
            },
            {
                question: '¿Qué tecnología de IA es la más popular en empresas actualmente?',
                correct: 'IA generativa',
                explanation: 'La IA generativa es la tecnología más popular, usada por el 51% de empresas para creación de contenidos y automatización.'
            }
        ];
        
        const userAnswer = window.quizAnswers[questionName];
        const isCorrect = userAnswer === correctAnswers[questionName];
        
        explanations.push({
            question: questions[i-1].question,
            userAnswer: userAnswer,
            correct: questions[i-1].correct,
            isCorrect: isCorrect,
            explanation: questions[i-1].explanation
        });
    }
    
    // Mostrar resultados
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    // Actualizar puntaje
    document.getElementById('quiz-score').textContent = score;
    
    // Mensaje según puntaje
    let message = '';
    if (score === 5) {
        message = '¡Perfecto! Eres un experto en IA 🎉';
    } else if (score >= 3) {
        message = '¡Buen trabajo! Conoces bien el tema 👍';
    } else {
        message = 'Sigue aprendiendo sobre IA 📚';
    }
    document.getElementById('quiz-message').textContent = message;
    
    // Mostrar explicaciones
    const explanationsHtml = explanations.map(exp => `
        <div class="explanation-item ${exp.isCorrect ? 'correct' : 'incorrect'}">
            <h4>${exp.question}</h4>
            <p><strong>Tu respuesta:</strong> ${exp.userAnswer}</p>
            <p><strong>Respuesta correcta:</strong> ${exp.correct}</p>
            <p>${exp.isCorrect ? '✅ Correcto' : '❌ Incorrecto'} - ${exp.explanation}</p>
        </div>
    `).join('');
    
    document.getElementById('answer-explanations').innerHTML = explanationsHtml;
    
    showNotification(`🎯 Quiz completado: ${score}/${totalQuestions} respuestas correctas`);
}

function restartQuiz() {
    // Resetear variables
    currentQuestion = 1;
    window.quizAnswers = {};
    
    // Resetear UI
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    
    document.querySelector(`.question-card[data-question="1"]`).classList.add('active');
    document.querySelectorAll('.question-card:not([data-question="1"])').forEach(card => {
        card.classList.remove('active');
    });
    
    // Resetear contadores y botones
    document.getElementById('current-question').textContent = '1';
    document.getElementById('quiz-progress').style.width = '20%';
    document.getElementById('quiz-progress').textContent = '20%';
    document.getElementById('prev-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('submit-btn').style.display = 'none';
    
    showNotification('🔄 Quiz reiniciado');
}

// Inicializar elementos de Fase 4
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar quiz
    document.getElementById('total-questions').textContent = totalQuestions;
    
    // Agregar event listeners a inputs de calculadora
    const calculatorInputs = document.querySelectorAll('.calculator-inputs input');
    calculatorInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Validar que solo acepte números
            if (this.value && isNaN(this.value)) {
                this.value = '';
            }
        });
    });
    
    // Agregar event listeners a opciones de quiz
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Marcar el radio button cuando se hace clic en la etiqueta
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
    
    console.log('Fase 4: Elementos multimedia inicializados');
});

// Funciones para elementos interactivos - Fase 3

// Tabs functionality
function showTab(tabName) {
    // Hide all tabs
    const allPanes = document.querySelectorAll('.tab-pane');
    allPanes.forEach(pane => pane.classList.remove('active'));
    
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedPane = document.getElementById(tabName);
    if (selectedPane) {
        selectedPane.classList.add('active');
    }
    
    // Add active class to clicked button
    const activeButton = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Accordion functionality
function toggleAccordion(header) {
    const item = header.parentElement;
    const allItems = document.querySelectorAll('.accordion-item');
    
    // Close all other accordions
    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
        }
    });
    
    // Toggle current accordion
    item.classList.toggle('active');
}

// Checklist functionality
function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const checked = document.querySelectorAll('.checklist-checkbox:checked');
    const progress = Math.round((checked.length / checkboxes.length) * 100);
    
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = progress + '%';
        progressFill.textContent = progress + '%';
    }
    
    // Save progress to localStorage
    saveProgressToStorage();
}

function resetChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateProgress();
    showNotification('Checklist reiniciado');
}

function saveProgress() {
    saveProgressToStorage();
    showNotification('Progreso guardado correctamente');
}

function saveProgressToStorage() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const progress = {};
    
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('ia-checklist-progress', JSON.stringify(progress));
}

function loadProgressFromStorage() {
    const saved = localStorage.getItem('ia-checklist-progress');
    if (saved) {
        const progress = JSON.parse(saved);
        Object.keys(progress).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = progress[id];
            }
        });
        updateProgress();
    }
}

function exportResults() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox:checked');
    const total = document.querySelectorAll('.checklist-checkbox').length;
    const progress = Math.round((checkboxes.length / total) * 100);
    
    let content = 'Evaluación de Implementación de IA\n';
    content += '================================\n\n';
    content += `Progreso: ${progress}% (${checkboxes.length}/${total} items completados)\n\n`;
    content += 'Items completados:\n';
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent.trim();
        content += `✅ ${label}\n`;
    });
    
    content += '\nItems pendientes:\n';
    const unchecked = document.querySelectorAll('.checklist-checkbox:not(:checked)');
    unchecked.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent.trim();
        content += `⏳ ${label}\n`;
    });
    
    content += `\nFecha: ${new Date().toLocaleDateString('es-ES')}\n`;
    content += `Generado por: IA Guide - www.ia-guide.com`;
    
    // Create download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ia-implementation-checklist-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Resultados exportados correctamente');
}

// Notification system
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
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
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Load saved checklist progress
    loadProgressFromStorage();
    
    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    // Initialize progress
    updateProgress();
    
    // Add smooth scroll behavior for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll progress indicator
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
    
    console.log('Fase 3: Elementos interactivos inicializados');
});

// Add CSS animations
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
