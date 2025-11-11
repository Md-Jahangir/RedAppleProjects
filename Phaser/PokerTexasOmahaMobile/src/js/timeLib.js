import moment from 'moment';
import momenttz from 'moment-timezone';

const timeZone = 'Asia/Calcutta';

const now = () => {
  return moment.utc().format();
};

const getLocalTime = () => {
  return moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
};

const getLocalDateFormat = (cronos) => {
  return moment(cronos).tz(timeZone).format('YYYY-MM-DD');
};

const getCurrentTimeStamp = () => {
  return moment().tz(timeZone).unix();
};

const convertToLocalTime = (time) => {
  return momenttz.tz(time, timeZone).format('YYYY-MM-DD HH:mm:ss');
};

const calculateTime = (diff) => {
  const diffDuration = moment.duration(diff);
  return {
    days: diffDuration.days(),
    hours: diffDuration.hours(),
    minutes: diffDuration.minutes(),
    seconds: diffDuration.seconds()
  };
};

const calculateTimeDiff = (firstdatetime, seconddatetime) => {
  const diff = moment(seconddatetime, 'DD/MM/YYYY HH:mm:ss').diff(moment(firstdatetime, 'DD/MM/YYYY HH:mm:ss'));
  return diff;
};

const calculateExpTime = (time) => {
  const finaldatetime = moment().add(time, 's');
  return momenttz.tz(finaldatetime, timeZone).unix();
};

const calculateTrackerTime = (input) => {
  const initialdatetime = moment(getLocalTime());
  const finaldatetime = moment(input);
  const counter = finaldatetime.diff(initialdatetime, 'seconds');
  return counter;
};

const checkExpTime = (time) => {
  const diff = moment.tz(time * 1000, timeZone).unix() - moment().tz(timeZone).unix();
  return diff > 0;
};

const checkCurrDateRange = (initial, final) => {
  const now = moment().tz(timeZone).format('YYYY-MM-DD');
  const initDate = moment(initial).tz(timeZone).format('YYYY-MM-DD');
  const finalDate = moment(final).tz(timeZone).format('YYYY-MM-DD');
  return moment(now).isBetween(initDate, finalDate, undefined, '[]');
};

const getCurrentTimestampMillis = () => {
  return moment().tz(timeZone).valueOf(); // Returns timestamp in milliseconds
};

const addSecondsToTimestampMillis = (seconds) => {
  return moment().tz(timeZone).add(seconds, 'seconds').valueOf(); // Returns timestamp in milliseconds
};

export {
  getLocalTime,
  convertToLocalTime,
  calculateTime,
  calculateExpTime,
  calculateTimeDiff,
  calculateTrackerTime,
  checkExpTime,
  now,
  getCurrentTimeStamp,
  checkCurrDateRange,
  getLocalDateFormat,
  getCurrentTimestampMillis,
  addSecondsToTimestampMillis
};
