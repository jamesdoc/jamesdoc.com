import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { AssetCache } from "@11ty/eleventy-fetch";
import slugify from "@sindresorhus/slugify";
import config from "../../config.js";
const { trello } = config;
import dayjs from "dayjs";

const cacheLength = "1w";
const trelloApiBase = `https://api.trello.com/1/boards/${trello.readingList.boardId}/`;

export default async function () {
  if (!trello.readingList.boardId) {
    console.error("[ 🚨 ] Oh no! No Trello board ID in the config…");
    return [];
  }

  let readingListCache = new AssetCache("readingList");

  if (readingListCache.isCacheValid(cacheLength)) {
    console.log("[ 📖 ] Serving reading list from the cache…");
    return readingListCache.getCachedValue();
  }

  console.log("[ 📖 ] Fetching reading list from Trello…");

  const apiCallUrl = {
    cards: `${trelloApiBase}cards?customFieldItems=true&attachment_fields=all&attachments=cover`,
    lists: `${trelloApiBase}lists`,
    customFields: `${trelloApiBase}customFields`,
  };

  const refLookup = async (refType) => {
    try {
      const response = await fetch(apiCallUrl[refType]);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const ref = {};

      data.forEach((i) => {
        ref[i.id] = i.name;
      });

      return ref;
    } catch (error) {
      console.error(`[ 🚨 ] Trello ${refType} fetch error:`, error);
      return {};
    }
  };

  const cardLookup = async (lists, customFields) => {
    try {
      const response = await fetch(apiCallUrl.cards);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const cards = [];

      data.forEach((item) => {

        const additional = {};
        item.customFieldItems.map((v) => {

          const fieldKey = slugify(customFields[v.idCustomField]);

          // Value of a field is returned as text, checked, or number…
          const value = v.value?.text ?? v.value?.checked ?? v.value?.number;
          if (value !== undefined) {
            additional[fieldKey] = value;
          }
        });

        cards.push({
          id: item.id,
          list: lists[item.idList],
          name: item.name,
          url: item.shortUrl,
          additional: additional,
          startDate: item.start,
          readDate: item.due,
          notes: item.desc,
          epoch: item.due ? dayjs(item.due).unix() : null,
          labels: item.labels,
          cover: item.cover,
          active: lists[item.idList] === "On the go" ? true : false,
        });
      });

      return cards;
    } catch (error) {
      console.error("[ 🚨 ] Trello cards fetch error:", error);
      return [];
    }
  };

  try {
    const [lists, customFields] = await Promise.all([
      refLookup("lists"),
      refLookup("customFields"),
    ]);

    const cards = await cardLookup(lists, customFields);

    console.log(`[ 💾 ] Imported ${cards.length} books from Trello`);
    readingListCache.save(cards, "json");

    return cards;
  } catch (error) {
    console.error("[ 🚨 ] Reading list fetch error:", error);
    return [];
  }
};

