let mix = require("laravel-mix");

mix.setPublicPath("./dist");
mix.sass("src/_assets/scss/main.scss", "_assets/css");
mix.js("src/_assets/js/index.js", "_assets/js");

mix.minify('./dist/_assets/css/main.css');
mix.minify('./dist/_assets/js/index.js');

mix.disableNotifications();
