let cacheName = 'covidbd-v3';

/*
 * Files to be served from cache
 */
let filesToCache = [
  './',
  './index.html',
  './scripts/main.js',
  './stylesheets/main.css',
  './manifest.json',
  './images/logo.png',
  './images/favicon.ico',
  './images/favicon-16x16.png',
  './images/favicon-32x32.png',
  './images/apple-touch-icon-152x152.png',
];

/*
 * install service worker
 */
self.addEventListener('install', (event) => {
  console.info('[ServiceWorker] Installing...');

  // e.waitUntil Delays the event until the Promise is resolved
  event.waitUntil(
    // Open the cache
    caches.open(cacheName).then((cache) => {
      // Add all the default files to the cache
      return cache
        .addAll(filesToCache)
        .then(() => {
          console.info('[ServiceWorker] Sucessfully Cached');
          return self.skipWaiting();
        })
        .catch((error) => {
          console.error('[ServiceWorker] Failed to cache', error);
        });
    })
  );
});

/*
 * activate service worker
 */
self.addEventListener('activate', (event) => {
  console.info('[ServiceWorker] Activated');

  event.waitUntil(
    // Get all the cache keys (cacheName)
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((thisCacheName) => {
            // If a cached item is saved under a previous cacheName
            if (thisCacheName !== cacheName) {
              // Delete that cached file
              console.log(
                '[ServiceWorker] Removing Cached Files from Cache - ',
                thisCacheName
              );
              return caches.delete(thisCacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

/*
 * fetch files
 */
self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetch', event.request.url);

  // e.respondWidth Responds to the fetch event
  event.respondWith(
    // Check in cache for the request being made
    caches.match(event.request).then((response) => {
      // If the request is in the cache
      if (response) {
        console.log(
          '[ServiceWorker] Found in Cache',
          event.request.url,
          response
        );
        // Return the cached version
        return response;
      }

      // If the request is NOT in the cache, fetch and cache
      var requestClone = event.request.clone();

      return fetch(requestClone)
        .then((response) => {
          if (!response) {
            console.log('[ServiceWorker] No response from fetch ')
            return response;
          }

          var responseClone = response.clone();

          // Open the cache
          caches.open(cacheName).then(function(cache) {
            // Put the fetched response in the cache
            cache.put(event.request, responseClone);
            console.log('[ServiceWorker] New Data Cached', event.request.url);

            // Return the response
            return response;
          });
        })
        .catch((err) => {
          console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
        });
    })
  );
});
