#!/usr/bin/node
const request = require('request');
const movieId = process.argv[2];
const movieUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

if (!movieId) {
  console.error('Please provide a movie ID as an argument.');
  process.exit(1);
}

request(movieUrl, function (error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('Error fetching movie data:', error || `Status Code: ${response.statusCode}`);
    return;
  }

  const characters = JSON.parse(body).characters;
  if (!characters || characters.length === 0) {
    console.error('No characters found for the given movie.');
    return;
  }

  printCharactersSequentially(characters, 0);
});

function printCharactersSequentially(characters, index) {
  if (index >= characters.length) {
    return;
  }

  request(characters[index], function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(JSON.parse(body).name);
      printCharactersSequentially(characters, index + 1);
    } else {
      console.error('Error fetching character data:', error || `Status Code: ${response.statusCode}`);
    }
  });
}

