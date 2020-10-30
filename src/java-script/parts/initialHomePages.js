'use strict';

// - создаем глобальные переменные renderFilms и genres, pageNumber (будет использоваться
 в запросе при плагинации);
// - создаем функцию createCardFunc, она принимает параметрами imgPath, filmTitle, movieId 
создает li согласно макета, вешает на нее слушателем функцию activeDetailsPage
 c параметрами movieId и флагом false так как фильм из библиотеки (смотри пункт “3)” создание
  activeDetailsPage);
// - создаем функцию fetchPopularMoviesList (должна в запросе в виде переменной использовать pageNumber) в которой используется createCardFunc результат используя fragment кладем в ul, и не забываем заполнить этими же данными переменную renderFilms (она понадобится в работе следующим участникам);
// - создаем функцию fetchGenres которая забирает жанры и кладет их в переменную genres (она понадобится в работе следующим участникам);
// - запускаем функцию fetchPopularMoviesList и fetchGenres.
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
