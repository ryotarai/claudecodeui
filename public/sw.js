// Service Worker for Claude Code UI PWA
const CACHE_NAME = 'claude-ui-v1';
const scopeUrl = new URL(self.registration.scope);
const basePath = scopeUrl.pathname.endsWith('/') ? scopeUrl.pathname : `${scopeUrl.pathname}/`;
const urlsToCache = [
  new URL(basePath, scopeUrl.origin).toString(),
  new URL(`${basePath}index.html`, scopeUrl.origin).toString(),
  new URL(`${basePath}manifest.json`, scopeUrl.origin).toString()
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        // Otherwise fetch from network
        return fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
