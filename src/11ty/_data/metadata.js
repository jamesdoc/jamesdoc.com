const { trello } = require("../../../config.js");

module.exports = () => {
  return {
    "title": "James Doc",
    "subtitle": "Sitting at the intersection of Christianity and technology…",
    "url": "https://jamesdoc.com",
    "feed": {
      "url": "https://jamesdoc.com/blog/feed.xml"
    },
    "author": {
      "name": "James Doc"
    },
    "metaImg": "/_assets/img/twitter.jpg",
    "description": "Web Developer | Studied Web Technologies at the University of Lincoln | Currently living in London | Lover of tea | Tweeting @jamesdoc",
    "readingListId": trello.readingList.boardId,
  };
}
