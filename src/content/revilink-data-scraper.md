# ⛏️ Revilink Data Scraper Terms and Conditions

The Revilink website ("Application") may collect data from remote web connections, automatically or manually, in accordance with the requests of users. This data is processed and displayed in the relevant fields for presentation to the user. This is necessary to provide the basic functionality of the Revilink application.

**Data Scraping Protocols**

The application can scrape data from links, except in cases where the link owner has not authorized the scraping. The scraped data usually includes publicly available meta-information, web page title, web page icon, creation date and other specific data.

The application does not perform any manipulation, data modification or data insertion on the web page that owns the link during the scraping process. It also does not intentionally stress or load the server that holds the link.

**User Obligations and Responsibilities**

The owner of the web page to which the link belongs undertakes the user load for everyone who can access his page. For cases where Revilink's payload is not desired, the blocking methods specified in this document may be used.

## Blocking Revilink Data Scraper

Revilink Data Scraper can be blocked by the link owner in various ways. The application respects robots and meta tag specifications and performs data scraping unless blocked by the link owner.

### Blocking Types

**Blocking RevilinkBot in specific route with no-scrape meta tag**

```
<meta name="RevilinkBot" content="no-scrape">
```

<br>

**All User-agent definitions on robots.txt are blocked by specific route restriction**

```
User-agent: *
Disallow: /abc/abc.html
```

<br>

**All User-agent definitions on robots.txt are blocked by path restriction**

```
User-agent: *
Disallow: /abc
```

<br>

**Blocking all User-agent definitions on robots.txt**

```
User-agent: *
Disallow: *
```

<br>

**Blocking RevilinkBot User-agent definition on robots.txt with specific route restriction**

```
User-agent: RevilinkBot
Disallow: /abc/abc.html
```

<br>

**Blocking on all routes by defining RevilinkBot User-agent on robots.txt**

```
User-agent: RevilinkBot
Disallow: /abc
```

<br>

**Blocking on all routes by defining RevilinkBot User-agent on robots.txt**

```
User-agent: RevilinkBot
Disallow: *
```

<br>

**Legal Warning**

Revilink does not guarantee the accuracy, timeliness and integrity of the data obtained as a result of the scraping process. Users use this data at their own risk. Revilink cannot be held liable for any damage or loss that may arise from the use of this data.

**Changes**

Revilink reserves the right to change these terms and conditions without prior notice. Changes will be effective as of the time they are posted.

**Legal Authority**

These terms and conditions are governed by the laws of the Republic of Turkey, in particular the Law on the Protection of Personal Data (No. 6698), the Turkish Penal Code and the Law on the Regulation of Electronic Commerce. In case of any dispute, the parties have the right to apply to the courts of the Republic of Turkey.

[revilink.io@gmail.com](mailto:revilink.io@gmail.com)
