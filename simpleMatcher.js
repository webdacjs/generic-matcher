const { getSluggifiedStr } = require('./utils')
const filter = require('lodash.filter')

function simpleMatcher (query, data) {
  const sluggifiedQuery = getSluggifiedStr(query)
  const results = filter(data, x => x.canonical === sluggifiedQuery)
  return results
}

module.exports = simpleMatcher
