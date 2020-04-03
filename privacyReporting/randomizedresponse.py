import math
# A = violation, B = no violation

# pi = the true probability of A in the population
# p = the probability that the spinner points to A
# Xi = 1 if the ith sample element is true, else false

# n = sample size

# P(Xi = 1) = pi*p + (1 - pi)(1 - p)
# P(Xi = 0) = (1 - pi) * p + pi * (1 - p)

def calculatelikelihood(pi, p, n):
    l1 = (pi * p + (1 - pi) * (1 - p))
    l2 = ((1 - pi) * p + pi * (1 - p))
    return math.pow(l1, n) * math.pow(l2, n)
