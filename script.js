
/*

publicKey - used on both server and frontend
privateKey- only used on server

you generate can these keys using https://web-push-codelab.glitch.me/
 or web-push package basically this package has been used in backend to sendNotification to browser.

 for more information  visit - https://developers.google.com/web/fundamentals/push-notifications

*/


//  initally start service worker
addEventListener('load', async () => {
	let sw = await navigator.serviceWorker.register('./sw.js');
	console.log(sw);
});


// ask for permission from user to recieve Notification
function askPermission() {
	return new Promise(function (resolve, reject) {
		const permissionResult = Notification.requestPermission(function (result) {
			resolve(result);
		});

		if (permissionResult) {
			permissionResult.then(resolve, reject);
		}
	})
		.then(function (permissionResult) {
			if (permissionResult !== 'granted') {
				throw new Error('We weren\'t granted permission.');
			} else {
				generate_push_subscription_object();
			}
		});
}


// generating push subscription object passing public key and public key is converted
const generate_push_subscription_object = async function subscribe() {
	return navigator.serviceWorker.register('/sw.js')
		.then(function (registration) {
			console.log(registration);
			const subscribeOptions = {
				userVisibleOnly: true,
				applicationServerKey:
					urlBase64ToUint8Array('add yours')
			};

			return registration.pushManager.subscribe(subscribeOptions);
		})
		.then(function (pushSubscription) {
			console.log('Received PushSubscription: ', (pushSubscription));
			sendSubscriptionToBackEnd(pushSubscription);
		});
}


// sending push subscription object to express/nodejs server
function sendSubscriptionToBackEnd(data) {
	return fetch('add your own api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(function (response) {
			if (!response.ok) {
				throw new Error('Bad status code from server.');
			}
			console.log(response);
			return response.json();
		})
		.then(function (responseData) {
			console.log(responseData);
			if (!(responseData.data && responseData.data.success)) {
				throw new Error('Bad response from server.');
			}
		});
}


// function name itself suggesting its working
function urlBase64ToUint8Array(base64String) {
	var padding = '='.repeat((4 - base64String.length % 4) % 4);
	var base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	var rawData = window.atob(base64);
	var outputArray = new Uint8Array(rawData.length);

	for (var i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
