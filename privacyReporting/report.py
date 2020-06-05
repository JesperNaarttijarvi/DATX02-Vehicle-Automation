import sender
import xlsxconverter


def generate_report(data):
    res = [tuple(map(str, sub.split(':'))) for sub in data.split(",")]
    xlsxconverter.write(res)


def generate_mail(data):
    sender.send(format_report(data))



def format_report(data):
    l = data.split(",")
    return "\n\nTraffic violation \"" + l[0][10:] + "\" occured in area \"" \
           + l[1][9:] + "\" at approximately " + l[2][21:]
