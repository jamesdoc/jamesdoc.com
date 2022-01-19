---
title: Checking Which SSL Cert is Being Served
type: article
author: James Doc
date: 2021-03-18
tags: ["tech"]
intro: How can you quickly check what SSL cert is being served up for a domain? Sure you could check in the browser, but you might want to use the command line…
---

Over the last week I've been dealing with a number of issues relating to SSL certs; one discovery where the SSL cert expired yesterday, another standard update of a SSL cert, and then the fun of swapping from one server to another with different certs. In each of these cases it's important to know that the right certificate is in place.

You can check these things in the browser - the padlock icon next to the web address works… however jumping in and out of terminal, making sure that the browser hasn't cached anything, can get a bit annoying… So how do you do this in the terminal?

```bash
echo | openssl s_client -showcerts -connect jamesdoc.com:443 2>/dev/null | openssl x509 -inform pem -noout -text
```

This will output a whole load of things… but normally the most important things to look out for - where the cert was issued, and how long is it valid for?

```
Signature Algorithm: sha256WithRSAEncryption
Issuer: C=US, O=Let's Encrypt, CN=R3
Validity
    Not Before: Feb 10 09:00:30 2021 GMT
    Not After : May 11 09:00:30 2021 GMT
```

## Going through the command…

`openssl s_client -showcerts -connect jamesdoc.com:443`

first we're using OpenSSL's `s_client` [^sclient] which can be used as a debugging tool for connecting to a server using SSL, passing in a couple of options:

- `showcerts`: We want to see the SSL certificate
- `connect`: What server and port are we going to talk to? `443` is the typical port for SSL connections

There are [many more options](https://www.openssl.org/docs/man1.1.1/man1/openssl-s_client.html) you can pass in. But we don't need them here.

This command outputs a lot more than we need to know so we discard any errors ( `2>/dev/null`) and pipe (`|`) the response into another part of OpenSSL - [x509](https://www.openssl.org/docs/man1.0.2/man1/x509.html). It is described as a "certificate display and signing utility" [^x509]. We're using it here to review the output of `s_client` and the display the cert information.

`openssl x509 -inform pem -noout -text`

- `inform pem`: What format is the data that is being fed into the command - `s_client` gives is PEM (apparently).
- `noout`: Don't display the encoded version of the request
- `text`: Output the cert in text form

[^sclient]: [S-Client Manual](https://www.openssl.org/docs/man1.1.1/man1/openssl-s_client.html)
[^x509]: [x509 Manual](https://www.openssl.org/docs/man1.0.2/man1/x509.html)
