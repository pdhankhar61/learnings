
// nodejs server to serve files

var fs = require('fs'),
	http = require('http');

// http.createServer(function(req, res) {
// 	console.log(req);
// 	fs.readFile(__dirname + req.url, function(err, data) {
// 		if (err) {
// 			res.writeHead(404);

// 			res.end(JSON.stringify(err));
// 			return;
// 		}


// 		res.writeHead(200);
// 		res.end(data);
// 	});
// }).listen(8080, () => {
// 	console.log("running....");
// });


http.createServer(function(req, res) {

	if (req.url !== '/') {
		const file_to_download = fs.createReadStream(req.url.slice(1));

		// if (file_to_download.byteRead === 0) {
		// 	file_to_download.on("error", () => {
		// 		res.end("fileNotFound");
		// 	})
		// } else {

			res.writeHead(200, { 'Content-disposition': `attachement;filename:${req.url}` })
			file_to_download.pipe(res);
		// }


	}

}).listen(8080, () => {
	console.log("running....")
})


