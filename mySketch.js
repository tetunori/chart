// Options for QR drawing
const gQROptions = {
  width: 200,
  height: 200,
  targetData: "xxx",
  errorCorrectionLevel: "L",
  margin: 4,
  isAutoSave: true,
};

// QR Code Graphics
let gQRGraphic = undefined;

function setup() {
  // Get Queries
  // console.log(window.location.search);
  const urlSP = new URLSearchParams(window.location.search);

  const opt = gQROptions;

  if (urlSP.size === 0) {
    // When there is no query, no need auto save.
    opt.isAutoSave = false;
  }

  if (!urlSP.has("chl") || urlSP.get("chl") === "") {
    // There is no target text data...
    if (urlSP.size > 0) {
      // If there exists 1 or more queries, we need data!
      console.error("Please input a target data!");
    }
  }

  if (!urlSP.has("cht") || urlSP.get("cht") !== "qr") {
    // Specify not any chart mode.
    if (urlSP.size > 0) {
      console.log('Please add "&cht" query like "&cht=qr" to URL.');
    }
  }

  if (urlSP.has("choe")) {
    console.error(
      'We do not support "choe" option. UTF-8 is selected automatically.'
    );
  }

  // Handle Queries
  for (const [key, val] of urlSP) {
    // console.log(`${key}: ${val}`)

    // Target text data
    if (key === "chl") {
      // console.log(val)
      opt.targetData = val;
      if (opt.targetData === "") {
        opt.targetData = "xxx";
      }
    }

    // Width/Height
    if (key === "chs") {
      const widthStr = val.substring(0, val.indexOf("x"));
      opt.width = parseInt(widthStr, 10);
      if (opt.width < 0) {
        opt.width = 200;
      }

      const heightIndex = val.indexOf("x") + 1;
      const heightStr = val.substring(heightIndex);
      opt.height = parseInt(heightStr, 10);
      if (opt.height < 0) {
        opt.height = 200;
      }
    }

    // Other options
    if (key === "chld") {
      // console.log(val)

      // Error Correction Level
      let ecl = val.charAt(0);
      if (!["H", "Q", "M", "L"].includes(ecl)) {
        ecl = "L";
      }
      opt.errorCorrectionLevel = ecl;

      // Margin setting
      const marginIndex = val.indexOf("|") + 1;
      const marginStr = val.substring(marginIndex);
      opt.margin = parseInt(marginStr, 10);
      if (isNaN(opt.margin) || opt.margin < 0) {
        opt.margin = 4;
      }
    }
  }
  // console.log(opt);

  // Prepare GUI
  prepareDatGUI(opt);

  // Create P5 canvas
  const canvasSize = 720;
  createCanvas(canvasSize, canvasSize);
  background(220);

  // Prepare Graphic for QR Code.
  gQRGraphic = createGraphics(opt.width, opt.height);

  // Draw QR Code
  drawQRCode();

  // Save png if needed
  if (opt.isAutoSave) {
    saveImage(gQRGraphic);
  }
}

const drawQRCode = () => {
  const opt = gQROptions;

  // Draw QR Code to Graphic region
  QRCode.toCanvas(gQRGraphic.canvas, opt.targetData, {
    width: opt.width,
    margin: opt.margin,
    errorCorrectionLevel: opt.errorCorrectionLevel,
  });

  // Paste QR Graphic to p5 canvas
  image(
    gQRGraphic,
    width / 2 - opt.width / 2,
    height / 2 - opt.height / 2,
    opt.width,
    opt.height
  );
};

function draw() {
  background(220);

  const opt = gQROptions;
  opt.width = QRCodeOptions.width;
  // opt.height = QRCodeOptions.height;
  opt.height = QRCodeOptions.width;
  opt.targetData = QRCodeOptions.targetData;
  opt.errorCorrectionLevel = QRCodeOptions.errorCorrectionLevel;
  opt.margin = QRCodeOptions.margin;

  // Draw QR Code
  drawQRCode();
}

// For debug
// function mouseClicked() {
//   if (gQRGraphic) {
//     saveImage(gQRGraphic);
//   }
// }
