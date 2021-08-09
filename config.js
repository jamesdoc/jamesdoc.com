const dayjs = require("dayjs");

module.exports = {
  siteData: {
    env: process.env.ELEVENTY_ENV,
    buildTime: dayjs().format("dddd, D MMMM YYYY H:mm"),
  },
  now: {
    location: {
      name: "London",
      url: "https://en.wikipedia.org/wiki/London",
    },
    employer: {
      name: "Vixen Labs",
      url: "https://vixenlabs.co",
    },
    toolbox: [
      {
        name: "Eleventy",
        url: "https://11ty.dev",
      },
      {
        name: "Laravel",
        url: "https://laravel.com",
      },
      {
        name: "Mix",
        url: "https://laravel-mix.com",
      },
      {
        name: "Rails",
        url: "https://rubyonrails.org",
      },
    ],
  },
  trello: {
    readingList: {
      boardId: "HQyrNteG",
    },
  },
};
