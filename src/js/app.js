(function() {
  'use strict';
  var addProjectCount = function (count) {
    if (count > 0) {
      document.getElementById('c').innerText = count;
      document.getElementById('cw').style.display = 'inline';
    }
  };
  document.addEventListener('DOMContentLoaded', function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users/markogresak', true);
    request.onload = function () {
      try {
        addProjectCount(JSON.parse(request.responseText).public_repos || 0);
      } catch (e) {}
    };
    request.send();
  });
})();
