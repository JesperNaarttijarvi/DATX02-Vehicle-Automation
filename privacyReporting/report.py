def generate_report(data):
    l = clean_data(data)
    for item in l[:]:
        print(item)


def clean_data(data):
    l = data.split(" ")
    for item in l[:]:
        if item == "pos":
            l.remove(item)
    return l
