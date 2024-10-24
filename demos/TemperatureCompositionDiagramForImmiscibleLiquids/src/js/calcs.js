gvs.Psat1 = function(T) {
  return 10**(4.72583 - 1660.652/(T + 271.5))
}

gvs.Psat2 = function(T) {
  return 10**(5.0768 - 1659.793/(T + 227.1))
}

gvs.Ty1 = function(z) {
  let delta = 1e6;
  let T_sol = 140;
  for(let T = 140; T <= 220; T += 0.1) {
    const T_error = Math.abs(gvs.Psat1(T) / gvs.P - z);
    if(T_error < delta) {
      T_sol = T;
      delta = T_error;
    }
  }
  return T_sol
}

gvs.Ty2 = function(z) {
  let delta = 1e6;
  let T_sol = 140;
  for(let T = 140; T <= 220; T += 0.1) {
    const T_error = Math.abs(1 - gvs.Psat2(T) / gvs.P - z);
    if(T_error < delta) {
      T_sol = T;
      delta = T_error;
    }
  }
  return T_sol
}

gvs.inverse_Ty1 = function(T) {
  let delta = 1e6;
  let x_guess = 0;
  for(let x = gvs.intersection_point; x < 1; x += 0.005) {
    const T_error = Math.abs(T - gvs.Ty1(x));
    if(T_error < delta) {
      delta = T_error;
      x_guess = x;
    }
  }
  return x_guess
}

gvs.inverse_Ty2 = function(T) {
  let delta = 1e6;
  let x_guess = 0;
  for(let x = 0; x < gvs.intersection_point; x += 0.005) {
    const T_error = Math.abs(T - gvs.Ty2(x));
    if(T_error < delta) {
      delta = T_error;
      x_guess = x;
    }
  }
  return x_guess
}

function intersectionPoint() {
  let delta = 1e6;
  let x_guess = 0.5;
  for(let x = 0.54; x < 0.60; x += 0.005) {
    const d = Math.abs(gvs.Ty2(x) - gvs.Ty1(x));
    if(d < delta) {
      delta = d;
      x_guess = x;
    }
  }
  gvs.intersection_point = x_guess;
  gvs.bubble_point = Math.round(10 * gvs.Ty1(x_guess)) / 10;
}

function calculateTemperature() {
  // all units are J/mol
  const Cp_benzene_liquid = 135.69;
  const Cp_benzene_vapor = 82.4;
  const Hvap_benzene = 30720;
  const Cp_water_liquid = 75.38;
  const Cp_water_vapor = 36.57;
  const Hvap_water = 40700;

  const Cp_liquid = gvs.x * Cp_benzene_liquid + (1 - gvs.x) * Cp_water_liquid;
  const Cp_vapor = gvs.x * Cp_benzene_vapor + (1 - gvs.x) * Cp_water_vapor;
  gvs.Q_subcooled = (gvs.bubble_point - gvs.T_initial) * Cp_liquid;
  const Q = gvs.Q * 1000;
  let Hvap;
  if(gvs.x < gvs.intersection_point) {
    Hvap = Hvap_benzene * gvs.x + Hvap_water * ((1 - gvs.x) - ( gvs.intersection_point - gvs.x) / gvs.intersection_point);
    gvs.Q_bubble = gvs.Q_subcooled + Hvap;
  } else {
    Hvap = Hvap_water * (1 - gvs.x) + Hvap_benzene * (gvs.x - (gvs.x - gvs.intersection_point) / (1 - gvs.intersection_point));
    gvs.Q_bubble = gvs.Q_subcooled + Hvap;
  }
  if(gvs.x < gvs.intersection_point) {
    gvs.Q_dew = gvs.Q_bubble + Hvap_water * (gvs.intersection_point - gvs.x) / gvs.intersection_point;
  } else {
    gvs.Q_dew = gvs.Q_bubble + Hvap_benzene * (gvs.x - gvs.intersection_point) / (1 - gvs.intersection_point);
  }
  if(gvs.x < gvs.intersection_point) {
    gvs.Q_dew += (gvs.Ty2(gvs.x) - gvs.bubble_point) * Cp_benzene_vapor * gvs.moles_vapor + (gvs.Ty2(gvs.x) - gvs.bubble_point) * Cp_water_liquid * gvs.moles_liquid_water;
  } else {
    gvs.Q_dew += (gvs.Ty1(gvs.x) - gvs.bubble_point) * Cp_water_vapor * gvs.moles_vapor + (gvs.Ty1(gvs.x) - gvs.bubble_point) * Cp_benzene_liquid * gvs.moles_liquid_benzene;
  }
  if(Q < gvs.Q_subcooled) {
    gvs.show_yB = false;
    gvs.T = gvs.T_initial + Q / Cp_liquid;
    gvs.moles_liquid_water = 1 - gvs.x;
    gvs.moles_liquid_benzene = gvs.x;
    gvs.moles_vapor = 0;
    gvs.vapor_composition = gvs.intersection_point;
  } else if(Q < gvs.Q_bubble) {
    gvs.show_yB = true;
    gvs.yB = gvs.intersection_point;
    gvs.T = gvs.bubble_point;
    if(gvs.x < gvs.intersection_point) {
      const moles_water_remaining = (gvs.intersection_point - gvs.x) / gvs.intersection_point;
      gvs.moles_liquid_water = 1 - gvs.x - ((Q - gvs.Q_subcooled) / (gvs.Q_bubble - gvs.Q_subcooled)) * (1 - gvs.x) + ((Q - gvs.Q_subcooled) / (gvs.Q_bubble - gvs.Q_subcooled)) * moles_water_remaining;
      gvs.moles_liquid_benzene = gvs.x - ((Q - gvs.Q_subcooled) / (gvs.Q_bubble - gvs.Q_subcooled)) * gvs.x;
    } else {
      const moles_benzene_remaining = (gvs.x - gvs.intersection_point) / (1 - gvs.intersection_point);
      gvs.moles_liquid_water = 1 - gvs.x - ((Q - gvs.Q_subcooled) / (gvs.Q_bubble - gvs.Q_subcooled)) * (1 - gvs.x);
      gvs.moles_liquid_benzene = gvs.x - ((Q - gvs.Q_subcooled) / (gvs.Q_bubble - gvs.Q_subcooled)) * gvs.x + ((Q - gvs.Q_subcooled) / (gvs.Q_bubble - gvs.Q_subcooled)) * moles_benzene_remaining;
    }
    gvs.moles_vapor = 1 - gvs.moles_liquid_benzene - gvs.moles_liquid_water;
    gvs.vapor_composition = gvs.intersection_point;
  } else if(Q < gvs.Q_dew) {
    gvs.show_yB = true;
    if(gvs.x < gvs.intersection_point) {
      gvs.T = gvs.bubble_point + ((Q - gvs.Q_bubble) / (gvs.Q_dew - gvs.Q_bubble)) * (gvs.Ty2(gvs.x) - gvs.bubble_point);
      const x_dew = gvs.inverse_Ty2(gvs.T);
      gvs.moles_liquid_water = (x_dew - gvs.x) / (x_dew - 0);
      gvs.moles_liquid_benzene = 0;
      gvs.moles_vapor = 1 - gvs.moles_liquid_water;
      gvs.yB = x_dew;
    } else {
      gvs.T = gvs.bubble_point + ((Q - gvs.Q_bubble) / (gvs.Q_dew - gvs.Q_bubble)) * (gvs.Ty1(gvs.x) - gvs.bubble_point);
      const x_dew = gvs.inverse_Ty1(gvs.T);
      gvs.moles_liquid_water = 0;
      gvs.moles_liquid_benzene = (gvs.x - x_dew) / (1 - x_dew);
      gvs.moles_vapor = 1 - gvs.moles_liquid_benzene;
      gvs.yB = x_dew;
    }
  } else {
    gvs.show_yB = true;
    gvs.moles_liquid_water = 0;
    gvs.moles_liquid_benzene = 0;
    gvs.yB = gvs.x;
    if(gvs.x < gvs.intersection_point) {
      gvs.T = gvs.Ty2(gvs.x) + (Q - gvs.Q_dew) / Cp_vapor;
    } else {
      gvs.T = gvs.Ty1(gvs.x) + (Q - gvs.Q_dew) / Cp_vapor;
    }
  }
  gvs.T = Math.min(220, gvs.T);
}

function calcAll() {
  intersectionPoint();
  calculateTemperature();
}

module.exports = calcAll;