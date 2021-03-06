const { getTokenizedStr, getSluggifiedStr, getSortedResults } = require('./utils')
const filter = require('lodash.filter')

function intersect (a, b) {
  return filter(a, i => b.includes(i))
}

function advancedMatcher (name, data, config) {
  const sluggifiedQuery = getSluggifiedStr(name)
  // Partial Match
  const results = filter(data, x => x.canonical.includes(sluggifiedQuery))
  if (results.length > 0) {
    return getSortedResults(results, sluggifiedQuery)
  } else {
    // Tokenized Match
    const tokenizedQuery = getTokenizedStr(name, config.ignore, config.ignorePlural)
    const resultsTokenized = filter(data, x => intersect(tokenizedQuery, x.tokenized).length >= config.mintokens)
    if (resultsTokenized.length > 0) {
      return getSortedResults(resultsTokenized, sluggifiedQuery)
    }
  }
}

module.exports = advancedMatcher
