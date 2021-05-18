export { fetchPopularMoviesList, createCardFunc, fetchGenres };
import homepageGalleryTpl from '../templates/homepage-gallery.hbs';
import refsNavigation from '../refsNavigation.js';
import { activeDetailsPage } from './navigation.js';
import variables from '../variables.js';

function createCardFunc(renderFilms, total) {
  const ulPagination = document.querySelector('.pagination-list');
  const handlePagination = e => {
    console.log(e);
  };
  if (total >= 7) {
    ulPagination.innerHTML = '';
    for (let i = 1; i < 8; i += 1) {
      const liPagination = document.createElement('li');
      liPagination.id = i;
      liPagination.textContent = i;
      ulPagination.append(liPagination);
    }
    ulPagination.addEventListener('click', handlePagination);
  } else if (total < 7) {
    ulPagination.innerHTML = '';
    for (let i = 1; i < total + 1; i += 1) {
      const liPagination = document.createElement('li');
      liPagination.id = i;
      liPagination.textContent = i;
      ulPagination.append(liPagination);
    }
  }

  refsNavigation.homePageBtn.append(ulPagination);

  console.log(ulPagination);

  const renderFilmsList = homepageGalleryTpl(renderFilms);
  refsNavigation.homepageList.insertAdjacentHTML('beforeend', renderFilmsList);
  refsNavigation.homepageList.addEventListener('click', even => {
    if (even.target.tagName !== 'IMG') return;
    const idForSearching = Number(even.target.id);
    let forThrowDataSelect;
    renderFilms.find(element => {
      if (element.id === idForSearching) {
        forThrowDataSelect = element.id;
        return;
      }
    });
    activeDetailsPage(forThrowDataSelect, false);
  });
}

function fetchPopularMoviesList() {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=f2c0383f553427336b1984c7194d50ac&language=en-US&page=${variables.pageNumber}`,
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.results.length > 1) {
        refsNavigation.homepageList.innerHTML = '';
      }
      variables.renderFilms = [...data.results];
      variables.total = data.total_pages;
      createCardFunc(variables.renderFilms, variables.total);
    });
}

function fetchGenres() {
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=f2c0383f553427336b1984c7194d50ac&language=en-US`,
  )
    .then(res => res.json())
    .then(data => (variables.genres = [...data.genres]))
    .catch(err => console.log(err));
}
fetchPopularMoviesList();
fetchGenres();
