const slugify = require('slugify')
const soa = require('sort-objects-array')
const removeAccents = require('remove-accents')
const leven = require('leven')
const slugRegExp = /[^A-Za-z0-9 ]/g

function getSluggifiedStr (str) {
  return String(slugify(removeAccents(str), { lower: true, remove: slugRegExp }))
}

function getTokenizedStr (str, ignore) {
  const ignoreArray = ignore ? ignore.split(',').map(x => x.toLowerCase()) : []
  return slugify(removeAccents(str), { lower: true, remove: slugRegExp }).split('-').filter(x => !ignoreArray.includes(x))
}

function getSortedResults (results, sluggifiedQuery) {
  const query = sluggifiedQuery.replace(/-/g, ' ')
  const resultsWithDistance = results.map(res => ({
    ...res,
    distance: leven(query, res.canonical.replace(/-/g, ' ')) * res.weight
  }))
  const sorted = soa(resultsWithDistance, 'distance')
  return sorted
}

module.exports = {
  getSluggifiedStr,
  getTokenizedStr,
  getSortedResults
}
