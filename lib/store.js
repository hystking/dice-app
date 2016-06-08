const {createStore} = require("redux")
const reducers = require("./reducers")

const store = createStore(require("./reducers"))

module.exports = store
