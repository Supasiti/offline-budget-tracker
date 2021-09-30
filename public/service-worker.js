const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/dist/index.bundle.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

const STATIC_CACHE = 'static-cache-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';

self.addEventListener('install', (event) => {
  const addFileToCache = async () => {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(FILES_TO_CACHE);
    console.log('add files to cache completed');
    self.skipWaiting();
  };

  event.waitUntil(
    addFileToCache(),
    // caches
    //   .open(STATIC_CACHE)
    //   .then(cache => cache.addAll(FILES_TO_CACHE))
    //   .then(() => self.skipWaiting())
  );
});
