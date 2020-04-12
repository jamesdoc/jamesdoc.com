const dayjs = require('dayjs');

module.exports = {
  siteData: {
    env: process.env.ELEVENTY_ENV,
    buildTime: dayjs().format("dddd, D MMMM YYYY H:mm"),
  },
  trello: {
    readingList: {
      boardId: 'HQyrNteG',
    },
  },
}
