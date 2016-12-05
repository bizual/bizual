/*global self,caches*/
var version = 'v10';

self.oninstall = function (event) {
  console.log('install');
  'use strict';
  event.waitUntil(
    caches.open('bizual-static-' + version).then(function (cache) {
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
  console.log('fetch');
  'use strict';
  event.respondWith(
    caches.match(event.request)
  );
};

//self.onactivate = function activator (event) {
//  console.log('activate');
//  event.waitUntil(
//    caches.keys().then(function (keys) {
//      return Promise.all(keys
//        .filter(function (key) {
//          return key.indexOf(version) !== 0;
//        })
//        .map(function (key) {
//          return caches.delete(key);
//        })
//      );
//    })
//  );
//};
