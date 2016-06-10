import _ from "lodash"

export default function getRandomNumber() {
  return _.random(1, 3) + _.random(1, 3)
}
