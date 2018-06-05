var CACHENAME = 'my-site-step-v1';
var dataCacheName = 'my-site-v1';
var urlsToCache = [
  '/projet_restaurant/',
  '/projet_restaurant/index.html',
  '/projet_restaurant/Carte.html',
  '/projet_restaurant/Contact.html',
  '/projet_restaurant/Photo.html',
  '/projet_restaurant/Restaurants.html',
  '/projet_restaurant/assent/style.css',
  '/projet_restaurant/assent/img/fond.jpg',
  '/projet_restaurant/assent/img/images1A.jpeg',
  '/projet_restaurant/assent/img/images1B.jpeg',
  '/projet_restaurant/assent/img/images1C.jpeg',
  '/projet_restaurant/assent/img/images2A.jpeg',
  '/projet_restaurant/assent/img/images2B.jpeg',
  '/projet_restaurant/assent/img/images2C.jpeg',
  '/projet_restaurant/assent/img/images3A.jpeg',
  '/projet_restaurant/assent/img/images3B.jpeg',
  '/projet_restaurant/assent/img/images3C.jpeg',
  '/projet_restaurant/assent/img/images4A.jpeg',
  '/projet_restaurant/assent/img/images4B.jpeg',
  '/projet_restaurant/assent/img/images4C.jpeg',
  '/projet_restaurant/assent/img/images5A.jpeg',
  '/projet_restaurant/assent/img/images5B.jpeg',
  '/projet_restaurant/assent/img/images5C.jpeg',
  '/projet_restaurant/assent/img/images6A.jpeg',
  '/projet_restaurant/assent/img/images6B.jpeg',
  '/projet_restaurant/assent/img/images6C.jpeg',
  '/projet_restaurant/assent/img/images7A.jpeg',
  '/projet_restaurant/assent/img/images7B.jpeg',
  '/projet_restaurant/assent/img/images7C.jpeg',
  '/projet_restaurant/assent/js/snippet.js',
  '/projet_restaurant/assent/img/icons-192.png',
  '/projet_restaurant/assent/img/icons-512.png'
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHENAME && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
}); 
/*self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});*/

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
/*
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function (response) {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function (cache) {
              cache.put(event.request, responseToCache);
            });
          return fetch(event.request);
        }
      );
    })
  );
});

self.addEventListener('activate', function (event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
fetch(url, {
  credentials: 'include'
})
cache.addAll(urlsToPrefetch.map(function (urlToPrefetch) {
  return new Request(urlToPrefetch, {
    mode: 'no-cors'
  });
})).then(function () {
  console.log('All resources have been fetched and cached.');
});*/