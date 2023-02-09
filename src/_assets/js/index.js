console.log('Oh, hai there.');
console.log('There\'s not much in JSland, but feel free to go and poke around');
console.log('All the code is on GitHub. Go have a poke around');
console.log('https://github.com/jamesdoc/jamesdoc.com');


const nowPlaying = document.querySelector('.js-nowPlaying');

if (nowPlaying) {
    const path = `https://recentfm.rknight.me/now.php?username=jamesdoc`
    fetch(path)
    .then((response) => response.json())
    .then((data) => {
        nowcontainer = document.createElement('div')
        nowcontainer.className = 'recent-played'
        nowcontainer.style
        nowcontainer.innerHTML = `The most recent track scrobbled to Last.Fm was ${data.content}.`
        nowPlaying.appendChild(nowcontainer)
    })
}
