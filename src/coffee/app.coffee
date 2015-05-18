addProjectCount = (count) -> document.getElementById("project-count").innerText = "(#{count})"
document.addEventListener "DOMContentLoaded", ->
  addProjectCount 0
  try
    request = new XMLHttpRequest()
    request.open "GET", "https://api.github.com/users/markogresak", true
    request.onload = -> addProjectCount JSON.parse(request.responseText).public_repos or 0
    request.send()
