import sender
from email.mime.text import MIMEText

def generate_report(data):
    sender.send(formatreport(data))


def formatreport(data):
    body = "Rawdata: " + data
    l = data.split(",")

    return body + "\n\nTraffic violation \"" + l[0][10:] + "\" occured in area \""\
           + l[1][9:] + "\" at approximately " + l[2][21:]
