# akademien

Unofficial interface for [svenskaakademien.se](http://www.svenskaakademien.se).

## usage

```javascript
import akademien from "akademien"

akademien.namedays.lookup(`gunilla`)
// {
//   name: 'Gunilla',
//   date: { month: 1, day: 30 },
//   included: true,
//   info: 'http://www.svenskaakademien.se/almanackan/gunilla'
// }

```

## api

### `.namedays.lookup(q)`

```q``` &lt;String&gt; or &lt;Date&gt;

### `.namedays.names`

&lt;Array&gt;

### `.namedays.scrape()`

Returns a &lt;Promise&gt;
