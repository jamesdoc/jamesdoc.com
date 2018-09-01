---
title: Backing up AWS S3 bucket to a local machine
type: article
tags: code
date: 2015-02-05 15:08:24
---

<p>There are lots of solutions that talk about making a copy of a local folder and sending it to an S3 bucket. The solution I’ve needed is the reverse of this; creating a local backup of an bucket.</p>

<h3>TlDr;</h3>

<p>Download <a href="http://s3tools.org/">s3tools</a> onto your server and configure it… Details on configuring are below.</p>

<h3>1. Create an AWS IAM User</h3>

<p>In the Security Credentials of the AWS console create a new IAM user. The user policy only needs read-only access to S3.</p>

<pre><code>{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:Get*",
        "s3:List*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
</code></pre>

<p>Make sure you note down the access keys, we’ll need them later.</p>

<h3>2. Download Amazon S3 Tools</h3>

<p>Amazon S3 Tools is a simple command line script that allows read / write access to S3 buckets.</p>

<p>You can download it via their <a href="http://s3tools.org/download">website</a>, or via your flavour of Linux repository. For Ubuntu that is just <code>sudo apt-get install s3cmd</code></p>

<h3>3. Configure</h3>

<p>Once installed you need to tell S3 Tools the access keys to Amazon, and a couple of other configuration settings. This is started by running <code>s3cmd —configure</code>. You will be asked for:</p>

<ul>
<li>the access key,</li>
<li>secret,</li>
<li>a password (to encrypt the local config, make one up and note it down),</li>
<li>a path for GPG (just press return for default),</li>
<li>use HTTPS (a good idea),</li>
</ul>

<p>Once the settings are entered you can then test the connection, and if everything works the settings can be saved.</p>

<h3>4. Download your bucket</h3>

<p>S3 Tools has a lot of <a href="http://s3tools.org/usage">options</a> to go back and forth between S3. A couple to note:</p>

<p><code>s3cmd ls</code> - Lists your buckets<br>
<code>s3cmd get s3://[bucket-name]/*</code> - Download your bucket</p>

<p>In my case I want to pull a directory within a bucket down, and if the files have changed over write them. The command I am using is:</p>

<p><code>s3cmd sync --check-md5 --force -r s3://[bucket-name]/[directory-name]/ /home/[backup-location]/</code></p>

<p>A quick explanation:</p>

<ul>
<li><code>sync</code> - Synchronises the directory</li>
<li><code>check-md5</code> - look at the md5 hash of a file to see if it has changed</li>
<li><p><code>force</code> - force overwrite the changed files rather than asking for permission</p>
-<code>r</code> - do it recursively</li>
</ul>

<p>It is worth noting that if you want to do a test run before writing data you can add in the <code>dry-run</code> option which will output what it would be doing, but not actually run it.</p>

<h3>5. Optional extra…</h3>

<p>To create a historical record you can then use a solution like <a href="http://bacula.org">Bacula</a> to keep various versions of the folder. However, that is the topic of another blog.</p>

