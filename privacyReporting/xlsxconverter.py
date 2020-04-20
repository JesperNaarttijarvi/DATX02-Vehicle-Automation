from datetime import datetime
from openpyxl import Workbook, load_workbook

# Get time for file name
now = datetime.now()

def write(data):
    try:
        with open('Report/ViolationReport.xlsx'):
            wb = load_workbook("Report/ViolationReport.xlsx")
            ws = wb.active
    except IOError:
        wb = Workbook()
        ws = wb.active
        ws.title = "Violation Data"

    ws["A1"] = "Violation"
    ws["B1"] = "Location"
    ws["C1"] = "Timestamp"
    ws["D1"] = "Position"
    ws["E1"] = "Response"

    m = ws.max_row + 1
    for i in range(len(data)):
        if(data[i][1].isnumeric()):
            ws.cell(column=i + 1, row=m).value = float(data[i][1])
        else:
            ws.cell(column=i + 1, row=m).value = data[i][1]

    wb.save("Report/ViolationReport.xlsx")
    print("Report compiled")
