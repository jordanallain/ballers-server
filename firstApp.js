const fs = require('fs')
const http = require('http')
// const url = require('url')

const players = [
  { name: 'Kyrie Irving', position: 'PG' },
  { name: 'Jaylen Brown', position: 'SG' },
  { name: 'Jayson Tatum', position: 'SF' }
]

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

// create the server
const server = http.createServer((req, res) => {
  console.log(req)
  // if(req.method === 'GET') {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    // res.write('Where will this show')
    res.end(JSON.stringify(players))
  // }
})

// handle client errors
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

// listen on host and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// server.on('request', (req, res) => {
//   res.body = 'Hi?'
// })

// close server with message
server.on('close', () => {
  console.log('Goodbye')
})
