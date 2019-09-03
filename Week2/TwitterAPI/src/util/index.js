const { api } = require('../services/api');
const qs = require('querystring');

// https://developer.twitter.com/en/docs/basics/authentication/api-reference/token
// https://developer.twitter.com/en/docs/basics/authentication/overview/application-only
const oauth2 = async ({ consumer_api_key, consumer_secret_key }) => {
  try {
    const auth = 'Basic ' + new Buffer.from(`${consumer_api_key}:${consumer_secret_key}`).toString('base64');

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': auth
      }
    }
    const requestBody = { grant_type: 'client_credentials' }
    const { data } = await api.post('/oauth2/token', qs.stringify(requestBody), config);
    
    return data;

  } catch (error) {
    return { message: error }
  }
}

// https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
const searchTweets = async ({token_type, access_token}, query) => {
  try {

    const { data } = await api.get(`/1.1/search/tweets.json?q=${encodeURIComponent(query)}`, {
      'headers': {
        'Cache-Control': 'no-cache',
        'Authorization': `${token_type} ${access_token}`   
      }
    })

    return data
  } catch (error) {
    return { message: error }
  }
}

module.exports = {
  oauth2, searchTweets
}