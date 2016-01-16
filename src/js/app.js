(function() {
  'use strict';
  var addProjectCount = function (count) {
    document.getElementById('project-count').innerText = count;
  };
  document.addEventListener('DOMContentLoaded', function () {
    addProjectCount(0);
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
