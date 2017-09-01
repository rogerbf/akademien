export default input =>
  input.constructor.name === `Date` && input.getDate && input.getMonth
