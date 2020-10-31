---
title: Importing Yahoo Mail into Google Workspace
type: article
author: James Doc
date: 2020-10-31
intro:
---

I've recently had the interesting time of setting up a new Google Workspace (formerly GSuite) install. Migrating emails between previous service providers is handled by [Google's Data Migration Service](https://support.google.com/a/answer/9476255?hl=en). This work well (if a little slowly), however when setting up to import from a personal Yahoo Mail account [several](https://www.reddit.com/r/gsuite/comments/ila3cd/troubles_migrating_yahoo_mail_to_g_suite/) [users](https://support.google.com/a/thread/63715782?hl=en) report getting an error like this:

> Error communicating with the source mail server

_Tl;Dr - In the Account Security settings for Yahoo account you are importing you need to create an App Password and use that to log in._

⚠️ **Health warning:** Technology changes… so this is relevant until Google and/or Yahoo update their interfaces. This means that this will probably be out of date tomorrow.

Behind the scenes Google is using a technology called IMAP to pull emails from one mailbox into the other. Many email providers regard IMAP as a less secure option so are disabling it. This means that when putting in a valid yahoo email address and password into Google's Data Migration Service it is failing - Yahoo hasn't enabled IMAP for that user.

## Steps:

1. In the Yahoo _Account Information_ (not the email settings) navigate to _Account Security_ and find the button to _Manage App Passwords_.
2. From the drop down labeled _Select Your App_ click _Other App_ and type in 'Google Data Migration' then click _Generate_.
3. Copy this new password to your clipboard, and head into Google Data Migration Studio.
4. Set up the new Data Migration as before, however, make sure that rather than using your normal Yahoo account password you use the _App Password_ that is sitting in your clipboard which Yahoo gave you. This should get you past the initial set up step.
5. On the next screen you'll be asked which email accounts you want to import. Again put in your Yahoo email address, the generated _App Password_, and finally the Google Account you want to import the emails into.
6. The next step takes foorrrreeevvvveerrrrrr while the emails are pulled from Yahoo to Google.

Good luck!
