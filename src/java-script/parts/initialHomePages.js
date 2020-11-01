import homepageGalleryTpl from '../templates/homepage-gallery.hbs';
import refsNavigation from '../refsNavigation';
import {activeDetailsPage} from './navigation';
import apiService from '../apiService';
import variables from '../variables';
function createCardFunc(dataFromApi) {
  const renderFilmsList = homepageGalleryTpl(dataFromApi);
  refsNavigation.homepageList.insertAdjacentHTML('beforeend', renderFilmsList);
  const homepageLi = document.querySelector('.homepage-list__li');
  homepageLi.addEventListener('click',((even) => {
    const idForSearching = Number(even.currentTarget.id);
    let forThrowDataSelect = [] ;
    console.log(idForSearching);
    dataFromApi.forEach(element => {
      if(element.id === idForSearching ) {
        forThrowDataSelect = [element];
        return;
      } 
    });
    activeDetailsPage(forThrowDataSelect,false);
  }));
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



