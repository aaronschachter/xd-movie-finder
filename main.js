const { Rectangle } = require('scenegraph');
const config = require('./config');

let panel;
let searchString;

/**
 * @param String path
 * @return String
 */
function getApiUrl(path, query) {
  const apiKey = config.apiKey;
  const apiUrl = 'https://api.themoviedb.org/3/';

  let url = `${apiUrl}${path}?api_key=${apiKey}`;

  if (query) {
    url = `${url}&query=${query}`;
  }

  return url;
}

async function fetchSearchResults(text) {
  const res = await fetch(getApiUrl('search/movie', text));

  return await res.json();
}

async function searchMovies() {
  console.log('searchMovies');

  const input = document.querySelector("#movieTitleTextField").value;

  if (!input) {
    alert('Search string required');
    return;
  }

  const data = await fetchSearchResults(input);

  console.log(data);

  panel.querySelector('#searchResults ul').innerHTML = data.results
    .map(item => `<li><a href="#">${item.title}</a><li>`)
    .join(''); 
}

function onTextChange() {
  console.log('onTextChange');
}

function create() {
  console.log('Creating Movie Finder panel');

  panel = document.createElement("div");
  panel.innerHTML = `
  <style>
    #searchResults li {
      border-bottom: 1px #ddd solid;
    }
    .show {
      display: block;
    }
    .hide {
      display: none;
    }
  </style>
  <form id="searchForm">
    <input type="text" id="movieTitleTextField" placeholder="Enter movie title" />
    <button id="ok" type="submit" uxp-variant="cta">Search</button>
    <div id="searchResults">
    <h2>Results</h2>
    <ul></ul>
    </div>
  </form>
  <div id="movieFinderWarning">
    Please select a rectangle.
  </div>

  `;

  panel.querySelector('#searchForm').addEventListener('submit', searchMovies);
//  panel.querySelector('#movieTitleTextField').addEventListener('oninput', onTextChange);

  return panel;
}

function show(event) {
  if (!panel) event.node.appendChild(create());
}

function update(selection) {
  const form = document.querySelector('#searchForm');
  const warning = document.querySelector('#movieFinderWarning');

  if (!selection || !(selection.items[0] instanceof Rectangle)) {
    form.className = 'hide';
    warning.className = 'show';
  } else {
    form.className = 'show';
    warning.className = 'hide';    
  }
}

module.exports = {
  panels: {
    movieFinder: {
      show,
      update
    }
  }
};
