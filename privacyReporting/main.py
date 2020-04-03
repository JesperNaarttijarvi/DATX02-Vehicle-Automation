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
    report.generateReport("stopplikt pos 443 121")