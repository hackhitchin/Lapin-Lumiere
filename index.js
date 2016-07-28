'use strict';

// Import the interface to Tessel hardware
var tessel = require('tessel');
const vars = require('./vars');
const tweets = require('tweets');
const lapin = require('./lapin-lumiere');

const stream = new tweets({
  consumer_key: vars.consumer_key,
  consumer_secret: vars.consumer_secret,
  access_token: vars.access_token,
  access_token_secret: vars.access_token_secret
});

const filter_term = '#lapinlumiere';

tessel.pwmFrequency(50);
var portA = tessel.port.A; // Select one of the two ports
var portB = tessel.port.B; // Select one of the two ports
var redPin = portA.pwm[0]; // Equivalent to portA.digital[0]
var greenPin = portA.pwm[1]; // Equivalent to portA.digital[0]
var bluePin = portB.pwm[0]; // Equivalent to portB.digital[1]

console.log('starting tweet scraper - looking for ' + filter_term);

stream
  .filter({track: filter_term});

stream
  .on('tweet', t => {
  	let colourData;

    const data = {
      text: t.text,
      id_str: t.id_str,
      name: t.user.name,
      screen_name: t.user.screen_name,
      img: t.user.profile_image_url_https,
      link: `https://twitter.com/${t.user.screen_name}/status/${t.id_str}`,
      created_at: t.created_at
    }
    console.log("Got a tweet!", data)
    colourData = lapin.processTweet(data, filter_term);
    if (colourData) {
	    console.log('Setting PWM values');
    	redPin.pwmDutyCycle(colourData.red / 255);
    	greenPin.pwmDutyCycle(colourData.green / 255);
    	bluePin.pwmDutyCycle(colourData.blue / 255);
    	console.log('finished processing tweet');
    } else {
    	console.log('no colourData apparently');
    }

  })

stream
  .on('reconnect', e =>
    console.log(`reconecting (${e.type})`, e)
  )
