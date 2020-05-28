# Generate violation report

Takes a string of data with parameters:
  
  * Violation type/risk
  * Location
  * Time
  * Coordinates/Position
  * Occurred

The data runs through an implementation of the *Randomized Response* algorithm

Outputs Excel (.xlsx) file summarizing the data while *preserving the privacy of individuals involved* 

## How to run from terminal
py main.py with parameters [-t, --test] [-l, --live]

  * -t generate report with dummy data (creates report in .xml format)
  * -l prompted to input violation data (creates report in .xml format)

## Testscript
Run py testScript.py, input amount of runs and coin toss probability
Outputs: the mean value of violation occurency, standard deviation

