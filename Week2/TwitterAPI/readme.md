# Search words in Twitter API with NodeJS (Javascript)

### Requirements

Install NodeJS 10.15 or higher
[NodeJS](https://nodejs.org/en)

Create a Twitter developer account, create a App and get your Twitter credentials:
*consumer_api_key, consumer_secret_key, access_token, access_token_secret*
[Twitter Developer](https://developer.twitter.com)

### How to install 

Clone repository 
```
git clone https://github.com/rodrigoms2004/sirajraval_ml_course.git
```

Go to the folder TwitterAPI
```
cd sirajraval_ml_course/Week2/TwitterAPI/src/config
```

Inside there is a file called *credentials_example..js* with content:
```
const twitter_api = {
  consumer_api_key: 'PUT YOUR CONSUMER API KEY HERE',
  consumer_secret_key: 'PUT YOUR CONSUMER SECRET KEY HERE',
  access_token: 'PUT YOUR ACCESS TOKEN HERE',
  access_token_secret: 'PUT YOUR ACCESS TOKEN SECRET HERE'
}

module.exports = {
  twitter_api
}
```

Create a new file called *credentials.js* and put your twitter credentials in the respective variables
return to the root folder 
```
cp credentials_example.js credentials.js
cd ..
```

Install NodeJS packages with *npm*
```
npm install
```

### How to use

In command line run *app.js*, for instance search tweets with words *siraj raval*
```
node app.js siraj raval
```

It shows the results on screen and saves them to the *TwitterAPI/results* folder


## Useful Links

[Authentication - POST oauth2/token](https://developer.twitter.com/en/docs/basics/authentication/api-reference/token)
[Authentication - Application-only authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/application-only)

[Search Tweets - Standard search API](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets)


