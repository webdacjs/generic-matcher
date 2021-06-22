const { getSluggifiedStr, getTokenizedStr } = require('./utils')
const filter = require('lodash.filter')
const simpleMatcher = require('./simpleMatcher')
const advancedMatcher = require('./advancedMatcher')
const config = {}

function loadData ({ data, match, filter, weight, ignore }) {
  config.data = data.map(item => ({
    ...item,
    weight: parseFloat(item[weight] || 1),
    canonical: getSluggifiedStr(item[match]),
    tokenized: getTokenizedStr(item[match], ignore)
  }))
  config.filterField = filter
}

function match (queryparam, filterparam) {
  if (!config.data) {
    console.log('The data is not lodaded yet. Please use the loadData function first')
    return
  }
  const preFilteredData = filterparam && config.filterField
    ? filter(config.data, x => x[config.filterField] === filterparam) : config.data
  const simpleResults = simpleMatcher(queryparam, preFilteredData)
  if (simpleResults.length > 0) {
    return simpleResults
  }
  const advancedResults = advancedMatcher(queryparam, preFilteredData)
  return advancedResults
}

module.exports = {
  match,
  loadData
}
