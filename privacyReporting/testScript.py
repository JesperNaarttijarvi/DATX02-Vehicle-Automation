import main
import math
loop_range = int(input("how many runs should the test perform?"))
coin_prob = float(input("probability that coin toss returns true?"))

count = 0
subtotal = 0
numbers = []
n = 0
for i in range(loop_range):
    subtotal = subtotal + main.test(coin_prob)
    count = count + 1

mean = (subtotal / count)

subtotal_squared = 0
for i in range(len(numbers)):
    numbers[i] = pow(numbers[i] - mean, 2)
    subtotal_squared = subtotal_squared + numbers[i]

squared_mean = (subtotal_squared / count)
deviation = pow(squared_mean, (1/2.0))

print("average value reported is: ", mean)
print("deviation: ", deviation)
