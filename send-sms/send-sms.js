const fs = require('fs');
const fromNumber = "+18663484479"
var client;
function initialize() {
    const keyFile = fs.readFileSync('../key.json');
    const json = JSON.parse(String(keyFile));

    // Set the environment variables. See http://twil.io/secure
    const accountSid = json.AccountSID;
    const keySID = json.KeySID;
    const keySecret = json.KeySecret;
    client = require('twilio')(keySID, keySecret, {accountSid: accountSid});
}

function send(destinationPhone, sms) {
    client.messages.create({
        "body": sms,
        "from": fromNumber,
        "to": destinationPhone
    })
    .then(message => console.log(message.sid));
}

module.exports = {initialize, send}