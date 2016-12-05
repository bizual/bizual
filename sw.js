/*global self,caches*/
var version = 'v17',
    cacheName = 'bizual-static-' + version,
    cacheFiles = [
    './',
    'css/all.css',
    'css/fonts/MaterialIcons-Regular.eot',
    'css/fonts/MaterialIcons-Regular.woff',
    'css/fonts/MaterialIcons-Regular.woff2',
    'css/fonts/MaterialIcons-Regular.ttf',
    'js/page.js',
    'js/material.min.js',
    'js/aceual.js',
    'js/parser.js',
    'js/intepreter.js',
    'imgs/icon.png'
];

self.oninstall = function (event) {
  'use strict';
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(cacheFiles);
    })
  );
};

self.onfetch = function (event) {
  'use strict';
  event.respondWith(
    caches.match(event.request)
  );
};

self.onactivate = function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
};
