const express = require("express")
const http = require("http")
const SocketIO = require("socket.io")

const PORT = 3000

function server() {
  const app = express()
  const httpApp = http.Server(app)
  const io = SocketIO(httpApp)

  httpApp.listen(PORT, function () {
    console.log(`start listening on port ${PORT}`)
  })

  io.on("connection", function(socket) {
    console.log("a user connected")
  })
}

module.exports = server
