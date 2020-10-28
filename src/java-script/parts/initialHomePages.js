'use strict';

const apiKey = 'f2c0383f553427336b1984c7194d50ac';
const baseUrl = 'https://api.themoviedb.org/3/search/movie';

const renderFilms = null;
const genres = null;
const pageNumber = null;

function createCardFunc(imgPath, filmTitle, movieId) {}

function fetchPopularMoviesList(pageNumber) {

const url = `${baseUrl}?page=${pageNumber}&key=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

function fetchGenres(params) {}

fetchPopularMoviesList();
fetchGenres();
