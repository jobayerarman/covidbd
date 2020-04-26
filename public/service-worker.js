/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/
var version = 'v1::';

/* These resources will be downloaded and cached by the service worker
   during the installation process. If any resource fails to be downloaded,
   then the service worker won't be installed either.
*/
var filesToCache = [
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

  /* Using event.waitUntil(p) blocks the installation process on the provided
     promise. If the promise is rejected, the service worker won't be installed.
  */
  event.waitUntil(
    /* The caches built-in is a promise-based API that helps you cache responses,
       as well as finding and deleting them.
    */
    caches
      /* You can open a cache by name, and this method returns a promise. We use
         a versioned cache name here so that we can remove old cache entries in
         one fell swoop later, when phasing out an older service worker.
      */
      .open(version + 'fundamentals')
      .then((cache) => {
        /* After the cache is opened, we can fill it with the offline fundamentals.
           The method below will add all resources in `offlineFundamentals` to the
           cache, after making requests for them.
        */
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
  console.log('[ServiceWorker]: Install completed');
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
      .then((keys) => {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter((key) => {
              // Filter by keys that don't start with the latest version prefix.
              return !key.startsWith(version);
            })
            .map((key) => {
              /* Return a promise that's fulfilled
                when each outdated cache is deleted.
              */
              return caches.delete(key);
            })
        );
      })
      .then(() => {
        console.info('[ServiceWorker]: activate completed');
      })
  );
});

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
self.addEventListener('fetch', (event) => {
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
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
