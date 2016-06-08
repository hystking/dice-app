const store = require("./store")
const uuid = require("uuid")

module.exports = function configureSocket(socket) {
  let id = null

  socket.on("request state", function(){
    socket.emit("state", store.getState())
  })
  
  socket.on("connect user", function(){
    id = uuid.v4()
    store.dispatch({
      type: "CONNECT_USER",
      id: id,
    })
    socket.emit("id", id)
  })

  socket.on("disconnect", function(){
    store.dispatch({
      type: "DISCONNECT_USER",
      id: id,
    })
  })

  socket.on("set number", function({id, number, number_set_at}){
    store.dispatch({
      type: "SET_NUMBER",
      id: id,
      number: number,
      number_set_at: number_set_at == null ? Date.now() + 1000 : number_set_at,
    })
  })
}
