const { oauth2, searchTweets } = require('./util')
const { twitter_api } = require('./config/credentials')
const fs = require('fs')
const path = require('path')

// How to use:
// node app.js siraj raval
const main = async () => {
  
  const token = await oauth2(twitter_api)
  
  const query = process.argv.slice(2).join(' ')

  const tweets = await searchTweets(token, query)
  console.log(tweets)

  const resultPath = path.resolve(__dirname, '..', 'results')
  const timestamp = new Date().getTime()
  const data = JSON.stringify(tweets)
  fs.writeFileSync(`${resultPath}/result_${query.replace(/ /g, '_')}_${timestamp}.json`, data)
}

main()

