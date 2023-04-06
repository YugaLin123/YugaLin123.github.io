const cacheName = "AAA";

self.addEventListener("install", e => {
  self.skipWaiting(); //異動過的程式能夠立即更新
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(["/", "/index.html", "/manifest.json"]);
    }),
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      }),
  );
});