const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/dist/index.bundle.js',
  '/dist/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // dependencies
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
];

const STATIC_CACHE = 'static-cache-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';

//  add files to cache
const addFilesToCache = async () => {
  const cache = await caches.open(STATIC_CACHE);
  await cache.addAll(FILES_TO_CACHE);
  const result = self.skipWaiting();
  return result;
};

// delete old caches
const deleteOldCaches = async (currentCaches) => {
  const cacheNames = await caches.keys();
  const cachesToDelete = cacheNames.filter(
    (cacheName) => !currentCaches.includes(cacheName),
  );
  await Promise.all(
    cachesToDelete.map((cachesToDelete) =>
      caches.delete(cachesToDelete),
    ),
  );
  const result = self.clients.claim();
  return result;
};

// ----------------------------
// responses to fetch request

// non GET requests are not cached and
// return true if complete
const handleNonGETRequest = (event) => {
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return true;
  }
  return false;
};

const fetchThenCache = async (event) => {
  const promises = [caches.open(RUNTIME_CACHE)];
  promises.push(fetch(event.request));
  const [cache, res] = await Promise.all(promises);

  await cache.put(event.request, res.clone());
  return res;
};

// handle runtime GET requests for data from /api/transaction route
// make network request and
// fallback to cache if network request fails (offline)
const getCachedResponseIfFail = async (event) => {
  try {
    const result = await fetchThenCache(event);
    return result;
  } catch (err) {
    const result = caches.match(event.request);
    return result;
  }
};

const handleTransactionRequest = (event) => {
  if (event.request.url.includes('/api/transaction')) {
    event.respondWith(getCachedResponseIfFail(event));
    return true;
  }
  return false;
};

const getCachedResponseBeforeFetch = async (event) => {
  const cachedRes = await caches.match(event.request);
  if (cachedRes) return cachedRes;

  const result = fetchThenCache(event);
  return result;
};

// use cache first for all other requests for performance
const handleOtherResponse = (event) => {
  event.respondWith(getCachedResponseBeforeFetch(event));
};

//-----------------
// set up service worker

// install phase
self.addEventListener('install', (event) => {
  event.waitUntil(addFilesToCache());
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(deleteOldCaches(currentCaches));
});

// listen to fetch event
self.addEventListener('fetch', (event) => {
  if (handleNonGETRequest(event)) return;

  if (handleTransactionRequest(event)) return;

  handleOtherResponse(event);
  return;
});
