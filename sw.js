/*global self,caches*/
self.oninstall = function (event) {
  'use strict';
  event.waitUntil(
    caches.open('bizual-static-v7').then(function (cache) {
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
        'imgs/icon.png'
      ]);
    })
  );
};

self.onfetch = function (event) {
  'use strict';
  event.respondWith(
    caches.match(event.request)
  );
};
