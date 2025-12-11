const CACHE_NAME = '2048-pwa-v1.1';
const urlsToCache = [
  '/', // 根目錄
  'index.html', // 你的遊戲檔案
  'style.css', // 如果你的樣式單獨分出來
  'icon-192.png', // 確保圖標也被快取
  'icon-512.png',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有，就直接返回
        if (response) {
          return response;
        }
        // 否則，從網路獲取
        return fetch(event.request);
      })
  );

});
