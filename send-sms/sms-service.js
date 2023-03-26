const sendSMS = require('./send-sms.js')
const fs = require('fs')
const concernForm = fs.readFileSync('./concern-form.html').toString();

const express = require('express')
const app = express()
app.use(express.text())
var port = process.env.PORT || 3000;

sendSMS.initialize();
/*
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
}) */

app.get('/concern-form', (req, res) => {
    res.status(200).send(concernForm)
})

app.post('/concern-form', (req, res) => {
    sendSMS.send('+15403310778', "TalkToMed: One of your patients have submitted a health concern. Log in to view: https://www.talktomed.com")
    res.status(200).send("<head><style>body: {test-align: center;}</style></head><body><h3>Concern saved!</h3><h4>Your doctor has been notified</h4><a href='/concern-form'> Return</a></body>")
})

app.get('/file/:filename', (req, res) => {
    return new Promise(() => {
        const file = fs.readFileSync(req.params.filename)
        if (file) {
            res.status(200).send(file)
        }
        else {
            res.status(404).send()
        }
    })
})
app.listen(port, () => console.log(`sms-service starting on port ${port}`));

module.exports = app;