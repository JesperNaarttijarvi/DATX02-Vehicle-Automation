import math
import random


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


def coin_flip():
    r = random.randrange(1, 100, 1)
    if r <= 50:
        return True
    else:
        return False


def random_response(data):
    s = ""
    flip1 = coin_flip()
    if flip1:
        return data
    else:
        flip2 = coin_flip()
        data_list = data.split(",")
        v = data_list[4].split(":")
        if flip2:
            v[1] = ":1"
        else:
            v[1] = ":0"
        data_list[4] = v[0] + v[1]
        for i in range(len(data_list)):
            s += data_list[i] + ","
        return s[:-1]
