const _ = require("lodash")

const DEFAULT_ROOT_STATE = {
  users: [],
}

const DEFAULT_USER_STATE = {
  id: null,
  prev_number: null,
  number: null,
  number_set_at: null,
}

module.exports = function root(state = DEFAULT_ROOT_STATE, action) {
  switch(action.type) {

    case "SET_NUMBER":
      return Object.assign({}, state, {
        users: _.map(state.users, user => {
          if(user.id !== action.id) {
            return user
          }
          return Object.assign({}, user, {
            prev_number: user.number,
            number: action.number,
            number_set_at: action.number_set_at,
          })
        }),
      })

    case "CONNECT_USER":
      const user = Object.assign({}, DEFAULT_USER_STATE, {
        id: action.id,
      })
      return Object.assign({}, state, {
        users: state.users.concat([user]),
      })

    case "DISCONNECT_USER":
      return Object.assign({}, state, {
        users: _.filter(state.users, ({id}) => id !== action.id),
      })

  }
  return state
}
