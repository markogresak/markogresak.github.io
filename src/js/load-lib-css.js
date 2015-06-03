// From Optimize CSS delivery: https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery

var cb = function() {
  var l = document.createElement('link'); l.rel = 'stylesheet';
  l.href = 'css/lib.css';
  var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);
