/*global self,caches*/
var version = 'v16',
    cacheName = 'bizual-static-' + version,
    cacheFiles = [
    './'
];
//self.oninstall = function (event) {
//  'use strict';
//  event.waitUntil(
//    caches.open(cacheName).then(function (cache) {
//      return cache.addAll(cacheFiles);
//    })
//  );
//};
//self.onfetch = function (event) {
//  'use strict';
//  event.respondWith(
//    caches.match(event.request)
//  );
//};
self.onactivate = function activator (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
//        if (key !== cacheName) {
        return caches.delete(key);
//        }
      }));
    })
  );
};
