const express = require("express")
const http = require("http")
const SocketIO = require("socket.io")
const configureSocket = require("./configure-socket")
const store = require("./store")
const _ = require("lodash")
const uuid = require("uuid")

const PORT = 3000

function server() {
  const app = express()
  const httpApp = http.Server(app)
  const io = SocketIO(httpApp)

  function emitState() {
    console.log("emit state")
    io.emit("state", store.getState())
  }

  httpApp.listen(PORT, function () {
    console.log(`start listening on port ${PORT}`)
  })

  app.get("/health-check", function(req, res) {
    res.send("I'm alive")
  })

  app.use(express.static("public"));

  io.on("connection", function(socket) {
    const id = uuid.v4()
    console.log("a user connected")
    store.dispatch({
      type: "CONNECT_USER",
      id: id,
    })
    configureSocket(socket, id)
    socket.emit("id", id)
  })

  store.subscribe(_.throttle(emitState, 250))
}

module.exports = server
