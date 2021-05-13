import apiService from '../apiService.js';
import refsNavigation from '../refsNavigation.js';
import variables from '../variables.js';
import { fetchPopularMoviesList, createCardFunc } from './initialHomePages.js';

function fetchFilms() {
  if (variables.inputValue === '') {
    console.log(
      variables.inputValue,
      `variables.inputValue error empty string`,
    );
    return;
  }
  apiService
    .getFullRequest(variables.inputValue, variables.pageNumber)
    .then(dataFromApi => {
      if (dataFromApi.length === 0) {
        refsNavigation.searchFormErrorDom.replace(
          'search-form__error--hidden',
          'search-form__error--visibale',
        );
        variables.pageNumber = 1;
        fetchPopularMoviesList();
      } else {
        refsNavigation.homepageList.innerHTML = '';
        variables.renderFilms = [...dataFromApi.results];
        createCardFunc(variables.renderFilms);
      }
    })
    .catch(apiError => console.error(apiError));
}

function searchFilms(event) {
  event.preventDefault();
  variables.inputValue = refsNavigation.inputFormDom.value.trim();
  refsNavigation.searchFormDom.reset();
  fetchFilms();
}

refsNavigation.searchFormDom.addEventListener('submit', searchFilms);

export function plaginationNavigation(event) {
  const findById = event.currentTarget.id;
  if (findById === 'next') {
    variables.pageNumber += 1;
    refsNavigation.buttonPrev.classList.remove('hidden');
    refsNavigation.buttonNumber.textContent = variables.pageNumber;
  } else if (findById === 'prev') {
    variables.pageNumber -= 1;
    refsNavigation.buttonNumber.textContent = variables.pageNumber;
  }
  if (variables.pageNumber <= 1) {
    refsNavigation.buttonPrev.classList.add('hidden');
  }
  if (variables.inputValue === '') {
    fetchPopularMoviesList();
  } else {
    fetchFilms();
  }
}
