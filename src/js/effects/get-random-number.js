import _ from "lodash"

export default function getRandomNumber(prevNumber) {
  return 1 + (prevNumber + _.random(0, 4) | 0) % 6
}
