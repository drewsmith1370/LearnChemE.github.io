function textBox(p, x, y, theta, text, color) {
  p.push();
  p.textAlign(p.CENTER, p.CENTER);
  p.textSize(16);
  p.noStroke();
  p.fill(253);
  const textLength = p.textWidth(text);
  const textHeight = p.textAscent(text);
  p.rectMode(p.CENTER);
  const xPix = gvs.coordToPix(x, y)[0];
  const yPix = gvs.coordToPix(x, y)[1];
  p.translate(xPix, yPix);
  p.rotate(theta * 2 * Math.PI / 360);
  p.rect(0, 0, textLength + 2, textHeight + 2);
  p.fill(color);
  p.text(text, 0, 0);
  p.pop();
}

function drawPlot(p) {
  const margins = gvs.plot.margins;
  const height = gvs.plot.height;
  const width = gvs.plot.width;
  const axes_range = gvs.plot.axes_range;
  const xMin = axes_range[0][0];
  const xMax = axes_range[0][1];
  const yMin = axes_range[1][0];
  const yMax = axes_range[1][1];

  p.push();
  p.fill(255);
  p.stroke(0);
  p.strokeWeight(0.5);
  p.line(margins[0][0], margins[1][0], margins[0][0], margins[1][0] + height);
  p.line(margins[0][0], margins[1][0], margins[0][0] + width, margins[1][0]);
  p.line(margins[0][0], margins[1][0] + height, margins[0][0] + width, margins[1][0] + height);
  p.line(margins[0][0] + width, margins[1][0], margins[0][0] + width, margins[1][0] + height);
  let y = axes_range[1][0];
  
  const gridStroke = 220;

  while(y < 0.1) {
    const coords1 = gvs.coordToPix(0, y);
    const coords2 = gvs.coordToPix(3500, y);
    let tickWidth;
    if(y === 0.01) {tickWidth = 8} else {tickWidth = 3}
    p.stroke(0);
    p.strokeWeight(1);
    p.line(coords1[0], coords1[1], coords1[0] + tickWidth, coords1[1]);
    p.line(coords2[0], coords2[1], coords2[0] - tickWidth, coords2[1]);
    if(gvs.show_grid) {
      p.stroke(gridStroke);
      p.strokeWeight(0.5);
      p.line(coords1[0], coords1[1], coords2[0], coords1[1]);
    }
    y += 0.01;
    y = Math.round(y * 100) / 100;
  }

  while(y < 1) {
    const coords1 = gvs.coordToPix(0, y);
    const coords2 = gvs.coordToPix(3500, y);
    let tickWidth;
    if(y === 0.1) {tickWidth = 8} else {tickWidth = 3}
    p.stroke(0);
    p.strokeWeight(1);
    p.line(coords1[0], coords1[1], coords1[0] + tickWidth, coords1[1]);
    p.line(coords2[0], coords2[1], coords2[0] - tickWidth, coords2[1]);
    if(gvs.show_grid) {
      p.stroke(gridStroke);
      p.strokeWeight(0.5);
      p.line(coords1[0], coords1[1], coords2[0], coords1[1]);
    }
    y += 0.1;
    y = Math.round(y * 10) / 10;
  }

  while(y < 10) {
    const coords1 = gvs.coordToPix(0, y);
    const coords2 = gvs.coordToPix(3500, y);
    let tickWidth;
    if(y === 1) {tickWidth = 8} else {tickWidth = 3}
    p.stroke(0);
    p.strokeWeight(1);
    p.line(coords1[0], coords1[1], coords1[0] + tickWidth, coords1[1]);
    p.line(coords2[0], coords2[1], coords2[0] - tickWidth, coords2[1]);
    if(gvs.show_grid) {
      p.stroke(gridStroke);
      p.strokeWeight(0.5);
      p.line(coords1[0], coords1[1], coords2[0], coords1[1]);
    }
    y += 1;
    y = Math.round(y);
  }

  while(y < 100) {
    const coords1 = gvs.coordToPix(0, y);
    const coords2 = gvs.coordToPix(3500, y);
    let tickWidth;
    if(y === 10) {tickWidth = 8} else {tickWidth = 3}
    p.stroke(0);
    p.strokeWeight(1);
    p.line(coords1[0], coords1[1], coords1[0] + tickWidth, coords1[1]);
    p.line(coords2[0], coords2[1], coords2[0] - tickWidth, coords2[1]);
    if(gvs.show_grid) {
      p.stroke(gridStroke);
      p.strokeWeight(0.5);
      p.line(coords1[0], coords1[1], coords2[0], coords1[1]);
    }
    y += 10;
    y = Math.round(y);
  }

  while(y < 1000) {
    const coords1 = gvs.coordToPix(0, y);
    const coords2 = gvs.coordToPix(3500, y);
    let tickWidth;
    if(y === 100) {tickWidth = 8} else {tickWidth = 3}
    p.stroke(0);
    p.strokeWeight(1);
    p.line(coords1[0], coords1[1], coords1[0] + tickWidth, coords1[1]);
    p.line(coords2[0], coords2[1], coords2[0] - tickWidth, coords2[1]);
    if(gvs.show_grid) {
      p.stroke(gridStroke);
      p.strokeWeight(0.5);
      p.line(coords1[0], coords1[1], coords2[0], coords1[1]);
    }
    y += 100;
    y = Math.round(y);
  }

  while(y < 10000) {
    const coords1 = gvs.coordToPix(0, y);
    const coords2 = gvs.coordToPix(3500, y);
    let tickWidth;
    if(y === 1000) {tickWidth = 8} else {tickWidth = 3}
    p.stroke(0);
    p.strokeWeight(1);
    p.line(coords1[0], coords1[1], coords1[0] + tickWidth, coords1[1]);
    p.line(coords2[0], coords2[1], coords2[0] - tickWidth, coords2[1]);
    if(gvs.show_grid) {
      p.stroke(gridStroke);
      p.strokeWeight(0.5);
      p.line(coords1[0], coords1[1], coords2[0], coords1[1]);
    }
    y += 1000;
    y = Math.round(y);
  }

  for(let x = 0; x <= 3500; x += 100) {
    const coords1 = gvs.coordToPix(x, 0.05);
    const coords2 = gvs.coordToPix(x, 10000);
    let tickWidth;
    if(x % 500 == 0) {
      tickWidth = 8
    } else {
      tickWidth = 3
    }
    p.stroke(0);
    p.strokeWeight(1);
    p.line(coords1[0], coords1[1], coords1[0], coords1[1] - tickWidth);
    p.line(coords2[0], coords2[1], coords2[0], coords2[1] + tickWidth);
    if(gvs.show_grid) {
      p.stroke(gridStroke);
      p.strokeWeight(0.5);
      p.line(coords1[0], coords1[1], coords1[0], coords2[1]);
    }
  }

  p.pop();

}

function drawEnvelope(p) {
  p.push();
  if(gvs.show_critical) {
    p.stroke(155, 155, 255);
  } else {
    p.stroke(0);
  }
  p.strokeWeight(2);
  p.noFill();
  
  const Q0 = gvs.coords.Q0;
  const Q100 = gvs.coords.Q100;
  
  p.beginShape();
  for(let i = 0; i < Q0.length; i++) {
    const coord = Q0[i];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  
  if(gvs.show_critical) {
    p.stroke(255, 200, 200);
  } else {
    p.stroke(0);
  }

  p.beginShape();
  for(let i = 0; i < Q100.length; i++) {
    const coord = Q100[i];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  
  if(gvs.show_critical) {
    p.noStroke();
    textBox(p, 800, 10, -45, "saturated liquid", "rgb(155, 155, 255)");
    textBox(p, 2720, 3, -78, "saturated vapor", "rgb(255, 200, 200)");
  }

  p.pop();
}

function drawQuality(p) {
  const color = gvs.color ? "rgb(0, 0, 150)" : "rgb(0, 0, 0)";
  let label_coords = gvs.coords.Q0[11];
  textBox(p, label_coords[0], label_coords[1], -45, `q = 0`, color);
  p.push();
  p.noFill();
  if(gvs.color) {
    p.stroke(0, 0, 150);
  } else {
    p.stroke(0);
  }

  p.strokeWeight(1);
  for(let i = 10; i <= 90; i += 10) {
    const variable_name = `Q${Math.round(i)}`;
    const quality_array = gvs.coords[variable_name];
    p.beginShape();
    for(let j = 0; j < quality_array.length; j++) {
      const coord = quality_array[j];
      const pix = gvs.coordToPix(coord[0], coord[1]);
      p.vertex(pix[0], pix[1]);
    }
    p.endShape();
    const label_coords = quality_array[10];
    textBox(p, label_coords[0], label_coords[1], -45, `${Math.round(i) / 100}`, color);
  }
  label_coords = gvs.coords.Q100[10];
  textBox(p, label_coords[0], label_coords[1], -45, `1.0`, color);
  p.pop();
}

function drawTemperature(p) {
  p.push();
  p.noFill();
  if(gvs.color) {
    p.stroke(255, 0, 0);
  } else {
    p.stroke(0);
  }
  p.strokeWeight(1);
  for(let i = 50; i <= 550; i += 50) {
    if(i == 200) {i += 50}
    const variable_name = `T${Math.round(i)}`;
    const temperature_array = gvs.coords[variable_name];
    p.beginShape();
    for(let j = 0; j < temperature_array.length; j++) {
      const coord = temperature_array[j];
      const pix = gvs.coordToPix(coord[0], coord[1]);
      p.vertex(pix[0], pix[1]);
    }
    p.endShape();
  }
  p.pop();

  const color = gvs.color ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)";
  textBox(p, 1500, 0.12, 0, "T = 50° C", color);
  textBox(p, 1600, 1.02, 0, "100", color);
  textBox(p, 1800, 4.8, 0, "150", color);
  textBox(p, 2000, 40, 0, "250", color);
  textBox(p, 2100, 90, 0, "300", color);
  textBox(p, 2150, 160, 0, "350", color);
  textBox(p, 1950, 400, 20, "400", color);
  textBox(p, 2130, 700, 30, "450", color);
  textBox(p, 2320, 1000, 35, "500", color);
  textBox(p, 2480, 1500, 40, "550", color);
}

function drawCritical(p) {
  p.push();
  p.noFill();
  p.strokeWeight(2);
  if(gvs.color) {
    p.stroke(100, 0, 255);
  } else {
    p.stroke(0);
  }
  const temperature_array = gvs.coords.Tc;
  p.beginShape();
  for(let j = 0; j < temperature_array.length; j++) {
    const coord = temperature_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  p.strokeWeight(10);
  const critical_pix = gvs.coordToPix(2084.26, 220.62);
  p.point(critical_pix[0], critical_pix[1]);
  if(gvs.show_critical) {
    textBox(p, 3220, 1, -90, "critical temperature", "rgb(0, 0, 255)");
  }
  p.pop();
}

function drawDensity(p) {
  p.push();
  p.noFill();
  if(gvs.color) {
    p.stroke(155, 155, 0);
  } else {
    p.stroke(0);
  }
  p.strokeWeight(1);
  const color = gvs.color ? "rgb(155, 155, 0)" : "rgb(0, 0, 0)";

  let density_array = gvs.coords.Rho1000;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  let textCoord = density_array[10];
  textBox(p, textCoord[0], textCoord[1] - 150, -33, "ρ = 1000 kg/m³", color);

  density_array = gvs.coords.Rho950;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[10];
  textBox(p, textCoord[0], textCoord[1] - 50, -33, "950", color);

  density_array = gvs.coords.Rho900;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[10];
  textBox(p, textCoord[0], textCoord[1] - 50, -33, "900", color);

  density_array = gvs.coords.Rho800;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[10];
  textBox(p, textCoord[0], textCoord[1] - 50, -33, "800", color);

  density_array = gvs.coords.Rho700;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[10];
  textBox(p, textCoord[0], textCoord[1] - 50, -30, "700", color);

  density_array = gvs.coords.Rho600;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[10];
  textBox(p, textCoord[0], textCoord[1] - 50, -33, "600", color);

  density_array = gvs.coords.Rho400;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[8];
  textBox(p, textCoord[0], textCoord[1] - 30, -18, "400", color);

  density_array = gvs.coords.Rho200;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[6];
  textBox(p, textCoord[0], textCoord[1] - 30, -10, "200", color);

  density_array = gvs.coords.Rho50;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[3];
  textBox(p, textCoord[0] + 300, textCoord[1] + 20, -10, "50", color);

  density_array = gvs.coords.Rho10;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[3];
  textBox(p, textCoord[0] + 350, textCoord[1] + 5, -7, "10", color);

  density_array = gvs.coords.Rho2;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[3];
  textBox(p, textCoord[0] - 100, textCoord[1] - 0.8, -7, "2", color);

  density_array = gvs.coords.Rho02;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();
  textCoord = density_array[3];
  textBox(p, textCoord[0] - 100, textCoord[1] - 0.07, -7, "0.2", color);

  density_array = gvs.coords.Rho002;
  p.beginShape();
  for(let j = 0; j < density_array.length; j++) {
    const coord = density_array[j];
    const pix = gvs.coordToPix(coord[0], coord[1]);
    p.vertex(pix[0], pix[1]);
  }
  p.endShape();

  p.pop();
}

function drawEntropy(p) {
  p.push();
  p.noFill();
  if(gvs.color) {
    p.stroke(255, 0, 155);
  } else {
    p.stroke(0);
  }
  p.strokeWeight(1);
  for(let i = 5; i <= 85; i += 5) {
    const variable_name = `S${Math.round(i)}`;
    const entropy_array = gvs.coords[variable_name];
    p.beginShape();
    for(let j = 0; j < entropy_array.length; j++) {
      const coord = entropy_array[j];
      const pix = gvs.coordToPix(coord[0], coord[1]);
      p.vertex(pix[0], pix[1]);
    }
    p.endShape();
    const color = gvs.color ? "rgb(255, 0, 155)" : "rgb(0, 0, 0)";
    const coords = entropy_array[12];
    if(i == 5) {
      textBox(p, coords[0] - 30, coords[1] - 500, -80, "S = 0.5 kJ/(kg K)", color);
    } else {
      textBox(p, coords[0], coords[1], -45, (Math.round(i) / 10).toFixed(1), color);
    }
  }
  p.pop();
}

function drawLabels(p) {
  p.push();
  p.noStroke();
  p.fill(253);
  p.rectMode(p.CORNERS);
  p.rect(gvs.plot.margins[0][0] + gvs.plot.width + 1, 0, p.width, p.height);
  p.rect(0, gvs.plot.margins[1][0] + gvs.plot.height + 1, p.width, p.height);
  p.pop();

  p.push();
  p.noStroke();
  p.fill(0);
  p.textAlign(p.CENTER, p.CENTER);
  p.textSize(16);
  for(let x = 0; x <= 3500; x += 500) {
    const coords = gvs.coordToPix(x, 0.05);
    p.text(`${Math.round(x)}`, coords[0], coords[1] + 15);
  }

  p.textAlign(p.RIGHT, p.CENTER);
  for(let exp = -1; exp <= 4; exp++) {
    const y = 10**exp;
    const coords = gvs.coordToPix(0, y);
    p.text(`${Math.round(y * 10) / 10}`, coords[0] - 5, coords[1]);
  }

  p.textAlign(p.CENTER, p.CENTER);
  p.translate(p.width / 2 + 20, p.height - 30);
  p.text("enthalpy (kJ/kg)", 0, 0);
  p.translate(-1 * p.width / 2 + 20, -1 * p.height / 2 + 10);
  p.rotate(-1 * Math.PI / 2);
  p.text("pressure (bar)", 0, 0);
  p.pop();
}

function drawAll(p) {
  drawPlot(p);
  drawEnvelope(p);

  if(gvs.show_quality) {
    drawQuality(p);
  }

  if(gvs.show_temperature) {
    drawTemperature(p);
  }

  if(gvs.show_density) {
    drawDensity(p);
  }

  if(gvs.show_entropy) {
    drawEntropy(p);
  }

  if(gvs.show_critical) {
    drawCritical(p);
  }

  drawLabels(p);
}

module.exports = drawAll;