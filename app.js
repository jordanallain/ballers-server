const fetch = require('node-fetch')
const btoa = require('btoa')
const fs = require('fs')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
// const url = require('url')

const app = express()
app.use(bodyParser.json())

// store user name and password for mysportsfeed API key in .env file with
// USERNAME=<username>
// PASSWORD=<password>
// format. following two lines retrieve key value pairs.
let userName = fs.readFileSync('./.env', {encoding: 'utf8'}).split('\n')[0]
let password = fs.readFileSync('./.env', {encoding: 'utf8'}).split('\n')[1]

// following two lines extract just the user name and password values
userName = userName.split('=')[1]
password = password.split('=')[1]

// set up host and port
const hostname = 'localhost'
const port = 4741

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/players', (req, res) => {
  fetch(`https://api.mysportsfeeds.com/v1.0/pull/nba/2017-2018-regular/cumulative_player_stats.json`, {
     method: "GET",
     mode: "cors",
     cache: "no-cache",
     credentials: "same-origin",
     headers: {
         "Content-Type": "application/json; charset=utf-8",
         "Authorization": "Basic " + btoa(userName + ":" + password)
     },
     redirect: "follow",
     referrer: "no-referrer"
   })
     .then(function (response) {
       return response.json()
     })
     .then((response) => res.status(200).send(response))
     .catch(console.error)
  // const response = JSON.stringify(players)
  // res.status(200).send(response)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
