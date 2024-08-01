// Author: kKao4

function kKao4DecodeTranslateValue({ el }) {
  const element = typeof el !== "string" ? el : document.querySelector(el);
  const transformValue = window.getComputedStyle(element).getPropertyValue("transform");
  let translateX = 0,
    translateY = 0,
    translateZ = 0;
  if (transformValue.startsWith("matrix3d")) {
    const values = transformValue.match(/matrix3d\((.+)\)/)[1].split(", ");
    translateX = Math.abs(parseFloat(values[12]));
    translateY = Math.abs(parseFloat(values[13]));
    translateZ = Math.abs(parseFloat(values[14]));
  } else if (transformValue.startsWith("matrix")) {
    const values = transformValue.match(/matrix\((.+)\)/)[1].split(", ");
    translateX = Math.abs(parseFloat(values[4]));
    translateY = Math.abs(parseFloat(values[5]));
  } else {
    const match = transformValue.match(/translate(?:3d)?\(([^,]+),\s*([^,]+)(?:,\s*([^,]+))?\)/);
    translateX = match ? Math.abs(parseFloat(match[1])) : 0;
    translateY = match ? Math.abs(parseFloat(match[2])) : 0;
    translateZ = match && match[3] ? Math.abs(parseFloat(match[3])) : 0;
  }
  return { x: translateX, y: translateY, z: translateZ };
}
