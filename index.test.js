const generic = require('./')
const axios = require('axios')
const testDataUrl = 'https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json'

test('Testing getting source data and performing matching', async () => {
  const { data } = await axios.get(testDataUrl)
  generic.loadData({ data, match: 'title', weight: 'rank', mintokens: 1 })
  const results = generic.match('godfather')
  const resultsToken = generic.match('indiana blahblah')
  const resultsEmpty = generic.match()
  const resultsNumeric = generic.match(12)
  expect(results.length).toBe(2)
  expect(results[0].title).toBe('The Godfather')
  expect(results[1].title).toBe('The Godfather: Part II')
  expect(resultsToken.length).toBe(1)
  expect(resultsToken[0].title).toBe('Indiana Jones and the Last Crusade')
  expect(resultsEmpty).toBe(undefined)
  expect(resultsNumeric[0].title).toBe('12 Angry Men')
})

test('Testing getting source data and performing matching ignoring the plural', async () => {
  const { data } = await axios.get(testDataUrl)
  generic.loadData({ data, match: 'title', weight: 'rank', mintokens: 2, ignorePlural: true }) //, ignorePlural: true})
  const results = generic.match('raider whatever lost')
  expect(results[0].title).toBe('Raiders of the Lost Ark')
  const results2 = generic.match('Lord whatever ring')
  expect(results2[0].title).toBe('The Lord of the Rings: The Fellowship of the Ring')
})
