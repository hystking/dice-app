const store = require("./store")

module.exports = function configureSocket(socket, id) {
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
