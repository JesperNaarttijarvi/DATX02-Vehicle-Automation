from datetime import datetime
from openpyxl import Workbook, load_workbook
from openpyxl.chart import (
    BarChart,
    Reference,
    Series
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
    createChart(ws)

    wb.save("Report/ViolationReport.xlsx")
    print("Report compiled")


def createChart(ws):

    chart1 = BarChart()
    chart1.type = "col"
    chart1.style = 10
    chart1.title = "Bar Chart"
    chart1.y_axis.title = 'Number of violations'
    chart1.x_axis.title = 'Area'

    cats = Reference(ws, min_col=2, min_row=1, max_row=ws.max_row)
    data = Reference(ws, min_col=1, min_row=2, max_row=ws.max_row)
    chart1.add_data(data, titles_from_data=True)
    chart1.set_categories(cats)
    chart1.shape = 4
    ws.add_chart(chart1, "G2")
