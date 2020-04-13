module.exports = {

  posts: (collection) => {
    return collection.getFilteredByGlob(["./src/blog/**/*.md"]);
  },

}
