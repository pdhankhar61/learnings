
// service worker generating notification on push event

self.addEventListener('push', function (event) {
	if (event.data) {
		self.registration.showNotification(event.data.text(), {
			body: "Do you know him",
			icon: "add your own link",
			vibrate: [200, 100, 200, 100, 200, 100, 400],
			tag: "request",
			actions: [
				{ "action": "yes", "title": "Yes", "icon": "yes.png" },
				{ "action": "no", "title": "No", "icon": "no.png" }
			]
		})

	} else {
		console.log('This push event has no data.');
	}
});
