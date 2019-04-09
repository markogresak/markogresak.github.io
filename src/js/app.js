(function() {
  'use strict';
  var d = document;
  var cb = function() {
    var el, i, l, h;
    for (el = d.getElementsByClassName('no-js'), i = el.length - 1; i >= 0; i--)
      el[i].remove();
    [
      'https://use.fontawesome.com/releases/v5.0.8/css/all.css',
      'css/lib.css',
    ].forEach(function(s) {
      l = d.createElement('link');
      l.rel = 'stylesheet';
      l.href = s;
      h = d.getElementsByTagName('head')[0];
      h.parentNode.insertBefore(l, h);
    });

    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users/markogresak', true);
    request.onload = function() {
      try {
        var count = JSON.parse(request.responseText).public_repos || 0;
        if (count > 0) {
          d.getElementById('c').innerText = count;
          d.getElementById('cw').style.display = 'inline';
        }
      } catch (e) {}
    };
    request.send();
  };
  if (
    d.attachEvent ? d.readyState === 'complete' : d.readyState !== 'loading'
  ) {
    cb();
  } else {
    d.addEventListener('DOMContentLoaded', cb);
  }
})();
