from datetime import datetime
from openpyxl import Workbook, load_workbook
from openpyxl.chart import (
    PieChart3D,
    Reference
)

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
        if data[i][1].isnumeric():
            ws.cell(column=i + 1, row=m).value = float(data[i][1])
        else:
            ws.cell(column=i + 1, row=m).value = data[i][1]
    # createChart(ws)

    wb.save("Report/ViolationReport.xlsx")
    print("Report compiled")


def createChart(ws):
    pie = PieChart3D()
    labels = Reference(ws, min_col=1, min_row=1, max_col=5)
    data = Reference(ws, min_col=5, min_row=2, max_row=ws.max_row)
    pie.add_data(data)
    pie.set_categories(labels)
    pie.title = "Chart"

    ws.add_chart(pie, "G1")
