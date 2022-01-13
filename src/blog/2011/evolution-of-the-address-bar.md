---
title: The Evolution of the Address Bar
intro: While studying at the University of Lincoln one of their research projects looked at the value of their ac.uk domain. I was asked to write a short post about the changes happening in address bars of 'modern' browsers.
type: article
tags:
date: 2011-04-18
canonical: https://linkingyou.blogs.lincoln.ac.uk/2011/04/18/the-evolution-of-the-address-bar/
---

In the early browsers the address bar was simply a box where users typed the address of the webpage they needed to get to and then clicked a large ‘go’ button. As browsers developed so did the functionality of the address bar, one of the basic updates came with browsers remembering the viewing history of the user. When a user wanted to go back to a site they had visited in the past the browser began to recognise the URL as it was typed from the history and returned suggestions.

Recently web development has been shifting with the new technologies that are being developed; new standards such as HTML5 and CSS3 mixed with the increased use AJAX techniques all meant that browsers had to shift and change to keep up with them. On of the major changes that came into the browser around the shift of web 2.0 was a major update to how users use the address bar.

The update of the address bar between FireFox 2 and FireFox 3 wasn’t just in the change of name (unofficially known as the ‘Awesome Bar’) or change in design. The address bar became more of a global search of your browser based upon the user’s bookmarks and page history, matching words and phrases to text within URLs, page titles and tags on the page, not just from the beginning of the URL, but text that appears throughout the URL. The results returned were then ranked in the address bar drop-down based upon ‘frecency’ – a mixture between the most frequency viewed pages and the recency of visiting the suggested page.

This feature has been adapted and brought across to the other main browsers, Google implements a similar technique in Chrome’s ‘Onmibox’ however also expanding this functionality across to the user’s search history, as well as opening up the Omnibox API, allowing developers to write their own plugins to expand the address bar function further.

Furthermore the address bar is not just about remembering the history of the user, Chrome started to implement the ability to search the internet straight from the address bar, bypassing the Google homepage. This combined with several existing features allowed Chrome to firsly suggest popular searches through Google Suggest (http://lncn.eu/fgq) and suggest previous searches from the user’s history (http://lncn.eu/em8). This provision means that some users have privacy concerns as companies such as Google log the search queries, as a result Chrome has implemented incognito browser, in FireFox known as Private Browsing, which prevents these logs and many other things from being created.

During the production of FireFox 3 Mozilla’s Mike Beltzner said:

> “I confidently predict that the Awesome Bar is going to change the way people navigate the web…”

Within comments on a blog post by a developer at Mozilla relating to the the beta release of FireFox 3 specifically about the Awesome Bar, users were stating just how much it had changed how they use their browsers:

> “Yes, I’ve found the biggest advantage is that you don’t have to redo web searches that you did before. And if you do want to redo a web search, you can just type in one or two of the keywords and firefox will find the search page in your history. Wonderful!” – [David Nelson](http://www.dria.org/wordpress/archives/2008/04/17/628/comment-page-1/#comment-57983)

> “I have been using Firefox 3 since the first beta and after I type two or three letters in the URL bar, the page I want is usually in the top three results.” – [Neelark](http://www.dria.org/wordpress/archives/2008/04/17/628/comment-page-1/#comment-58037)

> “AwesomeBar really made my life easier, no need to open bookmark, no need to search for history. Just simply type and enter.” – [Karbonfootprint](http://www.dria.org/wordpress/archives/2008/04/17/628/comment-page-1/#comment-60471)

The practical consequences of these developments in the address bar is that users no longer need to remember full URLs, instead users can simply remember keywords within the URL, page title, or similar and then use the address bar to get to the page they had been on.

The implications of this for those building sitemaps is that URL design and query strings need to contain useful and meaningful information that relates to the page content. For example acronyms that may mean something to internal staff, outside to the average user the acronyms are rarely memorable to external users.

Running through the list of URLs that Alex Bilbie posted (http://lncn.eu/i49) there are many URLs that make little sense to external users such as http://www.lincoln.ac.uk/cjmh/. The sections in this domain that are most likely to be picked up for searching is ‘lincoln’ and ‘cjmh’, while almost certain the ‘lincoln’ element will be remembered, the ‘cjmh’ will not. Additionally the page heading – Criminal Justice and Mental Health, isn’t included in the page title, meaning that all the advantages of the Awesome Bar remembering keywords in the URL, title, etc are lost. The URL and the page title, held within the HTML `<title>` tag, has to reflect the page content, allowing the user to benefit from the new features of the evolved address bar.

Further Reading:

- Awesome Bar: FireFox’s Next Killer Feature – http://lncn.eu/inu
- Chrome OmniBox – http://lncn.eu/g46
- IE8 Smart Address Bar – http://lncn.eu/cip
