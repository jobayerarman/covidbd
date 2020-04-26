/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/
var version = 'v4::';

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
  'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
  'https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css',
  'https://cdnjs.cloudflare.com/ajax/libs/social-share-kit/1.0.15/css/social-share-kit.css',
  'https://code.jquery.com/jquery-3.4.1.slim.min.js',
  'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js',
  'https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js',
  'https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/social-share-kit/1.0.15/js/social-share-kit.min.js',
  'https://platform.twitter.com/widgets.js',
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
      .then((cacheNames) => {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          cacheNames
            .filter((cache) => {
              // Filter by cache names that don't start with the latest version prefix.
              return !cache.startsWith(version);
            })
            .map((cache) => {
              /* Return a promise that's fulfilled
                when each outdated cache is deleted.
              */
              return caches.delete(cache);
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
    caches.match(event.request).then((cached) => {
      var networked = fetch(event.request)
        // We handle the network request with success and failure scenarios.
        .then(fetchedFromNetwork, unableToResolve)
        // We should catch errors on the fetchedFromNetwork handler as well.
        .catch(unableToResolve);

      /* We return the cached response immediately if there is one, and fall
          back to waiting on the network as usual.
      */
      console.log(
        '[ServiceWorker]: fetch event',
        cached ? '(cached)' : '(network)'
      );
      return cached || networked;

      function fetchedFromNetwork(response) {
        /* We copy the response before replying to the network request.
           This is the response that will be stored on the ServiceWorker cache.
        */
        var cacheCopy = response.clone();

        console.log('[ServiceWorker]: fetch response from network.');

        caches
          // We open a cache to store the response for this request.
          .open(version + 'pages')
          .then(function add(cache) {
            /* We store the response for this request. It'll later become
               available to caches.match(event.request) calls, when looking
               for cached responses.
            */
            return cache.put(event.request, cacheCopy);
          })
          .then(function () {
            console.log('[ServiceWorker]: fetch response stored in cache.');
          });

        // Return the response so that the promise is settled in fulfillment.
        return response;
      }

      /* When this method is called, it means we were unable to produce a response
         from either the cache or the network. This is our opportunity to produce
         a meaningful response even when all else fails. It's the last chance, so
         you probably want to display a "Service Unavailable" view or a generic
         error response.
      */
      function unableToResolve() {
        console.log(
          '[ServiceWorker]: fetch request failed in both cache and network.'
        );

        return new Response('<h1>Service Unavailable</h1>', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/html',
          }),
        });
      }
    })
  );
});
