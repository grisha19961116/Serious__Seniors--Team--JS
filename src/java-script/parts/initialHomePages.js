import homepageGalleryTpl from '../templates/homepage-gallery.hbs';
import refsNavigation from '../refsNavigation';
import {activeDetailsPage} from './navigation';
import apiService from '../apiService';
import variables from '../variables';

function createCardFunc(dataFromApi) {
  //  - выбираем из DOM наш список;
  // - создаем функцию createCardFunc, она принимает параметрами imgPath, filmTitle, movieId создает li согласно макета
  //   dataFromApi обєкт з якого все беремо imgPath, filmTitle, movieId і вставаляємо в шаблон renderFilmsList,там +-
  // все готово
  const renderFilmsList = homepageGalleryTpl(dataFromApi);
  refsNavigation.homepageList.insertAdjacentHTML('beforeend', renderFilmsList);
  const homepageLi = document.querySelector('.homepage-list__li');
  homepageLi.addEventListener('click',((even) => {
    console.log(even)
    activeDetailsPage(dataFromApi,false);
  }));
    //  вешает на homepageLi слушателем функцию activeDetailsPage c параметрами movieId =[dataFromApi](це цілий обєкт з фетча) 
    //и флагом false так как фильм из библиотеки;
    //   (смотри пункт “3)” создание activeDetailsPage);
}

function fetchPopularMoviesList(pageNumber) {

  apiService.getFullRequest('london',variables.pageNumber).then((data) => {
    variables.renderFilms = [...data.results];
    createCardFunc(variables.renderFilms);
  })
}

function fetchGenres(dataFromApi) {
  apiService.getFullRequest('discovery',4).then((data) => {
    // забирает жанры и кладет их в переменную genres
   //  (она понадобится в работе следующим участникам); 
   // - запускаем функцию fetchPopularMoviesList и fetchGenres.
  //  variables.genres = [...data.results[перебрати весь масив і запушити тільки жанри]];
    console.log(data.results[9],`fetchGenres`);
  })
}

fetchPopularMoviesList();
fetchGenres();



