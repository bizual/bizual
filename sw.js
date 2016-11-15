
require('serviceworker-cache-polyfill');

var version = 'v2';
var staticCacheName = 'bizual-static-v2';

self.oninstall = function(event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        './',
        'css/all.css',
        'css/fonts/MaterialIcons-Regular.eot',
        'css/fonts/MaterialIcons-Regular.woff',
        'css/fonts/MaterialIcons-Regular.woff2',
        'css/fonts/MaterialIcons-Regular.ttf',
        'js/page.js',
        'js/material.min.js',
        'js/aceual.js',
        'imgs/icon.png',
      ]);
    })
  );
};

var expectedCaches = [
  staticCacheName
];

self.onactivate = function(event) {
  if (self.clients && clients.claim) {
    clients.claim();
  }

  // remove caches beginning "trains-" that aren't in
  // expectedCaches
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
};

self.onfetch = function(event) {
  var requestURL = new URL(event.request.url);

  event.respondWith(
    caches.match(event.request, {
      ignoreVary: true
    })
  );
};
