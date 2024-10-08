require("./style/style.scss");
require("bootstrap");
require("./style/slider.scss");
window.p5 = new require("./js/p5.min.js");

// GLOBAL VARIABLES OBJECT
window.gvs = {
  objectSG: 0.42,
  liquidSG: 1,
  objectVolume: 1, // units: m^3
  objectHeightInPixels: 150,
  objectWeight: 4.12, // units: kN
  liquidVolumeDisplaced: 0.42, // units: m^3
  buoyantForce: 4.12, // units: kN
  heightAboveWater: 0.58, // units: m
}

gvs.update = function() {
  this.objectWeight = this.objectSG * this.objectVolume * 9.81;
  if ( this.objectSG >= this.liquidSG ) {
    this.liquidVolumeDisplaced = this.objectVolume;
    this.buoyantForce = this.liquidSG * this.objectVolume * 9.81;
    this.heightAboveWater = -1;
  } else {
    this.liquidVolumeDisplaced = (this.objectSG / this.liquidSG) * this.objectVolume;
    this.buoyantForce = this.objectWeight;
    this.heightAboveWater = this.objectVolume - this.liquidVolumeDisplaced; // this equation would need to be modified if the object volume is not 1 m^3
  }
};

const graphics = require("./js/graphics.js");
const containerElement = document.getElementById('p5-container');

const sketch = (p) => {

  p.setup = function() {
    p.createCanvas(600, 500);
    p.noLoop();
  };

  p.draw = function() {
    p.background(250);
    graphics.rectangularPrism(p);
    graphics.water(p);
    graphics.arrow(p);
    graphics.text(p);
  };
};

const P5 = new p5(sketch, containerElement);

const objectSGslider = document.getElementById("object-specific-gravity");
const objectSGdisplay = document.getElementById("object-specific-gravity-display");
const liquidSGslider = document.getElementById("liquid-specific-gravity");
const liquidSGdisplay = document.getElementById("liquid-specific-gravity-display");
const objectDropdown = document.getElementById("object-composition");
const liquidDropdown = document.getElementById("liquid-composition");

objectSGslider.addEventListener("input", () => {
  gvs.objectSG = Number(objectSGslider.value);
  objectSGdisplay.innerHTML = Number(gvs.objectSG).toFixed(2);
  objectDropdown.value = "custom";
  gvs.update();
  P5.redraw();
});

liquidSGslider.addEventListener("input", () => {
  gvs.liquidSG = Number(liquidSGslider.value);
  liquidSGdisplay.innerHTML = Number(gvs.liquidSG).toFixed(2);
  liquidDropdown.value = "custom";
  gvs.update();
  P5.redraw();
});

objectDropdown.addEventListener("change", function() {
  switch(objectDropdown.value) {
    case "aspen":
      gvs.objectSG = 0.42;
      objectSGslider.value = "0.42";
      objectSGdisplay.innerHTML = "0.42";
      break;
    case "oak":
      gvs.objectSG = 0.93;
      objectSGslider.value = "0.93";
      objectSGdisplay.innerHTML = "0.93";
      break;
    case "pvc":
      gvs.objectSG = 1.33;
      objectSGslider.value = "1.33";
      objectSGdisplay.innerHTML = "1.33";
      break;
    default:
      break;
  };
  gvs.update();
  P5.redraw();
});

liquidDropdown.addEventListener("change", function() {
  switch(liquidDropdown.value) {
    case "water":
      gvs.liquidSG = 1.00;
      liquidSGslider.value = "1.00";
      liquidSGdisplay.innerHTML = "1.00";
      break;
    case "gasoline":
      gvs.liquidSG = 0.68;
      liquidSGslider.value = "0.68";
      liquidSGdisplay.innerHTML = "0.68";
      break;
    case "seawater":
      gvs.liquidSG = 1.02;
      liquidSGslider.value = "1.02";
      liquidSGdisplay.innerHTML = "1.02";
      break;
    default:
      break;
  };
  gvs.update();
  P5.redraw();
});
