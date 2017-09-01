import names from "../names"

export default (name = ``) =>
  names.filter(entry => entry.name.toLowerCase() === name.toLowerCase()).pop()
