'use strict';

import homepageGalleryTpl from '../templates/homepage-gallery.hbs';

const refs = {
  homepageList: document.querySelector('.js-homepage-list'),
};

const renderFilms = null;


function createCardFunc(imgPath, filmTitle, movieId) {
  
  renderFilms = homepageGalleryTpl(movies);
  refs.homepageList.insertAdjacentHTML('beforeend', renderFilms);
}


const apiKey = 'f2c0383f553427336b1984c7194d50ac';
const baseUrl = 'https://api.themoviedb.org/3/search/movie';


const genres = null;
const pageNumber = null;



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
