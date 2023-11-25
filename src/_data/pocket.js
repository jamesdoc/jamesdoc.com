require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");
const cacheLength = '1d';
const url = `https://getpocket.com/v3/get?favorite=1&consumer_key=${process.env.POCKET_CONSUMER}&access_token=${process.env.POCKET_ACCESS}`;
const dayjs = require("dayjs");

module.exports = async function() {

  let pocketCache = new EleventyFetch.AssetCache("pocket" );

  if (pocketCache.isCacheValid(cacheLength)) {
    console.log("[ 👖 ] Serving pocket data from the cache…");
    return pocketCache.getCachedValue();
  }

  return new Promise(async (resolve, reject) => {

    console.log("[ 👖 ] Getting pocket articles…");

    const pocketResults = await EleventyFetch(url, {
      duration: cacheLength,
      type: "json"
    });


    let formattedPocket = [];
    Object.keys(pocketResults.list).forEach((r) => {
      pocketResults.list[r].sort = pocketResults.list[r].time_favorited;
      pocketResults.list[r].time_added = dayjs.unix(pocketResults.list[r].time_added).toISOString();
      pocketResults.list[r].time_read = dayjs.unix(pocketResults.list[r].time_read).toISOString();
      pocketResults.list[r].time_updated = dayjs.unix(pocketResults.list[r].time_updated).toISOString();
      pocketResults.list[r].time_favorited = dayjs.unix(pocketResults.list[r].time_favorited).toISOString();
      formattedPocket.push(pocketResults.list[r]);
    });

    formattedPocket = formattedPocket.sort((a, b) => {
      return b.sort - a.sort;
    });

    // console.log(dayjs.unix(formattedPocket[0].time_read))

    console.log('[ 💾 ] Imported from Pocket')
    pocketCache.save(formattedPocket, "json");

    resolve(formattedPocket);
    reject(rejected);

  });

};

function rejected(e) {
  console.error(e);
}
