const Twitter = require('twitter');
const _ = require('lodash');
const WOEID_CR = 26808805;
const WOEID_GLOBAL = 1;
const WOEID_USA = 23424977;
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//TODO: Every 5min
client.get('trends/place', {id: WOEID_USA},  function(error, trendsPlaceData, response) {
  if (error) {

  }
  const topVolumeTrendsQuery = _.chain(trendsPlaceData[0].trends)
    .map(({name, tweet_volume}) => {
      return {
        name,
        tweet_volume,
      };
    })
    .orderBy('tweet_volume')
    .take(5)
    .map('name')
    .join(',')
    .value();

  console.log(topVolumeTrendsQuery);
  var stream = client.stream('statuses/filter', {track: topVolumeTrendsQuery.map('name').join(',').value()});
  var i = 0;
  stream.on('data', function(event) {
    console.log('----');
    i++;
    const hashtags = _.chain(event.entities.hashtags).map('text').join(' ').value();
    console.log(`@${event.user.name} : ${event.text} ${hashtags} ${i}`);
    console.log('----');
  });

  stream.on('error', function(error) {
    console.log(error);
    throw error;
  });
});
