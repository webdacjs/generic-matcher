const { getSluggifiedStr, getTokenizedStr } = require('./utils')
const filter = require('lodash.filter')
const simpleMatcher = require('./simpleMatcher')
const advancedMatcher = require('./advancedMatcher')
const config = {}

function loadData ({ data, match, filter, weight, ignore, mintokens, ignorePlural }) {
  config.data = data.map(item => ({
    ...item,
    weight: parseFloat(item[weight] || 1),
    canonical: getSluggifiedStr(item[match]),
    tokenized: getTokenizedStr(item[match], ignore || '', ignorePlural)
  }))
  config.filterField = filter
  config.mintokens = mintokens || 2
  config.ignorePlural = ignorePlural
}

function match (queryparam, filterparam) {
  if (!config.data) {
    console.log('The data is not lodaded yet. Please use the loadData function first')
    return
  }
  if (!queryparam) {
    return
  }
  const queryParamStr = String(queryparam)
  const preFilteredData = filterparam && config.filterField
    ? filter(config.data, x => x[config.filterField] === filterparam) : config.data
  const simpleResults = simpleMatcher(queryParamStr, preFilteredData)
  if (simpleResults.length > 0) {
    return simpleResults
  }
  const advancedResults = advancedMatcher(queryParamStr, preFilteredData, config)
  return advancedResults
}

module.exports = {
  match,
  loadData
}
