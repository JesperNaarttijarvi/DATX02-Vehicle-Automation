import argparse
import report

# Argsparser
parser = argparse.ArgumentParser()
parser.add_argument("-t", "--test", help="Generates report with test data", action="store_true")
parser.add_argument("-l", "--live", help="Prompts user input of violation data, e.g. "
                                         "violation:stopplikt,location:varbergsvägen 5b,timestamp:2020-04-09 11.31,"
                                         "position:[443;121]", action="store_true")
parser.add_argument("-m", "--mail", help="Activates smpt mail service and sends"
                                         " mail with a brief violation summary", action="store_true")

args = parser.parse_args()

# Check for arg
if args.test:
    data = "violation:stopplikt,location:korsvägen,timestamp:2020-04-09 11.31,position:[443;121]"
    print("TEST")
    print("Raw data: " + data)
    if args.mail:
        report.generate_mail(data)
        report.generate_report(data)
    else:
        report.generate_report(data)
elif args.live:
    data = input("Input violation data: ")
    if args.mail:
        report.generate_mail(data)
        report.generate_report(data)
    else:
        report.generate_report(data)
