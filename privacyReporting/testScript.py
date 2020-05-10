import main
loop_range = int(input("how many runs should the test perform?"))

count = 0
subtotal = 0
for i in range(loop_range):
    subtotal = subtotal + main.test()
    count = count + 1

print("average value reported is: ", (subtotal / count))