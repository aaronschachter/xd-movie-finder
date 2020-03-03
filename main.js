const { Rectangle } = require('scenegraph');
const tmdb = require('./lib/tmdb');

let panel;
let searchString;

async function searchMovies() {
  const results = await tmdb.searchMovies(document.querySelector("#movieTitleTextField").value);

  console.log(results);

  panel.querySelector('#searchResults ul').innerHTML = results
    .map(item => `<li><a href="#">${item.title}</a><li>`)
    .join(''); 
}

function create() {
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
