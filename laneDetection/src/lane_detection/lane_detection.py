import cv2
import numpy as np
import matplotlib.pyplot as plt
import math

def canny(image):
    grey = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    blur = cv2.GaussianBlur(grey, (5, 5), 0)
    canny = cv2.Canny(blur, 50 ,150)
    return canny

def region_of_interest(image):
    h,w = image.shape[:2]
    offset = 60 #offset
    polygons = np.array([
        [(0+offset, h), (0+offset, int(h/2)), (int(w/2), h),
        (int(w/2), int(h/2)), (0+offset, int(h/2)), (int(w/2), h)]
    ])
    mask = np.zeros_like(image)
    cv2.fillPoly(mask, polygons, 255)
    masked_image = cv2.bitwise_and(image, mask)
    return masked_image

def get_vehicle_pos(image):
    line_image = np.zeros_like(image)
    h,w = image.shape[:2]
    x  = int(w/2)
    y = h
    return (x,y)

def get_lane_pos(line, offset=170):
    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = line.reshape(4)
            x_pos, y_pos = [], []
            x_pos.append(x1 + offset)
            x_pos.append(x2 + offset)
            y_pos.append(y1)
            y_pos.append(y1)
        return np.array([np.average(x_pos), np.average(y_pos)]).astype(int)
    else:
        return None

def draw_lane_lines(image, line, color):
    lane_line = np.zeros_like(image)
    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = line.reshape(4)
            cv2.line(lane_line, (x1, y1), (x2, y2), color, 10)
    return lane_line


def draw_pid_line_vertical(image, color, y1_off, y2_off, truck=True, x_pos=0):
    vertical_pid_line = np.zeros_like(image)
    h,w = image.shape[:2]
    if truck:
        x  = int(w/2)
    else:
        x = x_pos
    y1 = h - y1_off
    y2 = h - y2_off
    cv2.line(vertical_pid_line, (x, y1), (x, y2), color, 3)
    return vertical_pid_line

def draw_pid_line_horizontal(image, color, y_off, x_off):
    horizontal_pid_line = np.zeros_like(image)
    h,w = image.shape[:2]
    y = h - y_off
    x = x_off
    cv2.line(horizontal_pid_line, (x, y), (w-x, y), color, 3)
    return horizontal_pid_line

def handle_ros(dst):
    print(dst)
    return


cap = cv2.VideoCapture("test1.mp4")
#cap = cv2.VideoCapture(1)
last_known_lane_pos = None
while(cap.isOpened()):
    _, frame = cap.read()

    # Get lane lines
    canny_frame = canny(frame)
    cropped_frame = region_of_interest(canny_frame)
    lines = cv2.HoughLinesP(cropped_frame, 10, np.pi/180, 200,
            np.array([]), minLineLength=100, maxLineGap=100)

    vehicle_pos = get_vehicle_pos(frame)
    lane_pos = get_lane_pos(lines)

    if lane_pos is None:
        if last_known_lane_pos is None:
            last_known_lane_pos = vehicle_pos
        lane_pos = last_known_lane_pos
    else:
        last_known_lane_pos = lane_pos


    distance = vehicle_pos[0] - lane_pos[0]

    # Add lines to image
    line_frame     = draw_lane_lines(frame, lines, (0,255,255))
    pid_line_frame = draw_pid_line_horizontal(frame, (100,100,100), 40, 40)
    vehicle_frame = draw_pid_line_vertical(frame, (0,0,100), 20, 60)
    avg_lane_frame = draw_pid_line_vertical(frame, (100,0,0), 30, 50, False, lane_pos[0])


    # Combine all images
    combo_frame  = cv2.addWeighted(frame, 0.5, line_frame, 1, 1)
    combo_frame1 = cv2.addWeighted(combo_frame, 1, pid_line_frame, 1, 1)
    combo_frame2 = cv2.addWeighted(combo_frame1, 1, vehicle_frame, 1, 1)
    combo_frame3 = cv2.addWeighted(combo_frame2, 1, avg_lane_frame, 1, 1)

    cv2.imshow("result", combo_frame3)
    cv2.waitKey(20)

    handle_ros(distance)

