import isDate from "./is-date"
import fromName from "./date-from-name"
import fromDate from "./names-from-date"

export default input => (isDate(input) ? fromDate(input) : fromName(input))
