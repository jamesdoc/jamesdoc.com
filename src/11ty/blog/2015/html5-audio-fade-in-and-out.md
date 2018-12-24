---
title: HTML5 audio fade in and out
type: article
tags: code
date: 2015-04-22 11:04:19
---
<p> I&rsquo;ve just discovered that the <code>animate</code> function within jQuery can provide more than just visual animation. One such &lsquo;animation&rsquo; is adjusting the volume in the audio tag, thus creating a good method for creating fade in or fade out:</p><pre><code>
$(‘.btn-fadeout’).on(‘click’, function(e) {
	e.preventDefault();
	audio_player = $(‘audio.audio_player`);
	audio_player.animate(
		{ volume: 0 }, // Target volume
		500, // How long should the fadeout take
		function() {
			audio_player[0].pause(); // Pause the audio
			audio_player[0].currentTime = 0; // Be kind, rewind.
			audio_player[0].volume = 1; // Reset volume
		}
	);
}
</code></pre>
