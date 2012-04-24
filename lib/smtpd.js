// smtpd.js
// start a listening smtpd server, saves pdf attachements of incoming mail

// https://github.com/andris9/simplesmtp
var simplesmtp = require("simplesmtp")
// http://nodejs.org/docs/latest/api/all.html#file_System
var fs = fs = require("fs")
https://github.com/andris9/mailparser
var MailParser = require('mailparser').MailParser
http://nodejs.org/docs/latest/api/all.html#all_os_networkinterfaces
var os=require('os');

module.exports = createServer
module.exports.iplist = iplist

// port: number the port on the local machine to listen to, >1024
// folder: the folder on the local machine where attachments are saved
function createServer(port, folder) {
	var smtp = simplesmtp.createServer()
	// issue: module rai, RAIServer only emits error if it is connected
	// listen to errors when it is not connected
	smtp.SMTPServer._server.on('error', function stmpdErrorCollector(err) {
		if (!smtp.SMTPServer._server._connected) {
			throw Error('Mail server itself had an error:\n\n[ ' + (err.stack || err.toString()) + ' ]')
		}
	})
	smtp.listen(port)

	// new incoming message
	smtp.on("startData", function(envelope) {
		var messageName = getName(envelope.date)
		console.log('Message:' + messageName)
		//console.log(envelope)
		//console.log("Message from:", envelope.from)
		//console.log("Message to:", envelope.to)
		var mailparser = new MailParser({ streamAttachments: true })
		var attachmentCount = 0
		envelope.saveStream = mailparser
//		envelope.saveStream = fs.createWriteStream("/tmp/message.txt")

		mailparser.on("attachment", function(attachment) {
			if (attachment.contentType == 'application/pdf') {
				attachmentCount++
				var attachmentName = messageName
				if (attachmentCount != 1) attachmentName += '_' + attachmentCount
				 attachmentName += '.pdf'
				console.log('attachment:', attachmentName)
				var output = fs.createWriteStream(folder + '/' + attachmentName)
				attachment.stream.pipe(output)
			}
		})
	})

	smtp.on("data", function(envelope, chunk) {
		//console.log('data')
		envelope.saveStream.write(chunk)
	})

	smtp.on("dataReady", function(envelope, callback) {
		envelope.saveStream.end()
		console.log("end of message")
		callback(null, "ABC1"); // ABC1 is the queue id to be advertised to the client
	})

	smtp.on('error', function (envelope, callback) {
		console.log('error')
	})

	return smtp
}

 function getName(dateObject) {
	if (!dateObject) dateObject = Date.now()
	var now = new Date(dateObject - 60000 * new Date().getTimezoneOffset()).toISOString()
	var result = 'scan_' +
		now.substring(0, 4) + now.substring(5, 7)  + now.substring(8, 10) + '_' +
		now.substring(11, 13) + now.substring(14, 16) + now.substring(17, 19)
	return result
}

// get an array of the machines subnet ip addresses
function iplist() {
	var result = []

	// { dev: [ { address: family: internal: }]}
	var ifaces = os.networkInterfaces()
	for (var devName in ifaces) {
		ifaces[devName].forEach(function(details) {
			if (details.family == 'IPv4' &&
				!details.internal) {
				result.push(details.address)
			}
		})
	}
	return result
}
