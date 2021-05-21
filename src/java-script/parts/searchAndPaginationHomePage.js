import { Number, Object } from 'core-js';
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
        variables.total = dataFromApi.total_pages;
        createCardFunc(variables.renderFilms, variables.total);
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

let increase = 0;

export function paginationNavigation(event) {
  const findById = event.originalTarget.id;
  let elementsLi = document.querySelectorAll('.pagination-list__li');
  elementsLi = Object.values(elementsLi);

  if (Number(findById) === 1) {
    elementsLi.map((el, i) => {
      el.classList.contains('pagination-list__li--active') &&
        el.classList.remove('pagination-list__li--active');
      if (i + 1 === Number(findById)) {
        el.classList.add('pagination-list__li--active');
      }
    });

    refsNavigation.buttonPrev.classList.add('hidden');
    variables.pageNumber = 1;
  }

  if (Number(findById) > 1) {
    if (increase <= 7) {
      increase = Number(findById);
    }
    if (increase > 7) {
      increase = increase + 1;
    }

    variables.pageNumber = increase;

    console.log(
      variables.pageNumber,
      `variables.pageNumber Number(findById) > 1`,
    );
    console.log(increase, `Number(findById) > 1`);

    elementsLi.map((el, i) => {
      el.classList.contains('pagination-list__li--active') &&
        el.classList.remove('pagination-list__li--active');

      if (Number(findById) % 7 == 0) {
        if (increase % 7 == 0 && i === 6) {
          el.classList.add('pagination-list__li--active');
          el.textContent = increase;
          return;
        }

        if (increase % 7 != 0) {
          if (increase < 7) {
            el.textContent = i + 1;
          }
          if (increase >= 7) {
            console.log(increase, `errrr`);
          }

          if (Number(findById) === i + 1) {
            el.classList.add('pagination-list__li--active');
          }
          return;
        }

        return;
      }

      increase === 0 && (el.textContent = i + 1);
      if (increase % 7 != 0) {
        if (Number(findById) === i + 1) {
          increase = Number(el.textContent);
          el.classList.add('pagination-list__li--active');
        }

        return;
      }
    });
    refsNavigation.buttonPrev.classList.remove('hidden');
  }

  if (findById === 'next') {
    if (increase === 0) {
      variables.pageNumber = 1;
      increase = variables.pageNumber;
    }
    console.log(
      variables.pageNumber,
      `variables.pageNumber findById === 'next'`,
    );
    console.log(increase, `findById === 'next'`);

    if (increase % 7 == 0) {
      variables.pageNumber += 1;
      increase = variables.pageNumber;
      console.log(variables.pageNumber, `variables.pageNumber`);
      console.log(increase, `first`);
      elementsLi.map((el, i) => {
        el.classList.contains('pagination-list__li--active') &&
          el.classList.remove('pagination-list__li--active');
        el.textContent = increase + i;
        if (i === 0) {
          el.classList.add('pagination-list__li--active');
        }
      });
      return;
    }
    if (increase % 7 != 0) {
      variables.pageNumber += 1;
      increase = variables.pageNumber;
      console.log(variables.pageNumber, `variables.pageNumber`);
      console.log(increase, `second`);
      elementsLi.map((el, i) => {
        el.classList.contains('pagination-list__li--active') &&
          el.classList.remove('pagination-list__li--active');

        if (increase === 0 && i === increase) {
          el.classList.add('pagination-list__li--active');
          return;
        }

        if (increase !== 0 && increase % 7 === i + 1) {
          el.classList.add('pagination-list__li--active');
          return;
        }

        if (increase !== 0 && increase % 7 == 0 && i === 6) {
          el.classList.add('pagination-list__li--active');
          return;
        }
      });
    }

    refsNavigation.buttonPrev.classList.remove('hidden');
  } else if (findById === 'prev') {
    variables.pageNumber -= 1;
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
