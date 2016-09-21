const sequence = require(`sequential-resolve`)
const range = require(`prefixed-range`)
const xray = require(`./xray.js`)

const paginationUrl = `http://www.svenskaakademien.se/svenska-akademien/almanackan/akademialmanackan/namnlista?page=`

const nameCount = () => new Promise((resolve, reject) => {
  xray(`${paginationUrl}0`, `.view-name-day-list .view-header`)((err, str) => {
    if (err) reject(err)
    resolve({ nameCount: parseInt(str.replace(/\D/g, ``)) })
  })
})

const namesPerPage = () => new Promise((resolve, reject) => {
  xray(`${paginationUrl}0`, [`tbody tr`])((err, rows) => {
    if (err) reject(err)
    resolve({ perPage: rows.length })
  })
})

const pageCount = () => new Promise((resolve, reject) => {
  Promise.all([nameCount(), namesPerPage()])
    .then(arr => Promise.resolve(Object.assign({}, arr[0], arr[1])))
    .then(stats => resolve(Math.floor(stats.nameCount / stats.perPage)))
    .catch(e => reject(e))
})

const names = url => new Promise((resolve, reject) => {
  xray(url, `tbody tr`, [{
    name: `a`,
    date: `.views-field-field-date-ymd | trim | parseDate`,
    included: `.views-field-field-main-name | trim | parseBool`,
    url: `a@href`
  }])((err, results) => {
    if (err) reject(err)
    resolve(results)
  })
})

module.exports = () => pageCount()
  .then(count => {
    return sequence(names, range(paginationUrl, { start: 0, end: count }))
  })
