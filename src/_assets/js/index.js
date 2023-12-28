require('lite-youtube-embed');

console.log('Oh, hai there.');
console.log('There\'s not much in JSland, but feel free to go and poke around');
console.log('All the code is on GitHub. Go have a poke around');
console.log('https://github.com/jamesdoc/jamesdoc.com');

const tinylyticsCode = 'e4xmTUEjYDgdBLDNRF6w';

const nowPlaying = document.querySelector('.js-nowPlaying');

if (nowPlaying) {
    const path = `https://recentfm.rknight.me/now.php?username=jamesdoc`
    fetch(path)
    .then((response) => response.json())
    .then((data) => {
        nowcontainer = document.createElement('span')
        nowcontainer.className = 'recent-played'
        nowcontainer.innerHTML = `The most recent track scrobbled to Last.Fm was ${data.content.replace('🎧 ','')}.`
        nowPlaying.appendChild(nowcontainer)
    })
}

let script = document.createElement("script");
script.type = "text/javascript";
script.defer = true;
script.src = `https://tinylytics.app/embed/${tinylyticsCode}.js`;
document.body.appendChild(script);
