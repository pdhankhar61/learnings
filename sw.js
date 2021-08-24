
// service worker generating notification on push event

self.addEventListener('push', function (event) {
	if (event.data) {
		self.registration.showNotification(event.data.text(), {
			body: "Do you know him",
			icon: "https://media-exp1.licdn.com/dms/image/C5103AQHpZcfxAYeeTg/profile-displayphoto-shrink_100_100/0/1578474575067?e=1635379200&v=beta&t=wwQBkafk62bupGx0lneWA5xhgIAYtGmiWho7plsI3LM",
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