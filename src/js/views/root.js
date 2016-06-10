import React from "react"
import _ from "lodash"
import getRandomNumber from "../effects/get-random-number"
import CTG from "react-addons-css-transition-group"

export default function Root({id, users, setNumber, connectUser}) {
  return (
    <div className="root">
      <div className="users">{
        _.map(users, user => {
          return (
            <div className="user" key={user.id}>
              <CTG transitionName="slide" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                <div className="user__number" key={user.number}>{user.number}</div>
              </CTG>
              <a className="user__set-number-button" href="javascript: void 0;" onClick={
                e => setNumber(user.id, getRandomNumber())
              }></a>
              {user.id === id ? <div className="user__me">Me</div> : null}
            </div>
          )
        })
      }</div>
      {id == null ? <a className="connect" href="javascript: void 0;" onClick={connectUser}>Connect</a> : null}
    </div>
  )
}
