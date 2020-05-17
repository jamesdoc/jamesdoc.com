---
title: Syncing your Mac with Google, without installing anything!
type: article
tags: tech
date: 2009-07-09 13:47:00
---

So yesterday I was trying to get my Mac and Google to talk nicely to each other… It was suitably painful and unpleasant to do, not because there aren't thousands of applications to do it for you, rather because I was doing it without the use of applications as Address Book, Mail and iCal can all talk to Google without installing anything extra.

Everything these days is going online, you no longer download your emails onto the computer and wipe them from the server, you use IMAP and have a copy on both, your calendar is stored on multiple devices such as your computer, your phone, your PDA, even your iPod and your address book is needed on these devices as well. Therefore you need a decent method of copying across the devices, preferably without installing any bloat onto your system.

Getting them all in sync is very simple to do, once you have got your head around it, some of the solutions are more elegant than others! So I am writing this one down so I don't forget!

## Apple Address Book to Google Contacts

When the iPhone and iPod Touch was released Apple updated Address Book to allow the sync between the two devices, however until you connect an iPhone/Touch to your Mac these settings are hidden. So if you own a iPhone/Touch you can ignore step one! One thing I would recommend is emptying one of the address books, I deleted all my records on Google, it saves removing duplicates later!

### Step One

In Finder navigate to /Users/%UserName%/Library/Preferences/ and find the file called com.apple.iPod.plist. This is basically a record of the iPods that get connected to this computer. Now you can open it up in a suitable text editor, I like SubEthaEdit, however TextEdit will work fine.

You will get a nice load of code called XML, we are interested in lines 13 and 14 where it says 'Family ID' on line 14 change whatever the integer is to '10001' as in the above image. Then save the file and close the text editor.

### Step Two

Right, with the plist file edited you can now open up Address Book and go into the preferences (âŒ˜ + ,). You will notice at the bottom of the General tab you have the options to synchronise with various online tools (MobileMe, Exchange, Yahoo and Google), we want to choose Google so check the 'Synchronize with Google' check box. A message will appear asking for your Google Account details, once entered you are all setup.

### Step Three

Head over to iSync and hit the sync button, Address Book and Google Contacts will the be synchronised. Each time you want to sync just head into iSync to do so.

## Apple Mail to Gmail

This one is nice and simple, I've had it up and running for a while now. It is basically setting up IMAP in Gmail nicely, and then getting Apple Mail to look at it sensibly!

### Step One

Load up Gmail in your preferre browser and head into the Settings, and then to 'Forwarding and POP/IMAP' the first thing we need to do is to enable IMAP access by clicking the 'Enable IMAP' radio button.

### Step Two

Before heading away from Gmail we need to head into the Labels settings. IMAP treats labels like folders and to get it working well with Apple Mail we need to create a couple of custom labels. The label we need to create is 'IMAP/Trash', you can create one for drafts ('IMAP/Drafts') and spam ('IMAP/Spam') if you want to as well.

### Step Three

That's us done in Gmail, now we need to open up Apple Mail and set up our Gmail account. To add a new account go to File/Add Account, fill out your name, email address, password and make sure that you do not check the automatic set up check box, then click next

For the account type select IMAP, and then change the incoming mail server to be imap.gmail.com and hit next. Your SMTP server should be set at smtp.gmail.com. Once all these details are filled in finish off the setup.

### Step Four

We now need to tweak a few settings here and there to get the folders sorted, head into Mail's preferences and over into accounts. Under Mailbox Behaviors check everything except drafts. Finally head into Advanced and then in the text box called 'IMAP Path Prefix' type in 'IMAP'.

### Step Five

Finally once the folders (or labels) have appeared in the left hand side bar select the 'Trash' folder and then go up to the menu item 'Mailbox/Use This Mailbox For/Trash'. You can then repeat for the labels that you created.

## iCal to Google Calendar

This isn't the nicest of methods, however it works... A couple of years back a protocol called CalDAV was dreamt up and has been implemented in both iCal in Leopard and Google Calendar. However rather than writing out the instructions for this one Google has a fairly simple method getting this one working here (<a href="http://www.google.com/support/calendar/bin/answer.py?answer=99358#ical">link</a>).
