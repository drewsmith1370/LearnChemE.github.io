import results from "./results.js";

export const TDropData = [
  [[20, 20], 63.1], [[20, 30], 61.3], [[20, 40], 56.1], [[20, 50], 51.3],
  [[20, 60], 44.5], [[20, 70], 37], [[20, 80], 28.8],
  [[40, 20], 89.2], [[40, 30], 85.8], [[40, 40], 81.1], [[40, 50], 73.2],
  [[40, 60], 63.1], [[40, 70], 52.5], [[40, 80], 39.1],
  [[60, 20], 104.3], [[60, 30], 101.7], [[60, 40], 93.7], [[60, 50], 84.1],
  [[60, 60], 73.5], [[60, 70], 60.9], [[60, 80], 45.4],
  [[80, 20], 117.1], [[80, 30], 111.2], [[80, 40], 102.3], [[80, 50], 92.2],
  [[80, 60], 81.3], [[80, 70], 66.2], [[80, 80], 51.3],
  [[100, 20], 128.3], [[100, 30], 119.5], [[100, 40], 111.1], [[100, 50], 100.3],
  [[100, 60], 86.5], [[100, 70], 71.9], [[100, 80], 53.5]
];

export const TRiseData = [
  [[20, 20], 15.1], [[20, 30], 24.4], [[20, 40], 37.8], [[20, 50], 51.3],
  [[20, 60], 65.1], [[20, 70], 82.5], [[20, 80], 108.1],
  [[40, 20], 23.4], [[40, 30], 35.2], [[40, 40], 52.1], [[40, 50], 73.2],
  [[40, 60], 92.8], [[40, 70], 116.9], [[40, 80], 148.1],
  [[60, 20], 25.6], [[60, 30], 39.9], [[60, 40], 59.1], [[60, 50], 84.1],
  [[60, 60], 104.1], [[60, 70], 133.1], [[60, 80], 169.1],
  [[80, 20], 26.1], [[80, 30], 44.1], [[80, 40], 64.1], [[80, 50], 92.2],
  [[80, 60], 114.1], [[80, 70], 144.3], [[80, 80], 181.1],
  [[100, 20], 27.8], [[100, 30], 46.1], [[100, 40], 67.3], [[100, 50], 100.3],
  [[100, 60], 119.9], [[100, 70], 151.1], [[100, 80], 192.1]
];

function interpolate2D(data, x, y) {
  // Find 4 closest points (simplified for clarity)
  let closest = data.map(([coords, value]) => {
    const [xi, yi] = coords;
    const dist = Math.hypot(x - xi, y - yi);
    return { coords, value, dist };
  });

  // Sort by distance and take the 4 nearest neighbors
  closest.sort((a, b) => a.dist - b.dist);
  const points = closest.slice(0, 4);

  // Use inverse distance weighting for interpolation
  let numerator = 0;
  let denominator = 0;
  for (let pt of points) {
    const [xi, yi] = pt.coords;
    const d = Math.max(Math.hypot(x - xi, y - yi), 0.001); // avoid divide by 0
    numerator += pt.value / d;
    denominator += 1 / d;
  }

  return numerator / denominator;
}


export function calcAll() {
  const Pf = parseFloat(document.getElementById("feed-pressure-value").textContent);
  const z = parseFloat(document.getElementById("fraction-feed-value").textContent);

  // Constants
  const R = 286.9;           // J/(kg·K)
  const Cp = 1004.832;       // J/(kg·K)
  const tf = 298;            // Feed temp (K)
  const Pc = 1.01325;
  const Ph = 1.01325;
  const A = 0.0001;
  const gamma = 1.4;

  // Conversion from bar to PSIG
  function barToPSI(P) {
    return P * 14.504;
  }

  // Hot and cold temps in K
  const th = tf + 5 * interpolate2D(TRiseData, barToPSI(Pf - 1.01325), z * 100) / 9;
  const tc = tf - 5 * interpolate2D(TDropData, barToPSI(Pf - 1.01325), z * 100) / 9;

  // Mass flow rates
  const mf = 0.532 * (A * 10.7639) * (Pf * 2088.543) * 60 / (536.4 * 2.205);
  const mc = mf * z;
  const mh = mf * (1 - z);

  const eta = (tf - tc) / (tf * (Math.pow((Pf / 1.01325), ((gamma - 1) / gamma)) - 1));

  // COP formula
  const COP = (z * Cp * (tf - tc)) / ((gamma / (gamma - 1)) * R * tf * (Math.pow((Pf / 1.01325), ((gamma - 1) / gamma)) - 1));

  // Entropy calculations
  function deltaS(m, T, P) {
    return (m / mf) * (Cp * Math.log(T / tf) + R * Math.log(Pf / P));
  }

  const deltaStotal = deltaS(mc, tc, Pc) + deltaS(mh, th, Ph);

  results.th = Math.round(th);
  results.tc = Math.round(tc);
  results.mf = mf.toFixed(3);
  results.mc = mc.toFixed(3);
  results.mh = mh.toFixed(3);
  results.COP = COP.toFixed(2);
  results.eta = eta.toFixed(2);
  results.deltaStotal = deltaStotal.toFixed(0);

  updateSimulation();
}

export function updateSimulation() {
  const coldTemp = Number(results?.tc ?? 0);
  const hotTemp = Number(results?.th ?? 0);
  const mf = Number(results?.mf ?? 0);
  const mh = Number(results?.mh ?? 0);
  const mc = Number(results?.mc ?? 0);
  const COP = Number(results?.COP ?? 0);
  const eta = Number(results?.eta ?? 0);
  const deltaS = Number(results?.deltaStotal ?? 0);

  // Find all necessary containersAdd commentMore actions
  const coldTempContainer = document.getElementById("coldTemperature-container");
  const hotTempContainer = document.getElementById("hotTemperature-container");
  const mfContainer = document.getElementById("mf-container");
  const mhContainer = document.getElementById("mh-container");
  const mcContainer = document.getElementById("mc-container");
  const pressureContainer = document.getElementById("pressure-container");
  const copContainer = document.getElementById("cop-container");
  const formula1Container = document.getElementById("formula1-container");
  const formulaContainer = document.getElementById("formula-container");

  // Get the list of containers for mathjax
  const eqnContainers = [coldTempContainer, hotTempContainer, mfContainer, mhContainer, mcContainer, pressureContainer, copContainer, formula1Container, formulaContainer];
  // Clear the equations
  if (window.MathJax) {
    MathJax.typesetPromise(eqnContainers);
  }

  // Set html
  coldTempContainer.innerHTML = `$$ ${Math.round(coldTemp)}\\ \\text{K} $$`;
  hotTempContainer.innerHTML = `$$ ${Math.round(hotTemp)}\\ \\text{K} $$`;
  mfContainer.innerHTML = `$$ ${mf.toFixed(3)}\\ \\mathrm{kg/min} $$`;
  mhContainer.innerHTML = `$$ ${mh.toFixed(3)}\\ \\mathrm{kg/min} $$`;
  mcContainer.innerHTML = `$$ ${mc.toFixed(3)}\\ \\mathrm{kg/min} $$`;
  pressureContainer.innerHTML = `$$ 298 \\ \\text{K} \\ \\  ${state.P.toFixed(1)}\\ \\text{bar} $$`;
  copContainer.innerHTML = `<span style="font-family: Arial, sans-serif;">coefficient of performance = ${COP.toFixed(2)}</span>`;
  formula1Container.innerHTML = `$$\\Delta S_{\\text{tot}} = ${deltaS.toFixed(0)}\\ \\mathrm{J/(kg\\ K)}$$`;
  formulaContainer.innerHTML = `$$\\frac{T_{\\text{feed}} - T_{\\text{cold}}}{(T_{\\text{feed}} - T_{\\text{cold}})_{\\text{rev}}} = ${eta.toFixed(2)} $$`;

  //Rerender the equations
  if (window.MathJax) {
    MathJax.typesetPromise(eqnContainers);
  }
}