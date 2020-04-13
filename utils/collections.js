module.exports = {

  posts: (collection) => {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/11ty\/blog\//) !== null;
    });
  },

}
