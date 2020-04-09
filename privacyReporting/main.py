import argparse
import report

# Argsparser
parser = argparse.ArgumentParser()
parser.add_argument("-t", "--test", help="test", action="store_true")
parser.add_argument("-l", "--live", help="live", action="store_true")
parser.add_argument("-m", "--mail", help="test", action="store_true")

args = parser.parse_args()

# Check for arg
if args.test:
    data = "violation:stopplikt,location:korsvägen,timestamp:2020-04-09 11.31,position:[443;121]"
    print("TEST")
    print("Raw data: " + data)
    if args.mail:
        report.generate_report(data)
        report.generate_mail(data)
    else:
        report.generate_report(data)
elif args.live:
    data = input("Input violation data: ")
    if args.mail:
        report.generate_report(data)
        report.generate_mail(data)
    else:
        report.generate_report(data)

