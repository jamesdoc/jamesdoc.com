import dayjs from 'dayjs';

const getByDate = (collection, dateFormat) => {
  let postsByDate = {};
  let posts = collection.getFilteredByGlob(["./src/blog/**/*.md"]);
  posts.forEach(function (post) {

    // Skip if archived
    if (post.data.archived) { return }

    // Skip the iteration is there is no date
    if (!post.data.date) { return; }
    let d = dayjs(post.data.date).format(dateFormat)
    if (!postsByDate[d]) { postsByDate[d] = new Array(); }
    postsByDate[d].push(post);
  });
  return postsByDate;
}

export default {
  postsByYear: collection => {
    return getByDate(collection, 'YYYY');;
  },

  posts: collection => {
    const posts = collection.getFilteredByGlob(["./src/blog/**/*.md"]);
    return posts.filter((post) => post.data.archived !== true);
  },

  events: collection => {
    return collection.getFilteredByGlob(["./src/events/**/*.md"]);
  },

  tagList: collection => {
    // Get all posts
    const posts = collection.getFilteredByGlob(["./src/blog/**/*.md"]);
    const tagSet = new Set();

    // Extract all unique tags from posts
    posts.forEach(post => {
      if (post.data.tags) {
        const tags = Array.isArray(post.data.tags)
          ? post.data.tags
          : post.data.tags.split(/[,\s]+/).filter(t => t);

        tags.forEach(tag => {
          if (tag && tag.trim()) {
            tagSet.add(tag.trim());
          }
        });
      }
    });

    return Array.from(tagSet).sort();

  }
}
