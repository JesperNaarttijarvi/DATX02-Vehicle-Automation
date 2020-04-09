import xlsxwriter
from datetime import datetime

# Get time for file name
now = datetime.now()

# Create workbook & add worksheet
filename = 'Report/ViolationReport' + now.strftime("%d%m%Y%H%M%S") + '.xlsx'
workbook = xlsxwriter.Workbook(filename)
worksheet = workbook.add_worksheet('Data')


def write(data):
    row = 0
    col = 0
    # Create column names
    worksheet.write(row, col, "Type")
    worksheet.write(row, col + 1, "Value")
    row += 1
    for type, val in (data):
        worksheet.write(row, col, type)
        worksheet.write(row, col + 1, val)
        row += 1

    workbook.close()
    print("Report generated: " + filename)
