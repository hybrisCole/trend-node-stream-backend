const _ = require('lodash');
const Rx = require('rx');

module.exports = (stream) => {
  const source = Rx.Observable.fromEvent(
  stream,
  'data',
  (event) => {
    const hashtags = _.chain(event.entities.hashtags).map('text').join(' ').value();
    const twitterText = `@${event.user.name} : ${event.text} ${hashtags}`;
    return twitterText;
  });

  source.subscribe(
  (twitterText) => {
    console.log(twitterText);
  },
  (err) => {
    console.log('Error: ' + err);
  },
  () => {
    console.log('Completed');
  });
  /* let i = 0;
  const streamData = [];
  stream.on('data', (event) => {
    i++;
    const hashtags = _.chain(event.entities.hashtags).map('text').join(' ').value();
    const twitterText = `@${event.user.name} : ${event.text} ${hashtags} ${i}`;
    streamData.push(twitterText);
  });

  stream.on('error', (streamError) => {
    // eslint-disable-next-line
    console.log(streamError);
    throw streamError;
  });*/
};
