# generic matcher

This tiny and fast module allows you to perform matching operations in any kind of generic data, provided as an array of objects. The module cleans the accents and the special characters and tries to perform an exact or partial match and returns the results back.

## Install

You can install with [npm]:

```sh
$ npm install --save generic-matcher
```

## Usage

The module requires to call the `loadData` function before any match operation is performed. The minimum parameters required are the `data` and `match` fields:


```js

const genericMatcher = require('generic-matcher')
genericMatcher.loadData({data: <data_here>, match: <field_to_match_here>})

```

Once the data is loaded you can call the `match` method:

```js

genericMatcher.match(<your_query_here>)

```

Please look at the `index.test.js` file to see a real example using a tiny movie database.

### Running tests

You can run the tests and check the functionality of this module using:

```sh
$ npm install && npm test
```

### License

Copyright © 2021, [Juan Convers](https://juanconvers.com).
Released under the [MIT License](LICENSE).