import apiService from '../apiService';
import refsNavigation from '../refsNavigation';
import variables from '../variables';
import {createCardFunc} from './initialHomePages'

function fetchFilms() {
if(variables.inputValue === ''){
  console.log(variables.inputValue,`variables.inputValue error empty string`);
  return;
}
  apiService
    .getFullRequest(variables.inputValue, variables.pageNumber)
    .then(dataFromApi => {
      console.log(dataFromApi);
      if (dataFromApi.length === 0) {
        refsNavigation.searchFormErrorDom.replace(
          'search-form__error--hidden',
          'search-form__error--visibale',);
        variables.pageNumber = 1; 
        fetchPopularMovies();
        return;
      } else {
        refsNavigation.homepageList.innerHTML = '';
        variables.renderFilms = [...dataFromApi.results];
        createCardFunc(variables.renderFilms);
      }})
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
  if(variables.pageNumber >= 2 ){
    refsNavigation.buttonNumber.textContent = variables.pageNumber;
  }
};
if (findById === 'prev') {
  if(variables.pageNumber >= 1){
    variables.pageNumber -= 1;
    refsNavigation.buttonNumber.textContent = variables.pageNumber;
  } else {
    refsNavigation.buttonPrev.classList.add('hidden');
    refsNavigation.buttonNumber.textContent = variables.pageNumber;
  } 
};

// if(variables.inputValue = ''){
//   fetchPopularMoviesList();
//   return;
// } else {
//   fetchFilms()
//  }
// fetchPopularMoviesList();
};


