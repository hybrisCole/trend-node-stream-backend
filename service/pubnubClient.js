const PubNub = require('pubnub');
const pubnubClient = new PubNub({
  publishKey   : process.env.PUBNUB_PUBLISH_KEY,
  subscribeKey : process.env.PUBNUB_SUBSCRIBE_KEY,
});

module.exports = pubnubClient;
