const dayjs = require('dayjs');

function getByDate(collection, dateFormat) {
  let postsByDate = {};
  let posts = collection.getFilteredByGlob(["./src/blog/**/*.md"]);
  posts.forEach(function(post) {
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
  return collection.getFilteredByGlob(["./src/blog/**/*.md"]);
}
