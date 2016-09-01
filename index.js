const client = require('./service/twitterClient');
const streamManager = require('./service/streamManager');
const _ = require('lodash');
// const WOEID_CR = 26808805;
// const WOEID_GLOBAL = 1;
const WOEID_USA = 23424977;
const getVolumeTrendsQuery = (trends) =>
  _.chain(trends)
    .map(({name, tweet_volume}) => {
      return {
        name,
        tweet_volume,
      };
    })
    .orderBy('tweet_volume')
    .take(8)
    .map('name')
    .join(',')
    .value();

client.get('trends/place', {id : WOEID_USA},  (error, trendsPlaceData) => {
  if (error) {
    throw error;
  }
  const topVolumeTrendsQuery = getVolumeTrendsQuery(trendsPlaceData[0].trends);
  client.stream('statuses/filter', {track : topVolumeTrendsQuery}, streamManager(topVolumeTrendsQuery));
});
