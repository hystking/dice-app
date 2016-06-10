import _ from "lodash"
import Root from "./views/root"
import React from "react"
import {render} from "react-dom"
import io from "socket.io-client"
import getRandomNumber from "./effects/get-random-number"

export default function index() {
  const socket = io("/")
  const root = document.getElementById("root")
  let id = null

  function setNumber(id, number) {
    socket.emit("set number", {id, number})
  }

  function connectUser() {
    socket.emit("connect user")
    id = -1
  }

  socket.on("id", _id => {
    id = _id
    socket.emit("set number", {
      id,
      number: getRandomNumber(),
    })
  })

  socket.on("state", state => {
    const {users} = state
    render(<Root {...{id, users, setNumber, connectUser}}/>, root)
  }) 

  socket.emit("request state")
}
