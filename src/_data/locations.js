const locations = [
  {
    name: "Sutton",
    country: "UK",
    url: "https://en.wikipedia.org/wiki/Sutton,_London",
    start: new Date("1990-08-11T00:00:00"),
    end: new Date("1992-05-01T00:00:00"),
  },
  {
    name: "Worthing",
    country: "UK",
    url: "https://en.wikipedia.org/wiki/Worthing",
    start: new Date("1992-05-01T00:00:00"),
    end: new Date("2008-09-14T00:00:00"),
  },
  {
    name: "Lincoln",
    country: "UK",
    url: "https://en.wikipedia.org/wiki/Lincoln,_England",
    start: new Date("2008-09-14T00:00:00"),
    end: new Date("2011-06-08T00:00:00"),
  },
  {
    name: "Oxford",
    country: "UK",
    url: "https://en.wikipedia.org/wiki/Oxford",
    start: new Date("2011-06-08T00:00:00"),
    end: new Date("2013-12-19T00:00:00"),
  },
  {
    name: "London",
    country: "UK",
    url: "https://en.wikipedia.org/wiki/London",
    start: new Date("2013-12-19T00:00:00"),
    end: null,
  },
];

// Current location first (no end date), then newest start date first
export default locations.sort((a, b) => {
  if (!a.end !== !b.end) return a.end ? 1 : -1;
  return b.start - a.start;
});
