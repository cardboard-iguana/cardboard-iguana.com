# Automate Netlify Builds with IFTTT

## In Netlify

* Go into your [Netlify](https://app.netlify.com/) site’s “Build & Deploy” settings.
* Select “Continuous Deployment”.
* Add a “Build hook”.
* Name it whatever you'd like and select the appropriate branch.
* Save this and Netlify will provide you with a long URL like `https://api.netlify.com/build_hooks/SOME_ID_HERE`. This is the URL you want.

## In IFTTT

* Go to “New Applet” on [IFTTT](https://ifttt.com/).
* Click “+this”.
* Select the “Date & Time” service.
* Select the interval you want to use and set the time (and optionally date) you want to use. In most cases, defining one or more “Every day at” triggers will be the right approach.
* Click “+that”.
* Select the “Webhooks” service.
* Select the “Make a web request” option.
* For the “URL” field, use the build hook URL you retrieve above from Netlify.
* For the “Method” field, choose “POST”.
* For the “Content Type” field, choose `application/x-www-form-urlencoded`.
* For the “Body” field, type `{}`.
* Click the “Create action” button.
* Rename the new applet and click “Finish”.

## References

* [Trigger a Netlify Build Every Day With IFTTT](https://www.11ty.dev/docs/quicktips/netlify-ifttt/).

- - - -

<span aria-hidden="true">👤</span> Nathan Acks
