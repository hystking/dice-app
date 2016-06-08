import Root from "./views/root"
import React from "react"
import {render} from "react-dom"

export default function admin() {
  const socket = io()
  const root = document.getElementById("root")
  const id = -1

  function setNumber(id, number) {
    socket.emit("set number", {id, number})
  }

  socket.on("state", state => {
    const {users} = state
    render(<Root {...{id, users, setNumber}}/>, root)
  }) 

  socket.emit("request state")
}
