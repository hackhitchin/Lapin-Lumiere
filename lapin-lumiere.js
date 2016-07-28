'use strict';
let xkcd = require('./xkcd-colors');

let getRGBFromDict = (colorName) => {
	let foundKey = Object.keys(xkcd).find(item => item ==colorName);
	console.log('foundKey: ', foundKey);
	if (foundKey) {
		return xkcd[foundKey]
	} else {
		return null;
	}
}

let findHex = (text) => {
	let matches = text.match(/#[a-f0-9]{6}/i);
	if (matches && matches.length > 0) {
		return matches[0].toLowerCase();
	} else {
		return null;
	}
}
let findColor = (text, hashtag) => {
	console.log('looking for colors in ', text);
	console.log('remove hashtag: ', hashtag);

	text = text.replace(/@[A-Z_]*/gi, '').split(hashtag).map(part => {
		return part.trim();
	}).join(' ').trim();

	console.log('text now: ', text);
	console.log(text.length);

	console.log('looking for an color in: ', text);
	let xkcdColor = getRGBFromDict(text, xkcd);

	if (xkcdColor) {
		console.log('Found color: ', xkcdColor);
		return xkcdColor;
	} else {
		console.log('Could not find a color - moving on');
	}

	console.log('Last attempt - look for the first hex code');
	let hex = findHex(text);
	if (hex) {
		console.log('Found hex color: ', hex);
		return hex;
	} else {
		console.log('Could not find a hex color - giving up');
	}
	return false;
}

exports.processTweet = (data, search_term) => {
	var channels = {
		red: 0,
		green: 0,
		blue: 0
	};
	console.log(data);
	var hexVal = findColor(data.text, search_term);
	var channelValues;

	if (!hexVal) return false;
	channelValues = hexVal.match(/[0-9a-f]{2}/gi);
	console.log(channelValues);
	Object.keys(channels).forEach((channel, index) => {
		channels[channel] = parseInt(channelValues[index], 16);
	})
	console.log(channels);
	return channels;

}