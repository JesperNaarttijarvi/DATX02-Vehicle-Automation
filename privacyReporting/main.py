import argparse
import report

# Argsparser
parser = argparse.ArgumentParser()
parser.add_argument("-t", "--test", help="test", action="store_true")
parser.add_argument("-l", "--live", help="test", action="store_true")

args = parser.parse_args()

# Check for arg
if args.test:
    print("TEST")
else:
    report.generate_report("violation:stopplikt,location:korsvägen,timestamp:2020-04-09 11:31,pos:[443;121]")