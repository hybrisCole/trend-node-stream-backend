const _ = require('lodash');
const Rx = require('rx');
const pubnubClient = require('./pubnubClient');

module.exports = (topVolumeTrendsQuery) =>
  (stream) => {
    const source = Rx.Observable.fromEvent(
    stream,
    'data',
    (event) => {
      const hashtags = (event.entities) ? _.chain(event.entities.hashtags).map('text').join(' ').value() : '';
      const user = (event.user) ? `@${event.user.name}` : '';
      const text = (event.text) ? event.text : '';
      return `${user} : ${text} ${hashtags}`;
    })
    .buffer(() => { return Rx.Observable.timer(1000); })
    .scan((accumulator, currentValue) => {
      const newAccumulator = _.clone(accumulator);
      // current value will always be an array bc of the buffer op.
      _.each(currentValue, (twitterText) => {
        newAccumulator.forEach((value, key) => {
          if (_.includes(twitterText, key)) {
            newAccumulator.set(key, value + 1);
          }
        });
      });
      return newAccumulator;
    }, new Map(_.chain(topVolumeTrendsQuery).split(',').map((trend) => {
      return [trend, 0];
    }).value()));

    source.subscribe(
    (trendCountData) => {
      // eslint-disable-next-line
      console.log(`sending trend count... ${Array.from(trendCountData)}`);
      pubnubClient.publish({
        channel : 'trendnode:count',
        message : Array.from(trendCountData),
      });
    },
    (err) => {
      // eslint-disable-next-line
      console.log('Error: ' + err);
    },
    () => {
      // eslint-disable-next-line
      console.log('Completed');
    });
  };
