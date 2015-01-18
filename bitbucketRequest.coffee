https = require "https"
http = require "http"
fs = require "fs"
basePort = 9000

getJSON = (options, onResult) ->
  try
    req = https.request options, (res) ->
      output = ""
      res.setEncoding "utf8"

      res.on "data", (chunk) ->
        output += chunk

      res.on "end", ->
        obj = null
        try
          obj = JSON.parse output
        catch
          obj = {}
        onResult.call null, res.statusCode, obj

      res.on "error", (err) -> console.log err
  catch e


  req.end()

bitbucketOptions =
  host: "api.bitbucket.org"
  port: 443
  path: "/2.0/repositories/markogresak"
  method: "GET"
  headers:
    "Content-Type": "application/json"

githubOptions =
  host: "api.github.com"
  port: 443
  path: "users/markogresak"
  method: "GET"
  headers:
    "Content-Type": "application/json"


app = (req, res) ->
  res.setHeader "Access-Control-Allow-Origin", "*"
  res.setHeader "Access-Control-Allow-Methods", "GET"
  res.setHeader "Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control"
  try
    if req.url is "/bb"
      getJSON bitbucketOptions, (statusCode, result) ->
        data =
          public_repos: result.size
        res.writeHead 200, {
          "content-type": "json"
        }
        res.end JSON.stringify data
    else if req.url is "/gh"
      getJSON githubOptions, (statusCode, result) ->
        data =
          public_repos: result.public_repos
        res.writeHead 200, {
          "content-type": "json"
        }
        res.end JSON.stringify data
    else
      res.end()
  catch e
    res.end()

serverListening = (protocol, port) ->
  console.log "Listening #{protocol} on port #{port}"

keyPath = ""
certPath = ""

if not keyPath or not certPath
  throw Error "No key/cert file specified"

sslOptions =
  key: fs.readFileSync keyPath
  cert: fs.readFileSync certPath


http.createServer app
  .listen basePort + 80, -> serverListening "http", basePort + 80

https.createServer sslOptions, app
  .listen basePort + 443, -> serverListening "https", basePort + 443

