// a mail server saving attachments
var appName = "AttachmentSaver"

console.log('\n\n=== %s %s starting',
	getNow(),
	appName)

// get parameters
var smtpdPort = process.env.SMTPDPORT || 5000
var smtpdFolder =
	process.env.SMTPDFOLDER ||
	process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/Desktop'

// launch mail server
var smtpd = require('./lib/smtpd')
var smtpServer = smtpd(smtpdPort, smtpdFolder)
var ips = smtpd.iplist()

 // yyyy-mm-dd hh:mm:ss local time
 function getNow() {
	var myDate= new Date(Date.now() - 60000 * new Date().getTimezoneOffset()).toISOString()
		myDate = myDate.substring(0, 10) + ' ' + myDate.substring(11, 19)
		return myDate
}

console.log('Application %s on node %s available on ips[%s] port %d saving to folder %s.',
	appName,
	process.version,
	ips.join(','),
	smtpdPort,
	smtpdFolder)
