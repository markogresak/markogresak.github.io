var addProjectCount, apiPort, basePath, getRepositoriesCount, projectCount, repos;

apiPort = location.protocol === "https:" ? 9443 : 9080;

basePath = "" + location.protocol + "//gresak.io:" + apiPort;

repos = [
  {
    url: "https://api.github.com/users/markogresak",
    fallback_url: basePath + "/gh",
    repoCount: "public_repos"
  }, {
    url: basePath + "/bb",
    fallback_url: null,
    repoCount: "public_repos"
  }
];

projectCount = 0;

getRepositoriesCount = function(repo, callback, useFallback) {
  var request, url;
  url = useFallback ? repo.fallback_url : repo.url;
  if (!url) {
    return;
  }
  request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function() {
    if (request.status === 200) {
      return callback.call(null, repo, request.responseText);
    }
    return getRepositoriesCount(repo, callback, true);
  };
  return request.send();
};

addProjectCount = function() {
  var projectCountEl, repo, updateProjectCount, _i, _len, _results;
  projectCountEl = document.getElementById("project-count");
  updateProjectCount = function(repo, res) {
    var data;
    try {
      data = JSON.parse(res);
      projectCount += data[repo.repoCount] || 0;
    } catch (_error) {

    }
    return projectCountEl.innerText = "(" + projectCount + ")";
  };
  _results = [];
  for (_i = 0, _len = repos.length; _i < _len; _i++) {
    repo = repos[_i];
    _results.push(getRepositoriesCount(repo, updateProjectCount));
  }
  return _results;
};

addProjectCount();
