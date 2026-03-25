// Service Worker para PWA - Fase 5

const CACHE_NAME = 'ia-guide-v1';
const STATIC_CACHE = 'ia-guide-static-v1';
const DYNAMIC_CACHE = 'ia-guide-dynamic-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/analytics-config.js',
    '/performance-monitoring.js',
    '/images/ia-guide-cover.jpg',
    '/images/logo.png',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/favicon-32x32.png',
    '/favicon-16x16.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('SW: Installing');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('SW: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('SW: Activating');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('SW: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Estrategia de Cache: Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Solo procesar requests del mismo origen
    if (url.origin !== location.origin) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Si está en cache, retornar y actualizar en background
                if (cachedResponse) {
                    // Actualizar cache en background
                    fetch(request)
                        .then(response => {
                            if (response.ok) {
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => cache.put(request, response.clone()));
                            }
                        })
                        .catch(() => {
                            // Error de red, usar cache
                        });
                    
                    return cachedResponse;
                }
                
                // Si no está en cache, fetch y cache
                return fetch(request)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        
                        // Cache response para futuras visitas
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => cache.put(request, responseClone));
                        
                        return response;
                    })
                    .catch(() => {
                        // Si falla el fetch, intentar servir desde cache estático
                        return caches.match(request)
                            .then(cachedResponse => {
                                if (cachedResponse) {
                                    return cachedResponse;
                                }
                                
                                // Último recurso: página offline
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Para otros recursos, retornar error
                        return new Response('Resource not available offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Background Sync para datos offline
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('SW: Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Sincronizar datos guardados en IndexedDB
    return self.clients.matchAll()
        .then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'BACKGROUND_SYNC',
                    data: 'Sync completed'
                });
            });
        });
}

// Push Notifications (futuro)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/images/logo.png',
        badge: '/favicon-32x32.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore IA Guide',
                icon: '/images/logo.png'
            },
            {
                action: 'close',
                title: 'Close notification',
                icon: '/images/logo.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('IA Guide Update', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // Notification closed
    } else {
        // Default action - open app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Cache cleanup periódico
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CACHE_CLEANUP') {
        event.waitUntil(
            caches.open(DYNAMIC_CACHE)
                .then(cache => {
                    return cache.keys()
                        .then(keys => {
                            const keysToDelete = keys.slice(-50); // Keep last 50 items
                            return Promise.all(
                                keysToDelete.map(key => cache.delete(key))
                            );
                        });
                })
        );
    }
});

// Estrategias de cache diferentes por tipo de recurso
function getCacheStrategy(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // HTML: Network First con cache fallback
    if (pathname.endsWith('.html') || pathname === '/') {
        return 'network-first';
    }
    
    // CSS/JS: Cache First con network fallback
    if (pathname.endsWith('.css') || pathname.endsWith('.js')) {
        return 'cache-first';
    }
    
    // Images: Stale-While-Revalidate
    if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        return 'stale-while-revalidate';
    }
    
    // API: Network Only
    if (pathname.startsWith('/api/')) {
        return 'network-only';
    }
    
    // Default: Stale-While-Revalidate
    return 'stale-while-revalidate';
}

// Implementación de estrategias de cache
function handleCacheStrategy(request, strategy) {
    switch (strategy) {
        case 'network-first':
            return networkFirst(request);
        case 'cache-first':
            return cacheFirst(request);
        case 'stale-while-revalidate':
            return staleWhileRevalidate(request);
        case 'network-only':
            return networkOnly(request);
        default:
            return staleWhileRevalidate(request);
    }
}

function networkFirst(request) {
    return fetch(request)
        .then(response => {
            if (response.ok) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                    .then(cache => cache.put(request, responseClone));
            }
            return response;
        })
        .catch(() => {
            return caches.match(request);
        });
}

function cacheFirst(request) {
    return caches.match(request)
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            
            return fetch(request)
                .then(response => {
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => cache.put(request, responseClone));
                    }
                    return response;
                });
        });
}

function staleWhileRevalidate(request) {
    return caches.match(request)
        .then(cachedResponse => {
            const fetchPromise = fetch(request)
                .then(response => {
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => cache.put(request, responseClone));
                    }
                    return response;
                });
            
            // Return cached version immediately, update in background
            return cachedResponse || fetchPromise;
        });
}

function networkOnly(request) {
    return fetch(request);
}

console.log('Service Worker loaded successfully');
