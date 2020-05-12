import math
import random



def coin_flip(coin_prob):
    r = random.randrange(1, 100, 1)
    if r <= 100*coin_prob:
        return True
    else:
        return False


def random_response(data, coin_prob):
    s = ""
    flip1 = coin_flip(coin_prob)
    if flip1:
        return data
    else:
        flip2 = coin_flip(coin_prob)
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
