---
title: Reducing Wordpress database size
type: article
tags: code
date: 2015-01-09 09:30:14
---
<p> After having a Wordpress blog running for the last year with 320 users posting to it, and over 1500 posts on it I&rsquo;ve noticed that the database size has been rapidly approaching the 1Gb size. This struck me as much larger than expected- it only contains text, so why is it so large and how can I reduce it?</p><p> <em><strong>Safety warning</strong>:</em> Make sure you have a database backup before doing any of these&hellip;</p><h2> Turn off or reduce saved revisions</h2><p> By default Wordpress helpfully makes copies of each revision you make to a post, so if you accidentally delete something mid-edit it is possible to go back and retrieve it. This is a really useful feature, however I don&rsquo;t need an infinite number of revisions saved.</p><p> In the <code>wp_config.php</code> file you can set the number of revisions, or disable them entirely with the following. Here I keep the last 3, but you can set it to 0 or to any number that you want.</p><pre><code>define(&#39;WP_POST_REVISIONS&#39;, 3);</code></pre><p> This limits it going forward, however the database is still full of revisions so you need to go into the database and clear out the existing revisions with the following query:</p><pre><code>DELETE posts, relationships, meta
FROM [your_table_prefix]_posts posts
LEFT JOIN [your_table_prefix]_term_relationships relationships ON (posts.ID = relationships.object_id)
LEFT JOIN [your_table_prefix]_postmeta meta ON (posts.ID = meta.post_id)
WHERE posts.post_type = &#39;revision&#39;</code></pre><h2> Clear out the commentmeta table</h2><p> Being a Wordpress blog the site is constantly hit by spammers so I have installed Akismet. While this plugin automatically deletes spam comments after 15 days, it does leave a lot of data in the commentmeta table. I&rsquo;ve set up a little function that automatically purges this table of Akismet data every month running this query:</p><pre><code>DELETE FROM [your_table_prefix]_commentmeta WHERE meta_key LIKE &quot;%akismet%&quot;</code></pre>
