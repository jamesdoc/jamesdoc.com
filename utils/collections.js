const dayjs = require('dayjs');

function getByDate(collection, dateFormat) {
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

exports.postsByYear = collection => {
  return getByDate(collection, 'YYYY');;
}

exports.posts = collection => {
  const posts = collection.getFilteredByGlob(["./src/blog/**/*.md"]);
  return posts.filter((post) => post.data.archived !== true);
}

exports.events = collection => {
  return collection.getFilteredByGlob(["./src/events/**/*.md"]);
}
