/* Little Creed — offline-first service worker */
const CACHE = "little-creed-v1";
const ASSETS = [
  ".",
  "index.html",
  "css/style.css",
  "js/data.js",
  "js/app.js",
  "manifest.webmanifest",
  "icons/favicon-64.png",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Cache-first for our own assets; network-first for everything else (fonts). */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(
      (hit) =>
        hit ||
        fetch(e.request)
          .then((res) => {
            const copy = res.clone();
            if (res.ok && new URL(e.request.url).origin === location.origin) {
              caches.open(CACHE).then((c) => c.put(e.request, copy));
            }
            return res;
          })
          .catch(() => caches.match("index.html"))
    )
  );
});
