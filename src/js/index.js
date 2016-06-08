import _ from "lodash"
import Root from "./views/root"
import React from "react"
import {render} from "react-dom"

export default function index() {
  const socket = io()
  const root = document.getElementById("root")
  let id = null

  function setNumber(id, number) {
    socket.emit("set number", {id, number})
  }

  socket.on("id", _id => {
    id = _id
    socket.emit("set number", {
      id,
      number: _.random(1, 6),
    })
  })

  socket.on("state", state => {
    const {users} = state
    render(<Root {...{id, users, setNumber}}/>, root)
  }) 

  socket.emit("connect user")
}
