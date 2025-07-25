// A simple service worker that only activates and waits
self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  return self.clients.claim();
});
