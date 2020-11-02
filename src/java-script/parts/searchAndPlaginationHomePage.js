import apiService from '../apiService';
import refsNavigation from '../refsNavigation';
import variables from '../variables';
import {createCardFunc} from './initialHomePages'

function fetchFilms(searchWord, number) {
  let valueForm ;
  if(searchWord === '' ){
    valueForm = 'popular';
    return;
  } else {
    valueForm = searchWord;
  }
  apiService
    .getFullRequest(valueForm, number)
    .then(dataFromApi => {
      console.log(dataFromApi);
      if (dataFromApi.length === 0) {
        refsNavigation.searchFormErrorDom.replace(
          'search-form__error--hidden',
          'search-form__error--visibale',);
        variables.pageNumber = 1; 
        fetchPopularMovies(variables.pageNumber);
        return;
      } else {
        refsNavigation.homepageList.innerHTML = '';
        variables.renderFilms = [...dataFromApi.results];
        createCardFunc(variables.renderFilms);
      }})
    .catch(apiError => console.error(apiError));
}

function searchFilms(event) {
  // event.preventDefault();
  variables.inputValue = refsNavigation.inputFormDom.value.trim();
  refsNavigation.searchFormDom.reset();
  fetchFilms(variables.inputValue,variables.pageNumber);
}
refsNavigation.searchFormDom.addEventListener('submit', ((event) => {
  searchFilms(event);
  event.preventDefault();
}));
export function plaginationNavigation(event) {
  console.log(variables.pageNumber,`variables.pageNumber`);
const findById = event.currentTarget.id;
refsNavigation.buttonNumber.textContent = variables.pageNumber;
if (findById === 'prev') {
  variables.pageNumber -= 1;
  if(variables.pageNumber === 1 ){
    fetchPopularMoviesList(searchWord);
    refsNavigation.buttonPrev.classList.add('.hidden');
    return;
  } else if(variables.pageNumber >= 2){
    refsNavigation.buttonPrev.classList.remove('.hidden');
  }
  return;
}
if(findById === 'next'){
  const searchWord = variables.inputValue;
  variables.pageNumber ++ ;
  console.log(variables.pageNumber);
  refsNavigation.buttonPrev.classList.remove('.hidden')
  };
  variables.inputValue = '';
  const searchWord = variables.inputValue;
  fetchFilms(searchWord,variables.pageNumber);
};
// - создаем функция plaginationNavigation принимающую ивент, по id она определяет
//  какая из кнопок была нажат и в зависимости от этого по разному отрабатывает 
//  изменяя при этом глобальные переменные pageNumber, прорисовуя его в контейнере в DOM и
//   запускает на пустую строчку inputValue функцию fetchPopularMoviesList или fetchFilms; 
// - кнопка назад должна исчезать когда текущее количество страниц “1” и появляться при “2”
//  и более; - вешаем слушателем функцию plaginationNavigation на кнопки вперед и назад.
