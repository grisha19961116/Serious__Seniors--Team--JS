export { fetchPopularMoviesList, createCardFunc, fetchGenres };
import homepageGalleryTpl from '../templates/homepage-gallery.hbs';
import refsNavigation from '../refsNavigation.js';
import { activeDetailsPage } from './navigation.js';
import variables from '../variables.js';

let checkRender = false;

function createCardFunc(renderFilms, flag = false) {
  if (variables.total < 7 || variables.total === 0) {
    refsNavigation.searchFormDom.reset();
    fetchPopularMoviesList();
    return;
  }
  const ulPagination = document.querySelector('.pagination-list');
  if (flag) {
    const elementsLi = Object.values(
      document.querySelectorAll('.pagination-list__li'),
    );
    elementsLi.map((el, i) => {
      el.classList.contains('pagination-list__li--active') &&
        el.classList.remove('pagination-list__li--active');
      el.textContent = i + 1;
      if (i === 0) {
        el.classList.add('pagination-list__li--active');
      }
      if (i === 7) {
        el.id = '';
        el.classList.add('pagination-list__li--total');
        el.textContent = `...${variables.total}`;
      }
    });
  }

  if (!checkRender) {
    checkRender = true;
    for (let i = 1; i < 9; i += 1) {
      const liPagination = document.createElement('li');
      liPagination.id = i;
      liPagination.textContent = i;
      liPagination.classList.add('pagination-list__li');
      if (i === 1) {
        liPagination.classList.add('pagination-list__li--active');
      }
      if (i === 8) {
        liPagination.id = '';
        liPagination.classList.add('pagination-list__li--total');
        liPagination.textContent = `...${variables.total}`;
      }
      ulPagination.append(liPagination);
    }
  }

  refsNavigation.homePageBtn.append(ulPagination);

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
      variables.total = parseInt(data.total_pages / 7) * 7;
      createCardFunc(variables.renderFilms);
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
