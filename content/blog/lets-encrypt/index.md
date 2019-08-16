---
title: Let's Encrypt!
description: ""
date: "2016-01-16"
---

The [Let's Encrypt](https://github.com/letsencrypt/letsencrypt) project became available in public beta a while ago and it's finally a great solution for free SSL certificates. I was using cheap Comodo SSL certificates in the past and it is just about to run out for this page. While the renewal would cost me \$10 a year, and that's just for a single domain, the Let's Encrypt option seems like a great and cheap alternative to use.

The setup and generating the certificate was very simple and fast, in fact it was much faster than buying a certificate and going through all the trouble of verification. The only problem, or rather, an inconvenience, is that the certificate is only valid for 90 days before it has to be renewed.

To solve this, I started looking into running the command via [cron](https://en.wikipedia.org/wiki/Cron), which is set to run every 2 months. Now now, I know 90 days is more than 2 months, I decided to go with 2 just to be on the safe side. The problem was that the command asks for user input, but that can be skipped by providing `--email [mail]` and `--agree-tos` flags.

While looking into how to renew certificates automatically, I've found an amazing project, named simply [le](https://github.com/Neilpang/le). Using this, it was even easier to get started since the `./le.sh install` already includes functionality to add certificates and also adds a cron job, which will attempt to renew all certificates each day at midnight. The only thing for us left to do is call the [script to issue certificates](https://github.com/Neilpang/le#just-issue-a-cert) for our domain(s) and the script will do the rest of work.
