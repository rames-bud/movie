const moment = require('moment');
// const momentTimeZone = require('moment-timezone');

const timeZone = 'US/Eastern';

const now = () => moment.utc().format();

const getLocalTime = () => moment().tz(timeZone).format();

// const convertToLocalTime = time => momentTimeZone.tz(time, timeZone).format('LLLL');

module.exports = {
  now,
  getLocalTime
};
