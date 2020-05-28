const pressureButtons = {
  controller : "PC",
  obj: separator.PressureController,
  mv : {
    name: "lift",
    label: "Lift",
    objmvName: "lift",
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.50
  },
  cv : {
    name: "pressure",
    stptlabel: "<i>P</i>&nbsp;(Pa)",
    stptDefault: 75000,
    stptMin: Number.MIN_VALUE,
    stptMax: 1000000,
    stptStep: 1
  },
  KcUnits : "(Pa<sup>-1</sup>)"
};

const tempButtons = {
  controller : "TC",
  obj: separator.TemperatureController,
  mv : {
    name: "power",
    label: "<i>Q</i>&nbsp;(W)",
    objmvName: "Q",
    min: 0,
    max: 1000000,
    step: 10000,
    default: 500000
  },
  cv : {
    name: "temperature",
    stptlabel: "<i>T</i>&nbsp;(K)",
    stptDefault: 500,
    stptMin: Number.MIN_VALUE,
    stptMax: 1000,
    stptStep: 10
  },
  KcUnits : "(W/K)"
};

const levelButtons = {
  controller : "LC",
  obj: separator.LevelController,
  mv : {
    name: "flowRateOut",
    label: "v<sub>out</sub>&nbsp;(L/s)",
    objmvName: "L",
    min: 0,
    max: 10,
    step: 0.05,
    default: 0.5
  },
  cv : {
    name: "level",
    stptlabel: "<i>Lvl.</i>&nbsp;(%)",
    stptDefault: 25,
    stptMin: Number.MIN_VALUE,
    stptMax: 100 - Number.MIN_VALUE,
    stptStep: 1
  },
  KcUnits : "[L/(s %)]"
};

const inletParams = {
  F0 : {
    name: "flowRateIn",
    label: "F<sub>in</sub>&nbsp;(mol/s)",
    objName: "F",
    min: 0,
    max: 100,
    step: 0.1,
    default: 15
  },
  xA0 : {
    name: "moleFracIn",
    label: "x<sub>A,in</sub>",
    objName: "xin",
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5
  },
  Tin : {
    name: "temperatureIn",
    label: "<i>T</i><sub>in</sub>&nbsp;(K)",
    objName: "Tin",
    min: Number.MIN_VALUE,
    max: 1000,
    step: 1,
    default: 400
  }
}

const autoParams = {
  tauDefault: 36000,
  tauMin: Number.MIN_VALUE,
  tauMax: 3600000,
  tauStep: 10,
  KcDefault: 0,
  KcMin: -1000000,
  KcMax: 1000000,
  KcStep: 1e-9
}

function controllerHTML(opts) {

  const text = `
  <div class="button-group">
    <h5>${opts.cv.name} controller</h5>
    <div class="btn-toolbar mb-1" role="toolbar" aria-label="PI Controller Mode Toggles for ${opts.mv.label}">
      <div class="btn-group" role="group" aria-label="Auto and manual buttons">
        <button type="button" class="btn btn-sm btn-secondary auto mode-toggle ${opts.controller}">Auto</button>
        <button type="button" class="btn btn-sm btn-secondary manual mode-toggle ${opts.controller} on">Manual</button>
      </div>
      <button id="update-${opts.controller}" class="btn btn-sm btn-primary ml-1" aria-label="Update controller settings button">Update</button>
    </div>

    <div class="input-wrapper">
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="input-${opts.mv.name}-label">${opts.mv.label}</span>
        </div>
        <input type="number" id="input-${opts.mv.name}" class="form-control" min="${opts.mv.min}" max="${opts.mv.max}" step="${opts.mv.step}" value="${opts.mv.default}" aria-label="${opts.mv.name} input" aria-describedby="input-${opts.mv.name}-label">
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="input-${opts.cv.name}-label">${opts.cv.stptlabel}</span>
        </div>
        <input type="number" id="input-${opts.cv.name}" class="form-control" min="${opts.cv.stptMin}" max="${opts.cv.stptMax}" step="${opts.cv.stptStep}" value="${opts.cv.stptDefault}" aria-label="${opts.cv.name} input" aria-describedby="input-${opts.cv.name}-label">
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="input-${opts.cv.name}-Kc-label">K<sub>c</sub>&nbsp;${opts.KcUnits}</span>
        </div>
        <input type="number" id="input-${opts.cv.name}-Kc" class="form-control" min="${autoParams.KcMin}" max="${autoParams.KcMax}" step="${autoParams.KcStep}" value="${autoParams.KcDefault}" aria-label="${opts.cv.name} gain input" aria-describedby="input-${opts.cv.name}-Kc-label">
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="input-${opts.cv.name}-tau-label">Tau</span>
        </div>
        <input type="number" id="input-${opts.cv.name}-tau" class="form-control" min="${autoParams.tauMin}" max="${autoParams.tauMax}" step="${autoParams.tauStep}" value="${autoParams.tauDefault}" aria-label="${opts.cv.name} tau input" aria-describedby="input-${opts.cv.name}-tau-label">
      </div>
    </div>
  </div>
  `;

  return text;
}

function disturbanceHTML(opts) {

  const text = `
  <div class="button-group">
    <h5>Inlet conditions</h5>
    <button id="update-inlet" class="btn btn-sm btn-primary" aria-label="Update inlet conditions button">Update</button>
    <div class="input-wrapper">
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="input-${opts.F0.name}-label">${opts.F0.label}</span>
        </div>
        <input type="number" id="input-${opts.F0.name}" class="form-control" min="${opts.F0.min}" max="${opts.F0.max}" step="${opts.F0.step}" value="${opts.F0.default}" aria-label="${opts.F0.name} input" aria-describedby="input-${opts.F0.name}-label">
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="input-${opts.xA0.name}-label">${opts.xA0.label}</span>
        </div>
        <input type="number" id="input-${opts.xA0.name}" class="form-control" min="${opts.xA0.min}" max="${opts.xA0.max}" step="${opts.xA0.step}" value="${opts.xA0.default}" aria-label="${opts.xA0.name} input" aria-describedby="input-${opts.xA0.name}-label">
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <span class="input-group-text" id="input-${opts.Tin.name}-label">${opts.Tin.label}</span>
        </div>
        <input type="number" id="input-${opts.Tin.name}" class="form-control" min="${opts.Tin.min}" max="${opts.Tin.max}" step="${opts.Tin.step}" value="${opts.Tin.default}" aria-label="${opts.Tin.name} input" aria-describedby="input-${opts.Tin.name}-label">
      </div>
    </div>
  </div>
  `;

  return text;
}

function insertInputs() {
  const doc = document.createElement('div');
  doc.id = "main-application-wrapper";
  document.body.appendChild(doc);

  [pressureButtons, levelButtons, tempButtons].forEach(opts => {
    const wrapper = document.createElement('div');
    wrapper.id = `${opts.controller}-control`;
    wrapper.style.display = "block";
    
    const text = controllerHTML(opts);
    wrapper.innerHTML = text;
    doc.appendChild(wrapper);

    const autobtn = wrapper.getElementsByClassName(`auto mode-toggle ${opts.controller}`)[0];
    const manualbtn = wrapper.getElementsByClassName(`manual mode-toggle ${opts.controller}`)[0];
    const manualInput = document.getElementById(`input-${opts.mv.name}`);
    const stptInput = document.getElementById(`input-${opts.cv.name}`);
    const KcInput = document.getElementById(`input-${opts.cv.name}-Kc`);
    const tauInput = document.getElementById(`input-${opts.cv.name}-tau`);
    const updateInput = document.getElementById(`update-${opts.controller}`);

    const toggleAuto = () => {
      manualbtn.classList.remove("on");
      manualInput.setAttribute("disabled", true);
      autobtn.classList.add("on");
      opts.obj["stpt"] = stptInput.value;
      opts.obj["Tau"] = tauInput.value;
      opts.obj["Kc"] = KcInput.value;
      opts.obj["auto"] = true;
    }

    const toggleManual = () => {
      autobtn.classList.remove("on");
      manualInput.removeAttribute("disabled");
      manualbtn.classList.add("on");
      manualInput.value = opts.obj["currentVal"];
      opts.obj["auto"] = false;
    }

    autobtn.addEventListener('click', toggleAuto);
    manualbtn.addEventListener('click', toggleManual);

    // Updates a temporary variable when user puts input; temporary variable is capped at min/max and assigned to controller when user presses "update"
    [[manualInput, "mv"], [stptInput, "tempStpt"], [KcInput, "tempKc"], [tauInput, "tempTau"]].forEach(pair => {
      pair[0].addEventListener('input', () => {
        const inputValue = pair[0].value;
        const min = Number(pair[0].getAttribute("min"));
        const max = Number(pair[0].getAttribute("max"));
        const parsed = parseNumericInput(inputValue, min, max);
        opts.obj[pair[1]] = parsed;
      });
    });

    // When "update" is pressed, the controller is updated to the temporary variables
    updateInput.addEventListener('click', () => {
      if(opts.obj["auto"] === true) {
        opts.obj["Kc"] = opts.obj["tempKc"]
        opts.obj["Tau"] = opts.obj["tempTau"];
        opts.obj["stpt"] = opts.obj["tempStpt"];
        opts.obj["error"] = 0;
      } else {
        separator[`${opts.mv.objmvName}`] = opts.obj["mv"];
        manualInput.value = opts.obj["mv"];
      }
    });
  });

  const inletWrapper = document.createElement("div");
  inletWrapper.id = "inlet-control";
  inletWrapper.style.display = "block";
  const text = disturbanceHTML(inletParams);
  inletWrapper.innerHTML = text;
  doc.appendChild(inletWrapper);

  const updateInletButton = document.getElementById("update-inlet");
  const FInput = document.getElementById(`input-${inletParams.F0.name}`);
  const xInput = document.getElementById(`input-${inletParams.xA0.name}`);
  const TInput = document.getElementById(`input-${inletParams.Tin.name}`);

  updateInletButton.addEventListener("click", () => {
    const parseF = parseNumericInput(FInput.value, Number(FInput.getAttribute("min")), Number(FInput.getAttribute("max")));
    const parseX = parseNumericInput(xInput.value, Number(xInput.getAttribute("min")), Number(xInput.getAttribute("max")));
    const parseT = parseNumericInput(TInput.value, Number(TInput.getAttribute("min")), Number(TInput.getAttribute("max")));
    FInput.value = parseF;
    xInput.value = parseX;
    TInput.value = parseT;
    separator.F = parseF;
    separator.xin = parseX;
    separator.Tin = parseT;
  })
}

function parseNumericInput(value, min, max) {
  let input = Number(value);
  input = Math.max(min, Math.min(max, input));
  return input;
}

module.exports = insertInputs;