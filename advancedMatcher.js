const { getTokenizedStr, getSluggifiedStr, getSortedResults } = require('./utils')
const filter = require('lodash.filter')

function intersect (a, b) {
  return filter(a, i => b.includes(i))
}

function advancedMatcher (name, data) {
  const sluggifiedQuery = getSluggifiedStr(name)
  // Partial Match
  const results = filter(data, x => x.canonical.includes(sluggifiedQuery))
  if (results.length > 0) {
    return getSortedResults(results, sluggifiedQuery)
  } else {
    // Tokenized Match
    const tokenizedQuery = getTokenizedStr(name)
    const resultsTokenized = filter(data, x => intersect(tokenizedQuery, x.tokenized).length > 1)
    if (resultsTokenized.length > 0) {
      return getSortedResults(resultsTokenized, sluggifiedQuery)
    }
  }
}

module.exports = advancedMatcher
