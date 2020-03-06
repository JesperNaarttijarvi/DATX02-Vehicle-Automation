module.exports = {
  limit: 1000, // Limit PER dataset
  totalLimit: 0,
  categories: [
    'car',
    'truck',
    'traffic light',
    'traffic sign',
    'stop sign',
    'bus'
  ],
  darknetPath: './../../darknet',
  train: true,
  detection: false,
  segmentation: false,
  relationships: false,
  allCategoriesBoxes: false,
  showTextInBoxes: true,
  boxAttributes: false,
  segmentationFill: true,
  segmentationContour: true
}