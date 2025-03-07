/*
  This is the main JavaScript file for the simulation. It is just a wrapper
  for the other JavaScript files. None of the actual simulation logic should go
  in this file.
*/
const mainWidth = 1280;
const mainHeight = 720;
// Declare global variables which are available to all files
window.z = {
  //selection: "Velocity Distribution",

  //graph and window variables
  width: mainWidth,
  height: mainWidth,
  graphCenterX: (mainWidth / 2),
  graphCenterY: (mainHeight / 2) - 32,
  grayThickness: (((mainHeight / 2) - 32) - 265) - 50,
  distLX: ((mainWidth / 2)) - 428,
  heightBY: ((mainHeight / 2) - 32) + 290,
  distRX: ((mainWidth / 2)) + 428,
  heightTY: ((mainHeight / 2) - 32) - 290,
  distBY: ((mainHeight / 2) - 32) + 240,
  distTY: ((mainHeight / 2) - 32) - 240, 

  /*graphCenterX: (width / 2),
  graphCenterY: (height / 2) - 32,
  grayThickness: (graphCenterY - 265) - 50,
  distLX: (graphCenterX) - 428,
  heightBY: (graphCenterY) + 290,
  distRX: (graphCenterX) + 428,
  heightTY: (graphCenterY) - 290,
  distBY: (graphCenterY) + 240,
  distTY: (graphCenterY) - 240, */

  //slider variables
  hTop: 0.34,
  muTop: 0.5,
  hMid: 0.33,
  muMid: 1,
  hBot: 0.33, 
  centerXTop: 0,
  centerYTop: 0,
  centerXMid: 0,
  centerYMid: 0,
  centerXBot: 0,
  centerYBot: 0,

  //line on the distribution graph points
  distLineX23: 0,
  distLineX12: 0,


  particles: 50,
  //playing: false,
}

// Load the other scripts (except calcs.js, which is imported in draw.js).

import "./controls.js";
import "./draw.js";
