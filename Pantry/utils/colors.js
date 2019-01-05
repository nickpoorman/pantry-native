// Returns a single rgb color interpolation between given rgb color array
function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5
  }
  var result = color1.slice()
  for (var i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]))
  }
  return result
}

// Interpolate between two colors completely, returning an array
function interpolateColors(color1, color2, steps) {
  var stepFactor = 1 / (steps - 1),
    interpolatedColorArray = []

  color1 = color1.match(/\d+/g).map(Number)
  color2 = color2.match(/\d+/g).map(Number)

  for (var i = 0; i < steps; i++) {
    interpolatedColorArray.push(
      interpolateColor(color1, color2, stepFactor * i)
    )
  }

  return interpolatedColorArray
}

// Convert a single RGB compnent to HEX
function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

// Generate Hex Colors
function generateHexColors(color1, color2, steps) {
  return interpolateColors(color1, color2, steps).map(c =>
    rgbToHex(c[0], c[1], c[2])
  )
}

export {
  generateHexColors,
  rgbToHex,
  componentToHex,
  interpolateColors,
  interpolateColor,
}
