// Performance Monitoring y Optimización - Fase 5

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            coreWebVitals: {},
            resourceTiming: [],
            navigationTiming: {},
            userInteractions: [],
            memoryUsage: {},
            networkInfo: {}
        };
        this.initializeMonitoring();
    }

    initializeMonitoring() {
        // Core Web Vitals
        this.monitorCoreWebVitals();
        
        // Resource Timing
        this.monitorResourceTiming();
        
        // Navigation Timing
        this.monitorNavigationTiming();
        
        // Memory Usage
        this.monitorMemoryUsage();
        
        // Network Information
        this.monitorNetworkInfo();
        
        // User Interactions
        this.monitorUserInteractions();
        
        // Performance Observer
        this.setupPerformanceObserver();
        
        console.log('Performance Monitor inicializado');
    }

    monitorCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.coreWebVitals.lcp = {
                value: lastEntry.renderTime || lastEntry.loadTime,
                element: lastEntry.element?.tagName || 'unknown',
                timestamp: lastEntry.startTime
            };
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                this.metrics.coreWebVitals.fid = {
                    value: entry.processingStart - entry.startTime,
                    eventType: entry.name,
                    timestamp: entry.startTime
                };
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.coreWebVitals.cls = {
                value: clsValue,
                timestamp: performance.now()
            };
        }).observe({ entryTypes: ['layout-shift'] });
    }

    monitorResourceTiming() {
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            this.metrics.resourceTiming = resources.map(resource => ({
                name: resource.name,
                type: this.getResourceType(resource.name),
                duration: resource.duration,
                size: resource.transferSize || 0,
                cached: resource.transferSize === 0 && resource.decodedBodySize > 0
            }));
        });
    }

    monitorNavigationTiming() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            this.metrics.navigationTiming = {
                dns: navigation.domainLookupEnd - navigation.domainLookupStart,
                tcp: navigation.connectEnd - navigation.connectStart,
                ssl: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
                ttfb: navigation.responseStart - navigation.requestStart,
                download: navigation.responseEnd - navigation.responseStart,
                domParse: navigation.domContentLoadedEventStart - navigation.responseEnd,
                domReady: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                loadComplete: navigation.loadEventEnd - navigation.loadEventStart
            };
        });
    }

    monitorMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit,
                    percentage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100,
                    timestamp: Date.now()
                };
            }, 30000); // Cada 30 segundos
        }
    }

    monitorNetworkInfo() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.metrics.networkInfo = {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData,
                type: connection.type
            };
        }
    }

    monitorUserInteractions() {
        let interactionCount = 0;
        const interactionThresholds = [10, 25, 50, 100];

        document.addEventListener('click', (e) => {
            interactionCount++;
            const interaction = {
                type: 'click',
                target: e.target.tagName,
                timestamp: Date.now(),
                position: { x: e.clientX, y: e.clientY }
            };
            this.metrics.userInteractions.push(interaction);

            // Track milestones
            interactionThresholds.forEach(threshold => {
                if (interactionCount === threshold) {
                    this.trackInteractionMilestone(threshold);
                }
            });
        });

        document.addEventListener('scroll', this.throttle(() => {
            const scrollInteraction = {
                type: 'scroll',
                scrollY: window.scrollY,
                scrollPercentage: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
                timestamp: Date.now()
            };
            this.metrics.userInteractions.push(scrollInteraction);
        }, 1000));
    }

    setupPerformanceObserver() {
        // Long Tasks
        if ('PerformanceObserver' in window) {
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    if (entry.duration > 50) { // Long task threshold
                        this.trackLongTask(entry);
                    }
                });
            }).observe({ entryTypes: ['longtask'] });
        }
    }

    // Métodos de utilidad
    getResourceType(url) {
        if (url.includes('.css')) return 'stylesheet';
        if (url.includes('.js')) return 'script';
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image';
        if (url.includes('.woff') || url.includes('.ttf')) return 'font';
        if (url.includes('/api/') || url.includes('/data/')) return 'api';
        return 'other';
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    trackLongTask(entry) {
        if (window.analyticsTracker) {
            window.analyticsTracker.trackEvent('long_task', {
                duration: entry.duration,
                start_time: entry.startTime,
                attribution: entry.attribution
            });
        }
    }

    trackInteractionMilestone(count) {
        if (window.analyticsTracker) {
            window.analyticsTracker.trackEvent('interaction_milestone', {
                interaction_count: count,
                session_duration: Date.now() - (window.analyticsTracker.sessionData?.startTime || Date.now())
            });
        }
    }

    // Métodos públicos para obtener métricas
    getCoreWebVitals() {
        return this.metrics.coreWebVitals;
    }

    getResourceTiming() {
        return this.metrics.resourceTiming;
    }

    getNavigationTiming() {
        return this.metrics.navigationTiming;
    }

    getMemoryUsage() {
        return this.metrics.memoryUsage;
    }

    getNetworkInfo() {
        return this.metrics.networkInfo;
    }

    getUserInteractions() {
        return this.metrics.userInteractions;
    }

    // Generar reporte de rendimiento
    generatePerformanceReport() {
        const report = {
            timestamp: new Date().toISOString(),
            coreWebVitals: this.getCoreWebVitals(),
            navigationTiming: this.getNavigationTiming(),
            resourceTiming: this.getResourceTiming(),
            memoryUsage: this.getMemoryUsage(),
            networkInfo: this.getNetworkInfo(),
            userInteractions: {
                total: this.getUserInteractions().length,
                clicks: this.getUserInteractions().filter(i => i.type === 'click').length,
                scrolls: this.getUserInteractions().filter(i => i.type === 'scroll').length
            },
            performance: {
                totalResources: this.getResourceTiming().length,
                cachedResources: this.getResourceTiming().filter(r => r.cached).length,
                slowResources: this.getResourceTiming().filter(r => r.duration > 1000).length,
                largeResources: this.getResourceTiming().filter(r => r.size > 1000000).length // > 1MB
            }
        };

        // Calcular scores
        report.scores = this.calculatePerformanceScores(report);
        
        return report;
    }

    calculatePerformanceScores(report) {
        const scores = {};

        // Core Web Vitals Scores
        if (report.coreWebVitals.lcp?.value) {
            scores.lcp = report.coreWebVitals.lcp.value < 2500 ? 'good' : 
                       report.coreWebVitals.lcp.value < 4000 ? 'needs-improvement' : 'poor';
        }

        if (report.coreWebVitals.fid?.value) {
            scores.fid = report.coreWebVitals.fid.value < 100 ? 'good' : 
                       report.coreWebVitals.fid.value < 300 ? 'needs-improvement' : 'poor';
        }

        if (report.coreWebVitals.cls?.value) {
            scores.cls = report.coreWebVitals.cls.value < 0.1 ? 'good' : 
                        report.coreWebVitals.cls.value < 0.25 ? 'needs-improvement' : 'poor';
        }

        // Overall Performance Score
        const vitalScores = Object.values(scores).filter(s => s !== undefined);
        if (vitalScores.length > 0) {
            const goodCount = vitalScores.filter(s => s === 'good').length;
            const totalCount = vitalScores.length;
            scores.overall = goodCount === totalCount ? 'excellent' :
                          goodCount >= totalCount * 0.66 ? 'good' :
                          goodCount >= totalCount * 0.33 ? 'needs-improvement' : 'poor';
        }

        return scores;
    }

    // Enviar reporte a analytics
    sendPerformanceReport() {
        const report = this.generatePerformanceReport();
        
        if (window.analyticsTracker) {
            window.analyticsTracker.trackEvent('performance_report', {
                lcp_score: report.scores.lcp,
                fid_score: report.scores.fid,
                cls_score: report.scores.cls,
                overall_score: report.scores.overall,
                total_resources: report.performance.totalResources,
                cached_percentage: Math.round((report.performance.cachedResources / report.performance.totalResources) * 100),
                memory_usage_percentage: report.memoryUsage.percentage || 0
            });
        }

        return report;
    }
}

// Optimización de carga dinámica
class DynamicOptimizer {
    constructor() {
        this.loadedModules = new Set();
        this.criticalResources = new Set([
            'styles.css',
            'script.js',
            'analytics-config.js'
        ]);
        this.initializeOptimization();
    }

    initializeOptimization() {
        this.setupIntersectionObserver();
        this.setupResourceHints();
        this.setupAdaptiveLoading();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadLazyContent(entry.target);
                }
            });
        }, { rootMargin: '50px' });

        // Observar elementos que necesitan carga lazy
        document.querySelectorAll('[data-lazy]').forEach(el => {
            observer.observe(el);
        });
    }

    setupResourceHints() {
        // DNS prefetch para recursos externos
        const externalDomains = [
            'https://www.googletagmanager.com',
            'https://www.clarity.ms',
            'https://static.hotjar.com'
        ];

        externalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });

        // Preconnect para dominios críticos
        const criticalDomains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        criticalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    setupAdaptiveLoading() {
        // Basado en conexión de red
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                this.enableDataSaverMode();
            } else if (connection.effectiveType === '3g') {
                this.enableReducedMode();
            }
        }

        // Basado en hardware
        if ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4) {
            this.enableReducedMode();
        }
    }

    enableDataSaverMode() {
        // Deshabilitar animaciones
        document.body.classList.add('data-saver');
        
        // Cargar imágenes de baja calidad
        document.querySelectorAll('img[data-src]').forEach(img => {
            const lowQualitySrc = img.dataset.src.replace(/\.(jpg|png|webp)$/i, '-low.$1');
            img.dataset.src = lowQualitySrc;
        });
        
        console.log('Data saver mode enabled');
    }

    enableReducedMode() {
        // Reducir calidad de imágenes
        document.querySelectorAll('img[data-src]').forEach(img => {
            const reducedSrc = img.dataset.src.replace(/\.(jpg|png|webp)$/i, '-medium.$1');
            img.dataset.src = reducedSrc;
        });
        
        // Simplificar animaciones
        document.body.classList.add('reduced-motion');
        
        console.log('Reduced mode enabled');
    }

    loadLazyContent(element) {
        if (element.dataset.lazy === 'image') {
            this.loadLazyImage(element);
        } else if (element.dataset.lazy === 'module') {
            this.loadLazyModule(element);
        }
    }

    loadLazyImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.removeAttribute('data-lazy');
        }
    }

    async loadLazyModule(container) {
        const moduleName = container.dataset.module;
        if (!this.loadedModules.has(moduleName)) {
            try {
                const module = await import(`./modules/${moduleName}.js`);
                this.loadedModules.add(moduleName);
                module.init(container);
            } catch (error) {
                console.error(`Failed to load module ${moduleName}:`, error);
            }
        }
    }
}

// Inicializar sistemas de monitoreo y optimización
let performanceMonitor;
let dynamicOptimizer;

document.addEventListener('DOMContentLoaded', function() {
    performanceMonitor = new PerformanceMonitor();
    dynamicOptimizer = new DynamicOptimizer();
    
    // Enviar reporte de performance cada 5 minutos
    setInterval(() => {
        if (performanceMonitor) {
            performanceMonitor.sendPerformanceReport();
        }
    }, 300000);
    
    // Hacer disponibles globalmente
    window.performanceMonitor = performanceMonitor;
    window.dynamicOptimizer = dynamicOptimizer;
    
    console.log('Fase 5: Performance monitoring y optimización inicializados');
});

// Exportar para uso en otras partes
window.PerformanceMonitor = PerformanceMonitor;
window.DynamicOptimizer = DynamicOptimizer;
