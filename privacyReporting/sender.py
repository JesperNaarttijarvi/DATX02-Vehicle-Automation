import smtplib
import ssl
from email.mime.text import MIMEText

port = 465  # SSL
password = input("Password: ")

# Use a sender address of choice
sender_email = input("Sender e-mail address: ")

# Secure SSL context
context = ssl.create_default_context()


def send(m):
    receiver_email = input("Receiver email: ")
    msg = MIMEText(m.encode('utf-8'), _charset='utf-8')
    msg['Subject'] = 'Traffic violation detected'
    msg['From'] = sender_email
    msg['To'] = receiver_email

    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(sender_email, password)
        if receiver_email:
            server.sendmail(sender_email, receiver_email, msg.as_string())
            print("Mail sent to: " + receiver_email)
