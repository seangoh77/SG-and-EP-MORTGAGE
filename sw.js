// This service worker intentionally does NOT cache anything.
// Its only job is to clean up any old caches from a previous version
// and then get out of the way so the browser always fetches fresh files
// from GitHub Pages (including index.html with the latest fixes).

self.addEventListener('install', (event) => {
  // Activate immediately, don't wait for old tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// No fetch handler at all — every request goes straight to the network,
// every time. This guarantees you always see the latest deployed version.
