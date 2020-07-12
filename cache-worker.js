const cacheVer = '0.3';
const cacheAssets = [
  '/' ,
  '/projects',
  '/resources',
  '/resume',
  '/achievements',
  '/stylesheets/app.css',
  '/stylesheets/fonts.css',
  '/javascripts/app.js',
  '/images/light.svg',
  '/images/moon.svg'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(cacheVer)
      .then(cache => {
        cache.addAll(cacheAssets);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('sw activated');

  e.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if(cache !== cacheVer) {
              caches.delete(cache);
            }
          })
        )
      })
  )
});

self.addEventListener('fetch', e => {
  //add dynamic caching later here instead in the install

  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
