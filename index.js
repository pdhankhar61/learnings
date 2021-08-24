/* use database to store incoming push subscription object for sending notifications later on. */

const express = require("express");
const Database = require("@replit/database");
const webpush = require('web-push');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const db = new Database();

app.get("/", (req, res) => {
	res.send("hello");
})


// passing public and private key to webpush
webpush.setVapidDetails(
	'mailto:example@yourdomain.org',
	'publicKey',
	'privateKey'
);


// api needs to be hit from Frontend
app.post('/api/save-subscription/', function(req, res) {

	return db.set("123456", req.body)
		.then(function(subscriptionId) {

			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({ data: { success: true } }));

			//sending data to service work which is runnig in browser
			webpush.sendNotification(req.body, JSON.stringify("I am Push Notification"));


		})
		.catch(function(err) {
			res.status(500);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				error: {
					id: 'unable-to-save-subscription',
					message: 'The subscription was received but we were unable to save it to our database.'
				}
			}));
		});
});




app.listen(3000, () => {
	console.log("running....");
})
