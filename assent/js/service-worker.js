var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '../../fr/Accueil.html',
  '../../fr/Carte.html',
  '../../fr/Contact.html',
  '../../fr/Photo.html',
  '../../fr/Restaurants.html',
  '../../', // Alias for index.html
  '../../assent/style.css',
  '../../assent/img/fond.jpg',
  '../../assent/img/images1A.jpeg',
  '../../assent/img/images1B.jpeg',
  '../../assent/img/images1C.jpeg',
  '../../assent/img/images2A.jpeg',
  '../../assent/img/images2B.jpeg',
  '../../assent/img/images2C.jpeg',
  '../../assent/img/images3A.jpeg',
  '../../assent/img/images3B.jpeg',
  '../../assent/img/images3C.jpeg',
  '../../assent/img/images4A.jpeg',
  '../../assent/img/images4B.jpeg',
  '../../assent/img/images4C.jpeg',
  '../../assent/img/images5A.jpeg',
  '../../assent/img/images5B.jpeg',
  '../../assent/img/images5C.jpeg',
  '../../assent/img/images6A.jpeg',
  '../../assent/img/images6B.jpeg',
  '../../assent/img/images6C.jpeg',
  '../../assent/img/images7A.jpeg',
  '../../assent/img/images7B.jpeg',
  '../../assent/img/images7C.jpeg',
  '../../assent/js/snippet.js',
  '../assent/img/icons-192.png',
  '../assent/img/icons-512.png',
  '../assent/js/manifest.json',
  '../../assent/js/service-worker.js'
];
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
});