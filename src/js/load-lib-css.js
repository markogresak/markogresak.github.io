// From Optimize CSS delivery: https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery

var cb = function() {
  var d = document;
  for (var el = d.getElementsByClassName('no-js'), i = el.length - 1; i >= 0; i--) el[i].remove();
  var l = d.createElement('link'); l.rel = 'stylesheet';
  l.href = 'css/lib.css';
  var h = d.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);
