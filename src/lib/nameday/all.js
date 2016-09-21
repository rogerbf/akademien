const sequence = require(`sequential-resolve`)
const range = require(`prefixed-range`)
const xray = require(`./xray.js`)

const pageCount = 37

const paginationUrl = `http://www.svenskaakademien.se/svenska-akademien/almanackan/akademialmanackan/namnlista?page=`

const scrapeNames = url => new Promise((resolve, reject) => {
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

module.exports = () => sequence(
  scrapeNames,
  range(paginationUrl, { start: 0, end: pageCount })
)
