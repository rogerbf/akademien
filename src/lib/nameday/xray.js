const moment = require(`moment`)

const filters = {
  trim: (value) => {
    return typeof value === `string` ? value.trim() : value
  },
  parseBool: function (value) {
    return value === `Ja` ? true : false
  },
  parseDate: function (value) {
    const m = moment(value, `DD-MM`)
    return {
      day: m.format(`D`),
      month: m.format(`M`)
    }
  }
}

module.exports = require(`x-ray`)({ filters })
