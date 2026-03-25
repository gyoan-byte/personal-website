// Configuración y Tracking Avanzado - Fase 5

// Configuración de Analytics
const ANALYTICS_CONFIG = {
    googleAnalytics: {
        measurementId: 'GA_MEASUREMENT_ID',
        enableDebug: window.location.hostname === 'localhost',
        customDimensions: {
            contentSection: 'dimension1',
            userType: 'dimension2',
            engagementLevel: 'dimension3'
        }
    },
    events: {
        pageView: 'page_view',
        resourceDownload: 'resource_download',
        videoPlay: 'video_play',
        quizComplete: 'quiz_complete',
        roiCalculation: 'roi_calculation',
        checklistProgress: 'checklist_progress',
        tabSwitch: 'tab_switch',
        accordionToggle: 'accordion_toggle'
    }
};

// Sistema de Tracking Personalizado
class AnalyticsTracker {
    constructor() {
        this.sessionData = {
            startTime: Date.now(),
            pageViews: 1,
            interactions: 0,
            scrollDepth: 0,
            timeSpent: 0,
            resourcesDownloaded: [],
            videosWatched: [],
            quizScores: [],
            roiCalculations: 0
        };
        this.initializeTracking();
    }

    initializeTracking() {
        // Track page view inicial
        this.trackPageView();
        
        // Configurar scroll tracking
        this.setupScrollTracking();
        
        // Configurar time tracking
        this.setupTimeTracking();
        
        // Configurar interaction tracking
        this.setupInteractionTracking();
        
        // Track salida de página
        this.setupPageExitTracking();
        
        console.log('Analytics Tracker inicializado');
    }

    // Google Analytics 4 Events
    trackEvent(eventName, parameters = {}) {
        // Enviar a Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...parameters,
                custom_map: ANALYTICS_CONFIG.googleAnalytics.customDimensions
            });
        }
        
        // Enviar a otros servicios
        this.sendToOtherServices(eventName, parameters);
        
        // Logging para desarrollo
        if (ANALYTICS_CONFIG.googleAnalytics.enableDebug) {
            console.log('Analytics Event:', eventName, parameters);
        }
    }

    trackPageView() {
        const parameters = {
            page_title: document.title,
            page_location: window.location.href,
            content_group1: 'IA Education',
            content_group2: 'Spanish Content'
        };
        
        this.trackEvent(ANALYTICS_CONFIG.events.pageView, parameters);
    }

    trackResourceDownload(resourceType, resourceName) {
        this.sessionData.resourcesDownloaded.push({
            type: resourceType,
            name: resourceName,
            timestamp: Date.now()
        });
        
        this.trackEvent(ANALYTICS_CONFIG.events.resourceDownload, {
            resource_type: resourceType,
            resource_name: resourceName,
            total_downloads: this.sessionData.resourcesDownloaded.length
        });
    }

    trackVideoPlay(videoType, videoTitle) {
        this.sessionData.videosWatched.push({
            type: videoType,
            title: videoTitle,
            timestamp: Date.now()
        });
        
        this.trackEvent(ANALYTICS_CONFIG.events.videoPlay, {
            video_type: videoType,
            video_title: videoTitle,
            total_videos: this.sessionData.videosWatched.length
        });
    }

    trackQuizComplete(score, totalQuestions, timeSpent) {
        const scoreData = {
            score: score,
            total: totalQuestions,
            percentage: (score / totalQuestions) * 100,
            timeSpent: timeSpent,
            timestamp: Date.now()
        };
        
        this.sessionData.quizScores.push(scoreData);
        
        this.trackEvent(ANALYTICS_CONFIG.events.quizComplete, {
            quiz_score: score,
            quiz_total: totalQuestions,
            quiz_percentage: scoreData.percentage,
            quiz_time_spent: timeSpent,
            average_score: this.getAverageQuizScore()
        });
    }

    trackROICalculation(investment, monthlySavings, roi) {
        this.sessionData.roiCalculations++;
        
        this.trackEvent(ANALYTICS_CONFIG.events.roiCalculation, {
            investment_amount: investment,
            monthly_savings: monthlySavings,
            roi_percentage: roi,
            total_calculations: this.sessionData.roiCalculations
        });
    }

    trackChecklistProgress(percentage, completedItems) {
        this.trackEvent(ANALYTICS_CONFIG.events.checklistProgress, {
            progress_percentage: percentage,
            items_completed: completedItems,
            engagement_level: this.getEngagementLevel()
        });
    }

    trackTabSwitch(tabName, previousTab) {
        this.trackEvent(ANALYTICS_CONFIG.events.tabSwitch, {
            tab_name: tabName,
            previous_tab: previousTab,
            session_tabs: this.getUniqueTabsViewed()
        });
    }

    trackAccordionToggle(sectionName, isOpen) {
        this.trackEvent(ANALYTICS_CONFIG.events.accordionToggle, {
            section_name: sectionName,
            is_open: isOpen,
            interaction_type: 'accordion'
        });
    }

    // Tracking de Scroll
    setupScrollTracking() {
        let maxScroll = 0;
        const scrollThresholds = [25, 50, 75, 90];
        const thresholdsReached = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollPercentage = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            maxScroll = Math.max(maxScroll, scrollPercentage);
            this.sessionData.scrollDepth = maxScroll;
            
            // Track milestones
            scrollThresholds.forEach(threshold => {
                if (scrollPercentage >= threshold && !thresholdsReached.has(threshold)) {
                    thresholdsReached.add(threshold);
                    this.trackEvent('scroll_milestone', {
                        scroll_percentage: threshold,
                        total_scroll_depth: maxScroll
                    });
                }
            });
        });
    }

    // Tracking de Tiempo
    setupTimeTracking() {
        setInterval(() => {
            this.sessionData.timeSpent = Date.now() - this.sessionData.startTime;
            
            // Track milestones de tiempo
            const minutesSpent = Math.floor(this.sessionData.timeSpent / 60000);
            const timeMilestones = [1, 5, 10, 15, 30];
            
            timeMilestones.forEach(minute => {
                if (minutesSpent === minute) {
                    this.trackEvent('time_milestone', {
                        minutes_spent: minute,
                        total_interactions: this.sessionData.interactions
                    });
                }
            });
        }, 30000); // Cada 30 segundos
    }

    // Tracking de Interacciones
    setupInteractionTracking() {
        // Track clicks en enlaces internos
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                this.sessionData.interactions++;
                this.trackEvent('internal_link_click', {
                    link_text: link.textContent.trim(),
                    link_href: link.getAttribute('href'),
                    total_interactions: this.sessionData.interactions
                });
            }
        });

        // Track uso de formularios
        document.addEventListener('input', (e) => {
            if (e.target.matches('input[type="number"], input[type="text"], textarea')) {
                this.sessionData.interactions++;
                this.trackEvent('form_interaction', {
                    input_type: e.target.type,
                    input_name: e.target.name || 'unnamed',
                    total_interactions: this.sessionData.interactions
                });
            }
        });
    }

    // Tracking de Salida
    setupPageExitTracking() {
        window.addEventListener('beforeunload', () => {
            this.sessionData.timeSpent = Date.now() - this.sessionData.startTime;
            
            this.trackEvent('page_exit', {
                session_duration: this.sessionData.timeSpent,
                total_page_views: this.sessionData.pageViews,
                total_interactions: this.sessionData.interactions,
                scroll_depth: this.sessionData.scrollDepth,
                resources_downloaded: this.sessionData.resourcesDownloaded.length,
                videos_watched: this.sessionData.videosWatched.length,
                quiz_attempts: this.sessionData.quizScores.length,
                roi_calculations: this.sessionData.roiCalculations,
                engagement_level: this.getEngagementLevel()
            });
        });
    }

    // Métodos de Ayuda
    getEngagementLevel() {
        const interactions = this.sessionData.interactions;
        const timeSpent = this.sessionData.timeSpent;
        const scrollDepth = this.sessionData.scrollDepth;
        
        if (interactions >= 10 && timeSpent > 300000 && scrollDepth > 75) return 'high';
        if (interactions >= 5 && timeSpent > 120000 && scrollDepth > 50) return 'medium';
        return 'low';
    }

    getAverageQuizScore() {
        if (this.sessionData.quizScores.length === 0) return 0;
        const total = this.sessionData.quizScores.reduce((sum, score) => sum + score.percentage, 0);
        return Math.round(total / this.sessionData.quizScores.length);
    }

    getUniqueTabsViewed() {
        // Implementar tracking de tabs únicos vistos
        return document.querySelectorAll('.tab-btn.active').length;
    }

    sendToOtherServices(eventName, parameters) {
        // Enviar a Microsoft Clarity
        if (typeof clarity !== 'undefined') {
            clarity('event', eventName, parameters);
        }
        
        // Enviar a Hotjar
        if (typeof hj !== 'undefined') {
            hj('event', eventName);
        }
    }

    // Método para obtener insights del usuario
    getUserInsights() {
        return {
            engagementLevel: this.getEngagementLevel(),
            timeSpent: this.sessionData.timeSpent,
            interactions: this.sessionData.interactions,
            scrollDepth: this.sessionData.scrollDepth,
            resourcesDownloaded: this.sessionData.resourcesDownloaded.length,
            videosWatched: this.sessionData.videosWatched.length,
            quizScores: this.sessionData.quizScores,
            roiCalculations: this.sessionData.roiCalculations,
            averageQuizScore: this.getAverageQuizScore()
        };
    }
}

// Inicializar Analytics Tracker
let analyticsTracker;

document.addEventListener('DOMContentLoaded', function() {
    analyticsTracker = new AnalyticsTracker();
    
    // Hacer disponible globalmente para otras funciones
    window.analyticsTracker = analyticsTracker;
    
    console.log('Fase 5: Analytics y optimización avanzada inicializados');
});

// Sobrescribir funciones existentes para incluir tracking
const originalDownloadResource = window.downloadResource;
window.downloadResource = function(resourceType) {
    if (analyticsTracker) {
        analyticsTracker.trackResourceDownload(resourceType, resourceType);
    }
    return originalDownloadResource.apply(this, arguments);
};

const originalPlayVideo = window.playVideo;
window.playVideo = function(videoType) {
    if (analyticsTracker) {
        const videoTitles = {
            'intro': 'Introducción a la IA',
            'cases': 'Casos de Éxito Reales',
            'risks': 'Riesgos y Ética en IA'
        };
        analyticsTracker.trackVideoPlay(videoType, videoTitles[videoType]);
    }
    return originalPlayVideo.apply(this, arguments);
};

const originalSubmitQuiz = window.submitQuiz;
window.submitQuiz = function() {
    if (analyticsTracker && window.quizStartTime) {
        const timeSpent = Date.now() - window.quizStartTime;
        // Calcular score después de que se complete el quiz
        setTimeout(() => {
            const scoreElement = document.getElementById('quiz-score');
            const score = scoreElement ? parseInt(scoreElement.textContent) : 0;
            analyticsTracker.trackQuizComplete(score, 5, timeSpent);
        }, 100);
    }
    return originalSubmitQuiz.apply(this, arguments);
};

const originalCalculateROI = window.calculateROI;
window.calculateROI = function() {
    const investment = parseFloat(document.getElementById('investment').value) || 0;
    const employees = parseFloat(document.getElementById('employees').value) || 0;
    const hoursSaved = parseFloat(document.getElementById('hours-saved').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;
    
    if (analyticsTracker && investment > 0) {
        const monthlySavings = employees * hoursSaved * hourlyRate;
        const annualSavings = monthlySavings * 12;
        const roi = ((annualSavings - investment) / investment) * 100;
        
        analyticsTracker.trackROICalculation(investment, monthlySavings, roi);
    }
    
    return originalCalculateROI.apply(this, arguments);
};

// Track tiempo de inicio del quiz
document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('ia-quiz');
    if (quizContainer) {
        quizContainer.addEventListener('click', function(e) {
            if (e.target.matches('.answer-option, .answer-option *')) {
                if (!window.quizStartTime) {
                    window.quizStartTime = Date.now();
                }
            }
        });
    }
});

// Exportar para uso en otras partes
window.AnalyticsTracker = AnalyticsTracker;
