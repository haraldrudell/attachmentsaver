# AttachmentSaver

This app saves pdf attachments to the Desktop.

If you have Dell 2335dn or other scan-to-email device, it relives the requirement of cables, usb fobs, no longer supported jurrassic operating systems such as Windows XP or any half-ready drivers  that might have been provided with your multi-function printer device.

This program also takes away the pain of entering an email subject line using a tri-tap keypad.

# How to Get It

* install from github to you machine
* run app.js
* setup your Dell 2335dn printer to sending mail to port 5000 of the machine's subnet ip
* Scans show up on your Desktop

# running

```
$ node app.js 


=== 2012-04-17 21:29:50 AttachmentSaver starting
Application AttachmentSaver on node v0.6.14 available on ips[192.168.1.15] port 5000 saving to folder /home/foxyboy/Desktop.
Message:scan_20120417_213037
attachment: scan_20120417_213037.pdf
end of message
```

# That's all folks!

Happiness!

Written by Harald Rudell in April, 2012
