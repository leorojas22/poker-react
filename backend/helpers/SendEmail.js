const nodemailer = require("nodemailer");
const emailCredentials = require(process.cwd() + "/credentials/email.js");
let smtpConfig = {
	host: 'smtp.sendgrid.net',
	port: 465,
	secure: true,
	auth: emailCredentials
}
let email = nodemailer.createTransport(smtpConfig);

var SendEmail = function(to, from, subject, viewData, viewFilePath) {

	if(!from) {
		from = "Poker Tournament <noreply@pokertournament.com>";
	}
	
	return new Promise(function(resolve, reject) {
		var ejs = require("ejs");

		ejs.renderFile(viewFilePath, viewData, null, function(err, html) {
			if(!err) {
				email.sendMail({
					to: to,
					from: from,
					subject: subject,
					html: html
				}, function(err, results) {

					if(!err) {
						resolve();
					}
					else {
						console.log(err);
						reject(err);
					}

				});
			}
			else {
				console.log(err);
				reject(err);
			}
		});
	});

}

module.exports = SendEmail;
