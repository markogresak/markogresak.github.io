apiPort = if location.protocol is "https:" then 9443 else 9080
basePath = location.protocol + "//localhost:" + apiPort
repos = [
  {
    url: "https://api.github.com/users/markogresak"
    fallback_url: basePath + "/gh"
    repoCount: "public_repos"
  }
  {
    url: basePath + "/bb"
    fallback_url: null
    repoCount: "public_repos"
  }
]
projectCount = 0

getRepositoriesCount = (repo, callback, useFallback) ->
  url = if useFallback then repo.fallback_url else repo.url
  return if not url

  request = new XMLHttpRequest()
  request.open "GET", url, true
  request.onload = ->
    return callback.call null, repo, request.responseText if request.status is 200
    getRepositoriesCount repo, callback, true
  request.send()

addProjectCount = ->
  projectCountEl = document.getElementById "project-count"
  updateProjectCount = (repo, res) ->
    try
      data = JSON.parse res
      projectCount += (data[repo.repoCount] or 0)
    catch

    projectCountEl.innerText = "(#{projectCount})"


  getRepositoriesCount repo, updateProjectCount for repo in repos


addProjectCount()
