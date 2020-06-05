import main

loop_range = int(input("how many runs should the test perform?"))
coin_prob = float(input("probability that coin toss returns true?"))

mean_tot = 0
deviation_tot = 0

for x in range(20):
    count = 0
    subtotal = 0
    numbers = []
    n = 0
    for i in range(loop_range):
        n = main.test(coin_prob)

        numbers.append(n)
        subtotal = subtotal + n
        count = count + 1

    mean = (subtotal / count)

    mean_tot = mean_tot + mean

    subtotal_squared = 0
    for i in range(len(numbers)):
        numbers[i] = pow(numbers[i] - mean, 2)
        subtotal_squared = subtotal_squared + numbers[i]

    squared_mean = (subtotal_squared / count)
    deviation = pow(squared_mean, (1/2.0))

    deviation_tot = deviation_tot + deviation

    print("average value reported is: ", mean)
    print("deviation: ", deviation)

print("20 run average with a sample size: ", loop_range, "and a p = ", coin_prob,
      "\n average of occurred: ", mean_tot/20 , "\n average of occurred standard deviation: ", deviation_tot/20)
