const CACHE_NAME = 'meu-site-cache-vgs';
const urlsToCache = [
    './', // Cacheia o arquivo HTML principal
    './icon-512x512.png',
    './icon-192x192.png',
    './crypto-js.min.js'
    //'./bootstrap.min.css',
    //'./bootstrap.bundle.min.js',
    //'./style.css',
    //'./script.js',
    //'./bootstrap.bundle.min.js',
    //'./bootstrap.min.css'
    
    // Adicione outros arquivos que devem ser armazenados em cache, como imagens
];

// Instala o service worker e faz o cache dos arquivos
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Arquivos em cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Ativa o service worker e limpa caches antigos, se necessário
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepta as requisições e serve os arquivos do cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Se o arquivo está em cache, retorna o cache
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
