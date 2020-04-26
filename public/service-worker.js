let cacheName = 'covidbd-v3';

/*
 * Files to be served from cache
 */
let filesToCache = [
  './',
  './scripts/main.js',
  './stylesheets/main.css',
  './manifest.json',
  './images/logo.png',
  './images/favicon.ico',
  './images/favicon-16x16.png',
  './images/favicon-32x32.png',
  './images/apple-touch-icon-152x152.png',
];

/* The install event fires when the service worker is first installed.
   You can use this event to prepare the service worker to be able to serve
   files while visitors are offline.
*/
self.addEventListener('install', (event) => {
  console.info('[ServiceWorker]: Installing...');

  // e.waitUntil Delays the event until the Promise is resolved
  event.waitUntil(
    // Open the cache
    caches.open(cacheName).then((cache) => {
      // Add all the default files to the cache
      return cache
        .addAll(filesToCache)
        .then(() => {
          console.info('[ServiceWorker]: Sucessfully Cached');
          return self.skipWaiting();
        })
        .catch((error) => {
          console.error('[ServiceWorker]: Failed to cache', error);
        });
    })
  );
});

/* The activate event fires after a service worker has been successfully installed.
   It is most useful when phasing out an older version of a service worker, as at
   this point you know that the new worker was installed correctly. In this example,
   we delete old caches that don't match the version in the worker we just finished
   installing.
*/
self.addEventListener('activate', (event) => {
  /* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
  */
  console.info('[ServiceWorker]: activate event in progress');

  event.waitUntil(
    // Get all the cache keys (cacheName)
    caches
      .keys()
      .then((cacheNames) => {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          cacheNames.map((thisCacheName) => {
            // If a cached item is saved under a previous cacheName
            if (thisCacheName !== cacheName) {
              // Delete that cached file
              console.log(
                '[ServiceWorker]: Removing Cached Files from Cache - ',
                thisCacheName
              );
              return caches.delete(thisCacheName);
            }
          })
        );
      })
      .then(() => {
        console.info('[ServiceWorker]: activate completed');
        return self.clients.claim();
      })
  );
});

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker]: Fetch', event.request.url);

  /* We should only cache GET requests, and deal with the rest of method in the
     client-side, by handling failed POST,PUT,PATCH,etc. requests.
  */
  if (event.request.method !== 'GET') {
    /* If we don't block the event as shown below, then the request will go to
      the network as usual.
    */
    console.log(
      '[ServiceWorker]: fetch event ignored.',
      event.request.method,
      event.request.url
    );
    return;
  }

  /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
     Fulfillment result will be used as the response, and rejection will end in a
     HTTP response indicating failure.
  */
  event.respondWith(
    /* This method returns a promise that resolves to a cache entry matching
       the request. Once the promise is settled, we can then provide a response
       to the fetch request.
    */
    caches.match(event.request).then((cached) => {
      // If the request is in the cache
      if (cached) {
        console.log(
          '[ServiceWorker]: Found in Cache',
          event.request.url,
          cached
        );
        // Return the cached version
        return cached;
      }

      // If the request is NOT in the cache, fetch and cache
      var requestClone = event.request.clone();

      return fetch(requestClone)
        .then((response) => {
          if (!response) {
            console.log('[ServiceWorker]: No response from fetch ');
            return response;
          }

          var responseClone = response.clone();

          // Open the cache
          caches.open(cacheName).then((cache) => {
            // Put the fetched response in the cache
            cache.put(event.request, responseClone);
            console.log('[ServiceWorker]: New Data Cached', event.request.url);

            // Return the response
            return response;
          });
        })
        .catch((err) => {
          console.log(
            '[ServiceWorker]: Error Fetching & Caching New Data',
            err
          );
        });
    })
  );
});
