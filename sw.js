
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.create('bizual-static-v7').then(function(cache) {
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
  );
});

self.addEventListener('fetch', function(event) {
  event.respondeWith(
    caches.match(event.request);
  );
});
