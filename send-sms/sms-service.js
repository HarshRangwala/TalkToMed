const sendSMS = require('./send-sms.js')

const express = require('express')
const app = express()
app.use(express.text({type: 'application.json'}))
var port = process.env.PORT || 50000;

sendSMS.initialize();

app.post('/', (req, res) => {
    return new Promise(() => {

        const textBody = req.body;
        let parseAttempt;
        try {
            parseAttempt = JSON.parse(textBody);
        } catch (error) {
            res.status(400).send("Unable to parse JSON from request body. SMS not sent.");
            return;
        }
        const json = parseAttempt;
        
        if (!(json.PhoneNumber && json.Message)) {
            res.status(400).send("JSON Body must contain PhoneNumber and Message. SMS not sent.");
            return;
        }

        if (json.Message.length > 160) {
            res.status(400).send("Message must be no more than 160 characters. SMS not sent.");
            return;
        }
        try {
            sendSMS.send(json.PhoneNumber, json.Message);
        }
        catch (error) {
            res.status(400).send("Error while attempting to send message: " + error);
            console.log(error)
            return;
        }

        res.status(200).send("SMS sent");
    })
})

app.listen(port, () => console.log(`sms-service starting on port ${port}`));

module.exports = app;