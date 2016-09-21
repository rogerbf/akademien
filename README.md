# akademien

Extract information from svenskaakademien.se.

``` javascript
const akademien = require('akademien')

akademien.nameday.today()
 .then(names => console.log(names))
// i.e. { main: ['Matteus'], alternate: [] }
```

## api

### `nameday.all()`
returns all available name-day data

### `nameday.today()`
returns todays name
