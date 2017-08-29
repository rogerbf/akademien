import xray from "x-ray"

export default () =>
  new Promise((resolve, reject) => {
    xray({
      filters: {
        trim: value => value.trim(),
        convertToBoolean: value => value.toLowerCase() === `ja`,
        parseDate: (value, divider = value.indexOf(`/`)) => ({
          month: parseInt(value.slice(divider + 1), 10),
          day: parseInt(value.slice(0, divider), 10)
        })
      }
    })(
      `http://www.svenskaakademien.se/svenska-akademien/almanackan/akademialmanackan/namnlista`,
      `tbody tr`,
      [
        {
          name: `.views-field-title | trim`,
          date: `.views-field-field-date-ymd | trim | parseDate`,
          included: `.views-field-field-main-name | trim | convertToBoolean`,
          info: `.views-field-title a@href`
        }
      ]
    ).paginate(`.next a@href`)((error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
