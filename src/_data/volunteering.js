const roles = [
  {
    role: "Volunteer",
    name: "FaithTech",
    url: "https://www.faithtech.com/communities/london",
    location: "London, UK",
    start: new Date("2026-01-01T00:00:00"),
    end: null,
  },
  {
    role: "Trustee / Elder",
    name: "The Globe Church",
    url: "https://globe.church",
    location: "London, UK",
    start: new Date("2023-01-01T00:00:00"),
    end: null,
  },
  {
    role: "Mentor / Project Manager",
    name: "Discipleship Tech",
    url: "https://discipleship.tech",
    location: "London, UK",
    start: new Date("2023-03-01T00:00:00"),
    end: null,
  },
  {
    role: "Co-Leader",
    name: "Kingdom Code",
    url: "https://kingdomcode.org.uk",
    location: "UK",
    start: new Date("2014-01-01T00:00:00"),
    end: new Date("2025-12-31T00:00:00"),
  },
  {
    role: "Holiday Leader",
    name: "Scripture Union",
    url: "https://content.scriptureunion.org.uk/holidays-events",
    location: "Cardiff and Salisbury, UK",
    start: new Date("2008-08-01T00:00:00"),
    end: new Date("2024-08-31T00:00:00"),
  },
  {
    role: "Digital Advisor",
    name: "The Church of England",
    url: "https://www.churchofengland.org/",
    location: "London, UK",
    start: new Date("2018-01-01T00:00:00"),
    end: new Date("2021-12-31T00:00:00"),
  },
];

// Ongoing roles first, then newest start date first
export default roles.sort((a, b) => {
  if (!a.end !== !b.end) return a.end ? 1 : -1;
  return b.start - a.start;
});
