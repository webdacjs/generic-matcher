const slugify = require('slugify')
const soa = require('sort-objects-array')
const removeAccents = require('remove-accents')
const pluralize = require('pluralize')
const leven = require('leven')
const slugRegExp = /[^A-Za-z0-9 ]/g

function getSluggifiedStr (str) {
  return String(slugify(removeAccents(str), { lower: true, remove: slugRegExp }))
}

function removeAccentsPlural (str, ignorePlural) {
  const nonAccentedStr = removeAccents(str)
  const strWithPlural = ignorePlural
    ? nonAccentedStr.split(' ').map(x => pluralize.singular(x)).join(' ')
    : nonAccentedStr
  return strWithPlural
}

function getTokenizedStr (str, ignore, ignorePlural) {
  const ignoreArray = ignore ? ignore.split(',').map(x => x.toLowerCase()) : []
  return slugify(
    removeAccentsPlural(str, ignorePlural), { lower: true, remove: slugRegExp }
  ).split('-').filter(x => !ignoreArray.includes(x))
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
