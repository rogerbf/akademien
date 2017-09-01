import names from "../names"

export default (input, month = input.getMonth() + 1, day = input.getDate()) =>
  names.filter(({ date }) => date.month === month && date.day === day)
