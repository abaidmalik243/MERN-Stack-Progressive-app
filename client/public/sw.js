// importScripts('../node_modules/sw-toolbox/sw-toolbox.js')
// var cacheName = 'shell-conten';

// var DatacacheName = 'fecthData';
// var filesToCache = [


//   '/index.html',

//   '/',
// ];

// self.addEventListener('install', function (e) {
//   console.log('[ServiceWorker] Install');
//   e.waitUntil(
//     caches.open(cacheName).then(function (cache) {
//       console.log('[ServiceWorker] Caching app shell');
//       return cache.addAll(filesToCache);
//     })
//   );
// });


// // self.addEventListener('activate', function (e) {
// //   console.log('[ServiceWorker] Activate');
// //   e.waitUntil(
// //     caches.keys().then(function (keyList) {
// //       return Promise.all(keyList.map(function (key) {
// //         if (key !== cacheName) {
// //           console.log('[ServiceWorker] Removing old cache', key);
// //           return caches.delete(key);
// //         }
// //       }));
// //     })
// //   );
// //   return self.clients.claim();
// // });


// // self.addEventListener('fetch', function (e) {
// //   console.log('[ServiceWksdfljdsalfjlaorker] Fetch', e.request.url.typeOf);
// //   console.log('start url index',e.request.url.indexOf("https://api.github.com/"))
// //   if (e.request.url.indexOf("https://api.github.com/")>-1) {
// //     caches.open(DatacacheName).then(function (cache) {
// //       return fetch(e.request).then(function (response) {
// //         cache.put(e.request, response.clone())
// //         return response;
// //       })
// //     })
// //   }
// //   e.respondWith(

// //     caches.match(e.request).then(function (response) {
// //       console.log('cache load')
// //       return response || fetch(e.request);
// //     })
// //   );
// // });


// importScripts('../../node_modules/sw-toolbox/sw-toolbox.js')
// (global => {
//   'use strict';

//   // Load the sw-toolbox library.
//   // importScripts('/sw-toolbox.js');

//   // Turn on debug logging, visible in the Developer Tools' console.
//   global.toolbox.options.debug = true;

//   // Set up a handler for HTTP GET requests:
//   // - /\.ytimg\.com\// will match any requests whose URL contains 'ytimg.com'.
//   //   A narrower RegExp could be used, but just checking for ytimg.com anywhere
//   //   in the URL should be fine for this sample.
//   // - toolbox.cacheFirst let us to use the predefined cache strategy for those
//   //   requests.

//   global.toolbox.router.get('https://api.github.com', global.toolbox.cacheFirst, {
//     // Use a dedicated cache for the responses, separate from the default cache.
//     cache: {
//       name: 'youtube-thumbnails',
//       // Store up to 10 entries in that cache.
//       maxEntries: 10,
//       // Expire any entries that are older than 30 seconds.
//       maxAgeSeconds: 60 * 60 * 24 * 365
//     }
//   });

//   global.toolbox.precache(['/', '/index.html', '/bootstrap/bootstrap.min.css', '/bootstrap/jquery.min.js', '/bootstrap/bootstrap.min.js']);
//   // By default, all requests that don't match our custom handler will use the
//   // toolbox.networkFirst cache strategy, and their responses will be stored in
//   // the default cache.
//   global.toolbox.router.default = global.toolbox.networkFirst;

//   // Boilerplate to ensure our service worker takes control of the page as soon
//   // as possible.
//   global.addEventListener('install',
//     event => event.waitUntil(global.skipWaiting()));
//   global.addEventListener('activate',
//     event => event.waitUntil(global.clients.claim()));
// })(self);


(global => {
  'use strict';
  importScripts('/node_modules/sw-toolbox/sw-toolbox.js')
  // Load the sw-toolbox library.
  // importScripts('/sw-toolbox.js');

  // Turn on debug logging, visible in the Developer Tools' console.
  global.toolbox.options.debug = true;

  // Set up a handler for HTTP GET requests:
  // - /\.ytimg\.com\// will match any requests whose URL contains 'ytimg.com'.
  //   A narrower RegExp could be used, but just checking for ytimg.com anywhere
  //   in the URL should be fine for this sample.
  // - toolbox.cacheFirst let us to use the predefined cache strategy for those
  //   requests.

  global.toolbox.router.get('http://localhost:3000/', global.toolbox.cacheFirst, {
    // Use a dedicated cache for the responses, separate from the default cache.
    cache: {
      name: 'pk-olx',
      // Store up to 10 entries in that cache.
      maxEntries: 30,
      // Expire any entries that are older than 30 seconds.
      maxAgeSeconds: 60 * 60 * 24 * 365
    }
  });

  global.toolbox.precache(['/', '/index.html',
    '/bootstrap/fontawesome/css/all.min.css',
    '/bootstrap/css/bootstrap.min.css',

    '/bootstrap/jquery-3.3.1.slim.min.js',
    '/bootstrap/popper.min.js',
    '/bootstrap/js/bootstrap.min.js',
    '/static/js/bundle.js'
  ]);
  console.log('service worker loading')

  // global.addEventListener('push', e => {
  //   const data = e.data.json()
  //   console.log("push recieved")
  //   self.registration.showNotification(data.title, {
  //     body: 'Notify Me Thanks'
  //   })
  // })
  // By default, all requests that don't match our custom handler will use the
  // toolbox.networkFirst cache strategy, and their responses will be stored in
  // the default cache.
  global.toolbox.router.default = global.toolbox.networkFirst;


  const applicationServerPublicKey = '  BOlS1u1Xpb94glJEY2MgwDwt0fjiZ1COXjgRWIzvPXg7Hyb-03nqTbM8OGz4w5WpZXxQTSY8sEd925rtSmdG9Ng';
  // BKad5TvgT8qcDBafrkMlAEGmUN4tMqYMdKVmeHahnkBhVDQMYYQTW4NRGjXKtOW9UZ1LaYuR_C303wb9M-z2PyE
  /* eslint-enable max-len */
  
  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
  global.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const title = 'Push Codelab';
    const options = {
      body: 'You Have New Message',
      // icon: 'images/icon.png',
      // badge: 'images/badge.png'
    };
  
    event.waitUntil(global.registration.showNotification(title, options));
  });
  
  global.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('http://localhost:3000/loginAds')
    );
  });
  
  global.addEventListener('pushsubscriptionchange', function(event) {
    console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    event.waitUntil(
      global.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(function(newSubscription) {
        // TODO: Send to application server
        console.log('[Service Worker] New subscription: ', newSubscription);
      })
    );
  });
  








  // Boilerplate to ensure our service worker takes control of the page as soon
  // as possible.
  global.addEventListener('install',
    event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate',
    event => event.waitUntil(global.clients.claim()));
})(self);