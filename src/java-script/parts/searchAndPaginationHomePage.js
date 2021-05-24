import { Number, Object } from 'core-js';
import apiService from '../apiService.js';
import refsNavigation from '../refsNavigation.js';
import variables from '../variables.js';
import { fetchPopularMoviesList, createCardFunc } from './initialHomePages.js';

let increase = 0;

async function fetchFilms(flag) {
  if (variables.inputValue === '') return;

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
      }
      variables.total = parseInt(dataFromApi.total_pages / 7) * 7;
      variables.renderFilms = [...dataFromApi.results];
      refsNavigation.homepageList.innerHTML = '';
      createCardFunc(variables.renderFilms, flag);
    })
    .catch(apiError => console.error(apiError));
}

async function searchFilms(e) {
  e.preventDefault();
  const value = e.target[0].value;
  if (value === '') return;
  increase = 0;
  variables.pageNumber = 1;
  variables.inputValue = value.trim();
  fetchFilms(true);
  refsNavigation.buttonPrev.classList.add('hidden');
}

refsNavigation.searchFormDom.addEventListener('submit', searchFilms);

export function paginationNavigation(e) {
  const findById = e.originalTarget.id;
  const findByIdNum = Number(findById);
  const currentPage = Number(e.originalTarget.textContent);
  const elementsLi = Object.values(
    document.querySelectorAll('.pagination-list__li'),
  );

  if (currentPage === 1) {
    const li = document.getElementById(currentPage);
    if (li.classList.contains('pagination-list__li--active')) return;
    elementsLi.map((el, i) => {
      el.classList.contains('pagination-list__li--active') &&
        el.classList.remove('pagination-list__li--active');

      if (i + 1 === currentPage) {
        el.classList.add('pagination-list__li--active');
      }
    });

    refsNavigation.buttonPrev.classList.add('hidden');
    variables.pageNumber = 1;
  }

  if (currentPage !== 1 && findByIdNum === 1) {
    refsNavigation.buttonNext.classList.contains('hidden') &&
      refsNavigation.buttonNext.classList.remove('hidden');
    const li = document.getElementById(findByIdNum);
    if (li.classList.contains('pagination-list__li--active')) return;
    variables.pageNumber = currentPage;
    increase = variables.pageNumber;

    elementsLi.map((el, i) => {
      el.classList.contains('pagination-list__li--active') &&
        el.classList.remove('pagination-list__li--active');
      if (i === 0) {
        el.classList.add('pagination-list__li--active');
      }
    });
  }

  if (Number(findById) > 1) {
    refsNavigation.buttonNext.classList.contains('hidden') &&
      refsNavigation.buttonNext.classList.remove('hidden');
    if (increase <= 7) {
      increase = Number(findById);
    }
    if (increase > 7) {
      increase = currentPage;
    }
    if (increase === variables.total) {
      refsNavigation.buttonNext.classList.add('hidden');
    }

    variables.pageNumber = increase;
    elementsLi.map((el, i) => {
      el.classList.contains('pagination-list__li--active') &&
        el.classList.remove('pagination-list__li--active');
      if (i === 7) {
        el.id = '';
        el.textContent = `...${variables.total}`;
        return;
      }
      if (findByIdNum % 7 == 0) {
        if (increase % 7 == 0 && i === 6) {
          el.classList.add('pagination-list__li--active');
          el.textContent = increase;
        }

        if (increase % 7 != 0) {
          if (increase < 7) {
            el.textContent = i + 1;
          }
          if (findByIdNum === i + 1) {
            el.classList.add('pagination-list__li--active');
          }
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
    if (variables.pageNumber === variables.total) {
      refsNavigation.buttonNext.classList.add('hidden');
    }
    refsNavigation.buttonPrev.classList.remove('hidden');
  }

  if (findById === 'next') {
    if (increase === 0) {
      variables.pageNumber = 1;
      increase = variables.pageNumber;
    }

    if (increase % 7 == 0) {
      variables.pageNumber += 1;
      increase = variables.pageNumber;

      elementsLi.map((el, i) => {
        el.classList.contains('pagination-list__li--active') &&
          el.classList.remove('pagination-list__li--active');
        if (i === 7) {
          el.id = '';
          el.textContent = `...${variables.total}`;
          return;
        }
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
      if (variables.pageNumber === variables.total) {
        refsNavigation.buttonNext.classList.add('hidden');
      }
    }

    refsNavigation.buttonPrev.classList.remove('hidden');
  } else if (findById === 'prev') {
    variables.pageNumber -= 1;
    increase = variables.pageNumber;
    refsNavigation.buttonNext.classList.contains('hidden') &&
      refsNavigation.buttonNext.classList.remove('hidden');

    elementsLi.map((el, i) => {
      el.classList.contains('pagination-list__li--active') &&
        el.classList.remove('pagination-list__li--active');
      if (i === 7) {
        el.id = '';
        el.textContent = `...${variables.total}`;
        return;
      }
      if (increase < 7) {
        if (i + 1 === increase) {
          el.classList.add('pagination-list__li--active');
        }
        el.textContent = i + 1;
      }
      if (increase >= 7) {
        if (increase % 7 != 0) {
          if (i + 1 === increase % 7) {
            el.classList.add('pagination-list__li--active');
          }
          el.textContent = parseInt(increase / 7) * 7 + i + 1;
        }
        if (increase % 7 == 0) {
          if (i === 6) {
            el.classList.add('pagination-list__li--active');
          }
          el.textContent = increase - 6 + i;
        }
      }
    });
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
