const axios = require("axios");
const { convert, LOWERCASE_TRANSFORMER } = require('url-slug')
const fs = require("fs");
const { trello } = require("../config.js");
const dayjs = require("dayjs");

const trelloApiBase = `https://api.trello.com/1/boards/${trello.readingList.boardId}/`;
const outputPath = `${__dirname}/../src/_data/readingList.json`;

const apiCallUrl = {
  cards: `${trelloApiBase}cards?customFieldItems=true&attachment_fields=all&attachments=cover`,
  lists: `${trelloApiBase}lists`,
  customFields: `${trelloApiBase}customFields`,
};

let log = function (message) {
  if (process.env.ELEVENTY_ENV === "production") return;
  console.log(message);
};

const slug = (str) => {
  const conf = {
    separator: "-",
    transformer: LOWERCASE_TRANSFORMER,
  };
  return convert(str, conf);
};

const refLookup = (refType) => {
  const ref = [];

  return axios
    .get(apiCallUrl[refType])
    .then((response) => {
      response.data.forEach((i) => {
        ref[i.id] = i.name;
      });

      return ref;
    })
    .catch((error) => console.log("Error :", error));
};

const cardLookup = (lists, customFields) => {
  return axios
    .get(apiCallUrl.cards)
    .then((response) => {
      var cards = [];

      response.data.forEach((item) => {
        const additional = {};
        item.customFieldItems.map((v) => {
          additional[slug(customFields[v.idCustomField])] =
            v.value.text || v.value.checked;
        });

        cards.push({
          id: item.id,
          list: lists[item.idList],
          name: item.name,
          url: item.shortUrl,
          additional: additional,
          readDate: item.due,
          epoch: dayjs(item.due).unix(),
          labels: item.labels,
          cover: item.cover,
          active: lists[item.idList] === "On the go" ? true : false,
        });
        // log(`📖 ${item.name}`);
      });
      storeCards(cards);
      return cards;
    })
    .catch((error) => console.log("Error :", error));
};

const storeCards = (cards) => {
  fs.writeFile(outputPath, JSON.stringify(cards, null, "\t"), (err) => {
    if (err) {
      console.log(err);
      return;
    }
    log(`Data saved to: ${outputPath}`);
  });
};

axios.all([refLookup("lists"), refLookup("customFields")]).then(
  axios.spread(function (lists, customFields) {
    cards = cardLookup(lists, customFields);
  })
);
