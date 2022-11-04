const dayjs = require("dayjs");
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

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
