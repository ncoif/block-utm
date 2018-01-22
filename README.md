UTM Blocker
================

Firefox extension to rewrite URLs. Remove the following parameters from the URL before loading it:
- `utm_source`   // This is the source of the link Example: Search Engine, another domain, or name of email list
- `utm_medium`   // This is the method of delivery. EX: Postcard, Email, or Banner Ad
- `utm_campaign` // This is a name that helps you keep track of your different campaign efforts Example: Fall_Drive, Christmas_Special
- `utm_term`     // This is a used to identify paid keywords. Example: speakers, monitors, shoes
- `utm_content`  // This is for split testing or separating two ads that go to the same URL

A better solution is probably to use a proper adblocker that simply blocks google analytics scripts, this project was just an experiment.

Loosely based on https://github.com/EFForg/https-everywhere
