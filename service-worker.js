
/* =========================================================
   ROYAL CASH SERVICE WORKER
   Push notifications will connect to backend later.
========================================================= */

self.addEventListener("push", (event) => {
  let data = {
    title: "Royal Cash",
    body: "A new Royal Cash offer is available.",
    url: "home.html"
  };

  if (event.data) {
    try {
      data = {
        ...data,
        ...event.data.json()
      };
    } catch (error) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "Royal Cash", {
      body: data.body || "A new offer is available.",
      icon: "royal-cash-logo.png",
      badge: "royal-cash-logo.png",
      data: {
        url: data.url || "home.html"
      }
    })
  );
});


self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl =
    event.notification.data?.url || "home.html";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {

      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
