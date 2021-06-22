const generic = require('./')
const axios = require('axios')
const testDataUrl = 'https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json'

test('Testing getting source data and performing matching', async () => {
    const {data} = await axios.get(testDataUrl)
    generic.loadData({data, match: 'title', weight: 'rank'})
    const results = generic.match('godfather')
    expect(results.length).toBe(2)
    expect(results[0].title).toBe('The Godfather')
    expect(results[1].title).toBe('The Godfather: Part II')
  })
