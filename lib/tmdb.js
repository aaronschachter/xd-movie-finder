const config = require('../config').tmdb;

const baseUri = 'https://api.themoviedb.org/3/';
const authQuery = `api_key=${config.apiKey}`;

async function searchMovies(text) {
 const res = await fetch(`${baseUri}search/movie?query=${text}&${authQuery}`);
 const data = await res.json();

 return data.results;
}

module.exports = {
  searchMovies,
};

