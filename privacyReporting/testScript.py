import main

loop_range = int(input("how many runs should the test perform?"))
coin_prob = float(input("probability that coin toss returns true?"))

count = 0
subtotal = 0
for i in range(loop_range):
    subtotal = subtotal + main.test(coin_prob)
    count = count + 1

print("average value reported is: ", (subtotal / count))