// Author: kKao4

function kKao4AddCustomCss(cssString) {
  const styleSheet = document.styleSheets[0];
  if (styleSheet.insertRule) {
    styleSheet.insertRule(cssString, styleSheet.cssRules.length);
  } else if (styleSheet.addRule) {
    styleSheet.addRule(cssString);
  }
}
