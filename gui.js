// dat GUI instance
let gui;

// Setting values for dat GUI
const QRCodeOptionsDefault = {};
const QRCodeOptions = new Object();

const utilities = {
  Init: () => {
    initializeSettings();
  },
  Download: () => {
    saveImage(gQRGraphic);
  },
};

const prepareDatGUI = (opt) => {
  gui = new dat.GUI({ closeOnTop: true });
  const optionFolder = gui.addFolder('QR Code Options');

  // Set initial values
  QRCodeOptionsDefault.width = opt.width;
  // QRCodeOptionsDefault.height = opt.height;
  QRCodeOptionsDefault.targetData = opt.targetData;
  QRCodeOptionsDefault.errorCorrectionLevel = opt.errorCorrectionLevel;
  QRCodeOptionsDefault.margin = opt.margin;
  QRCodeOptionsDefault.bgColor = opt.bgColor;
  QRCodeOptionsDefault.bgAlpha = opt.bgAlpha;
  QRCodeOptionsDefault.cellColor = opt.cellColor;
  initializeSettings();

  const step = 1;
  optionFolder.add(QRCodeOptions, 'width', 1, 720, step);
  // optionFolder.add(QRCodeOptions, 'height', 1, 720, step);
  optionFolder.add(QRCodeOptions, 'targetData');
  optionFolder.add(QRCodeOptions, 'errorCorrectionLevel', {
    H: 'H',
    Q: 'Q',
    M: 'M',
    L: 'L',
  });
  optionFolder.add(QRCodeOptions, 'margin', 0, 20, step);
  optionFolder.addColor(QRCodeOptions, 'bgColor');
  optionFolder.add(QRCodeOptions, 'bgAlpha', 0, 255, step);
  optionFolder.addColor(QRCodeOptions, 'cellColor');
  optionFolder.open();

  //  -- Utilities
  gui.add(utilities, 'Init');
  gui.add(utilities, 'Download');
};

// Initialize with default values
const initializeSettings = () => {
  QRCodeOptions.width = QRCodeOptionsDefault.width;
  // QRCodeOptions.height = QRCodeOptionsDefault.height;
  QRCodeOptions.targetData = QRCodeOptionsDefault.targetData;
  QRCodeOptions.errorCorrectionLevel = QRCodeOptionsDefault.errorCorrectionLevel;
  QRCodeOptions.margin = QRCodeOptionsDefault.margin;
  QRCodeOptions.bgColor = QRCodeOptionsDefault.bgColor;
  QRCodeOptions.bgAlpha = QRCodeOptionsDefault.bgAlpha;
  QRCodeOptions.cellColor = QRCodeOptionsDefault.cellColor;
  gui.updateDisplay();
};
