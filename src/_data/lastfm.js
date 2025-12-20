require("dotenv").config();
const { AssetCache } = require("@11ty/eleventy-fetch");

module.exports = () => {

  if (!process.env.LASTFM) {
    console.error("[ 🚨 ] Oh no! No Last.FM API key in the env…");
    return false;
  }

  let albumCache = new AssetCache("albums");

  if (albumCache.isCacheValid('1d')) {
    console.log("[ 📻 ]  Serving albums from the cache…");
    return albumCache.getCachedValue();
  }

  console.log('[ 📻 ] Fetching albums from Last.FM');

  return new Promise(async (resolve, reject) => {
    const albums = await fetchAlbums();

    albumCache.save(albums, "json");
    console.log(`[ 💾 ] Imported ${albums.length} albums`);
    resolve(albums);
  });

}

function fetchAlbums() {
  const lastFmApiKey = process.env.LASTFM;
  const albumEndpoint = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=jamesdoc&api_key=${lastFmApiKey}&format=json&period=1month&limit=5`;

  return fetch(albumEndpoint)
    .then((res) => {
      return {
        statusCode: res.status,
        data: res.json()
      };
    })
    .then((res) => {

      const albums = res.data.then(lastFmData => {
        return lastFmData.topalbums.album;
      });

      return albums;
    })

}
