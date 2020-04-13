const dayjs = require('dayjs');

module.exports = {

  readableDate: (dateObj) => {
    return dayjs(dateObj).format('dddd, D MMMM YYYY');
  },

  htmlDateString: (dateObj) => {
    return dayjs(dateObj).format('YYYY-MM-DD');
  },

  dateComparison: (dateObj, compareWith) => {
    return dayjs(dateObj).isBefore(dayjs(compareWith));
  },

  imgSuffix: (imgStr, suffix) => {
    const i = imgStr.lastIndexOf('.');
    const imgPath = imgStr.substring(0, i);
    const ext = imgStr.substring(i + 1);
    return `${imgPath}-${suffix}.${ext}`;
  },

  activeBook: (bookList) => {
    return bookList.filter(item => item.active);
  },

};
