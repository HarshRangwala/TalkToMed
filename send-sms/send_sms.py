from twilio.rest import Client
from http.server import HTTPServer
import twilio.base.exceptions
import fileinput

sender_number = "+18663484479" #Number to send from
cmd_usage = "\nUsage: python3 send_sms.py <phone number> <message>\n(use quotes around message)"

account_sid = 'AC41aceb8c791063befc0bf1c71674853c'
api_key = 'SK5d51d5d15ec1e9668887a1aa5896dd1b'
api_key_secret_file = fileinput.FileInput("key.txt")

api_key_secret = api_key_secret_file.readline()
api_key_secret_file.close()



client = Client(api_key, api_key_secret, account_sid=account_sid)

# phoneNumber must be ll successive digits as int or string; so 12345678901 for 1 (234) 567-8901
# message much be string of no more than 160 characters
def sendSMS(phoneNumber, message):
    num = '+' + str(phoneNumber)
    try:
        client.messages.create(
            to=num, 
            from_=sender_number,
            body=message)
    except twilio.base.exceptions.TwilioRestException as e:
        print(e)
        return False
    else:
        return True

def BaseHTTPRequestHandler(request, client_address, server):
    print()

def run(server_class=HTTPServer, handler_class=BaseHTTPRequestHandler):
    server_address = ('SMSservice', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()


