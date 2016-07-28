# Lapin-Lumiere
Lapin Lumiere is an interactive art project from @hackhitchin, originally built for [EMF 2016](https://www.emfcamp.org/). It is a 4m high inflatable bunny, iluminated with RGB LED strips, which can be controlled by sending a tweet contianing a hashtag and a colour (either a hex string, or a named value from the [XKCD RGB color list](http://xkcd.com/color/rgb/). The project was powered by a [tessel 2](https://tessel.io).

----
## Notes
The project requires access to the Twitter streaming API. It looks for the API credentials in a `vars.json` file in the form:

    {
      "consumer_key":        "<CONSUMER_KEY>",
      "consumer_secret":     "<CONSUMER_SECRET>",
      "access_token":        "<ACCESS_TOKEN>",
      "access_token_secret": "<ACCESS_TOKEN_SECRET>"
    }
