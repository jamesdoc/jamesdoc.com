const dayjs = require("dayjs");
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs
  .extend(advancedFormat)
  .extend(isSameOrBefore)
  .extend(isSameOrAfter);

module.exports = {
  readableDate: (dateObj) => {
    return dayjs(dateObj).format("dddd, D MMMM YYYY");
  },

  htmlDateString: (dateObj, format = 'YYYY-MM-DD') => {
    return dayjs(dateObj).format(format);
  },

  dateComparison: (dateObj, compareWith) => {
    return dayjs(dateObj).isBefore(dayjs(compareWith));
  },

  pastFromCollection: (collection) => {
    startDate = dayjs();
    return collection.filter(item => {
      return dayjs(item.data.date).isSameOrBefore(startDate, "day");
    })
  },

  futureFromCollection: (collection) => {
    startDate = dayjs();
    return collection.filter(item => {
      return dayjs(item.data.date).isSameOrAfter(startDate, "day");
    })
  },

  dateRange: (startDate, endDate) => {
    const start = dayjs(startDate);
    const formattedStart = start.format('D MMMM YYYY');

    // If start and end are the same… just return the start
    if (!endDate || start.isSame(endDate, 'day')) {
      return formattedStart;
    }

    const end = dayjs(endDate);
    const formattedEnd = end.format('D MMMM YYYY');

    // Check if the start and end years are different
    const isSameYear = start.isSame(end, 'year');
    const isSameMonth = start.isSame(end, 'month');

    // Build the formatted date range
    let formattedRange;
    if (isSameMonth && isSameYear) {
      formattedRange = `${start.format('D')} – ${formattedEnd}`;
    } else if (isSameYear && !isSameMonth) {
      formattedRange = `${start.format('D MMMM')} – ${end.format('D MMMM YYYY')}`;
    } else {
      formattedRange = `${formattedStart} – ${formattedEnd}`;
    }
    return formattedRange;
  },

  imgSuffix: (imgStr, suffix) => {
    const i = imgStr.lastIndexOf(".");
    const imgPath = imgStr.substring(0, i);
    const ext = imgStr.substring(i + 1);
    return `${imgPath}-${suffix}.${ext}`;
  },

  activeBook: (bookList) => {
    return bookList.filter((item) => item.active);
  },

  tagFilter: (posts, ignore) => {
    const returnPosts = {};
    const keys = Object.keys(posts);

    keys.forEach((key, index) => {
      if (ignore.indexOf(key) === -1) {
        returnPosts[key] = posts[key];
      }
    });

    return returnPosts;
  },

  splitlines: (input) => {
    const parts = input.split(' ');
    const lines = parts.reduce(function(prev, current) {
      if (!prev.length) {
        return [current];
      }

      let lastOne = prev[prev.length - 1];

      if (lastOne.length + current.length > 19) {
        return [...prev, current];
      }

      prev[prev.length - 1] = lastOne + ' ' + current;

      return prev;
    }, []);
    return lines;
  }
};
