import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { AssetCache } from "@11ty/eleventy-fetch";

const cacheLength = "1w";

export default async function () {
  if (!process.env.LASTFM) {
    console.error("[ 🚨 ] Oh no! No Last.FM API key in the env…");
    return [];
  }

  let albumCache = new AssetCache("albums");

  if (albumCache.isCacheValid(cacheLength)) {
    console.log("[ 📻 ] Serving albums from the cache…");
    return albumCache.getCachedValue();
  }

  console.log('[ 📻 ] Fetching albums from Last.FM');

  const albums = await fetchAlbums();

  albumCache.save(albums, "json");
  console.log(`[ 💾 ] Imported ${albums.length} albums`);
  return albums;
}

async function fetchAlbums() {
  const lastFmApiKey = process.env.LASTFM;
  const albumEndpoint = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=jamesdoc&api_key=${lastFmApiKey}&format=json&period=1month&limit=5`;

  const res = await fetch(albumEndpoint);
  if (!res.ok) {
    console.error(`[ 🚨 ] Last.FM fetch error: ${res.status}`);
    return [];
  }

  const lastFmData = await res.json();
  return lastFmData.topalbums.album;
}
