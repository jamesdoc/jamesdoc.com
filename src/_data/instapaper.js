import dotenv from "dotenv";
dotenv.config();
import EleventyFetch from "@11ty/eleventy-fetch";
import OAuth from "oauth-1.0a";
import crypto from "node:crypto";
import dayjs from "dayjs";

const cacheLength = "1w";

export default async function () {
  if (!process.env.INSTAPAPER_CONSUMER_ID || !process.env.INSTAPAPER_CONSUMER_SECRET) {
    console.error("[ 🚨 ] Oh no! No Instapaper API key in the env…");
    return false;
  }

  if (!process.env.INSTAPAPER_TOKEN || !process.env.INSTAPAPER_SECRET) {
    console.error("[ 🚨 ] Oh no! No Instapaper access tokens in the env…");
    return false;
  }

  let instapaperCache = new EleventyFetch.AssetCache("instapaper");

  if (instapaperCache.isCacheValid(cacheLength)) {
    console.log("[ 📰 ] Serving Instapaper data from the cache…");
    return instapaperCache.getCachedValue();
  }

  console.log("[ 📰 ] Getting Instapaper liked articles…");

  const oauth = OAuth({
    consumer: {
      key: process.env.INSTAPAPER_CONSUMER_ID,
      secret: process.env.INSTAPAPER_CONSUMER_SECRET,
    },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return crypto.createHmac("sha1", key).update(base_string).digest("base64");
    },
  });

  const token = {
    key: process.env.INSTAPAPER_TOKEN,
    secret: process.env.INSTAPAPER_SECRET,
  };

  const requestData = {
    url: "https://www.instapaper.com/api/1.1/bookmarks/list",
    method: "POST",
    data: {
      folder_id: "starred",
    },
  };

  const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

  try {
    const response = await fetch(requestData.url, {
      method: "POST",
      headers: {
        ...authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(requestData.data),
    });

    if (!response.ok) {
      console.error(`[ 🚨 ] Instapaper API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const bookmarks = Array.isArray(data)
      ? data.filter((item) => item.type === "bookmark")
      : (data.bookmarks || []);

    const formattedBookmarks = bookmarks
      .sort((a, b) => b.time - a.time)
      .slice(0, 5)
      .map((bookmark) => ({
        ...bookmark,
        time: dayjs.unix(bookmark.time).toISOString(),
        progress_timestamp: bookmark.progress_timestamp
          ? dayjs.unix(bookmark.progress_timestamp).toISOString()
          : null,
      }));

    console.log("[ 💾 ] Imported from Instapaper");
    instapaperCache.save(formattedBookmarks, "json");

    return formattedBookmarks;
  } catch (error) {
    console.log(error);
    console.error("[ 🚨 ] Instapaper fetch error:", error);
    return [];
  }
};
