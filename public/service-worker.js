// Paths are relative to this file, so the app works both at the domain root
// (Capacitor: https://localhost/) and in a subfolder (GitHub Pages: /Math4Kids/).
// Bump CACHE_NAME whenever the pre-cached files change.
const CACHE_NAME = 'mental-math-v2';
const scopeUrl = (path) => new URL(path, self.registration.scope).href;
const urlsToCache = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

// Installation - pre-cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache.map(scopeUrl)))
  );
  self.skipWaiting();
});

// Activation - delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))
    )
  );
  self.clients.claim();
});

const putInCache = (request, response) => {
  if (response && response.status === 200 && response.type === 'basic') {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }
  return response;
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Pages: network first so new releases arrive, cached app shell when offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => putInCache(request, response))
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(scopeUrl('./index.html')))
        )
    );
    return;
  }

  // Assets (file names contain content hashes): cache first, network fallback
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => putInCache(request, response)))
  );
});
