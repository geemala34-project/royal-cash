/* ROYAL CASH — Service Worker (sw.js) — website root mein rakho! */
self.addEventListener('push', function(event) {
  var data = { title: 'Royal Cash', body: 'New update!', icon: '/royal-cash-logo.png' };
  try { if (event.data) data = Object.assign(data, event.data.json()); } catch(e){}
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/royal-cash-logo.png',
      badge: '/royal-cash-logo.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
