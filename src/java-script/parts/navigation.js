export  { activeHomePage, activeLibraryPage, activeDetailsPage} ;
import refsNavigation from '../refsNavigation.js';
import {plaginationNavigation} from './searchAndPlaginationHomePage.js'
import variables from '../variables.js';
import  {drawQueueFilmList} from './libraryPage.js';
import {drawWatchedFilmList} from './libraryPage.js';
import {showDetails,toggleToQueue,toggleToWatched} from './filmDetailPage.js';


refsNavigation.filmDetailPageSection.classList.add('hidden');
refsNavigation.filmLibraryPageSection.classList.add('hidden');


function activeHomePage () {
  refsNavigation.filmDetailPageSection.classList.add('hidden');
  refsNavigation.filmLibraryPageSection.classList.add('hidden');
  refsNavigation.homePageSection.classList.remove('hidden');
  refsNavigation.buttonNext.addEventListener('click',plaginationNavigation);
  refsNavigation.buttonPrev.addEventListener('click',plaginationNavigation);
  refsNavigation.buttonFilmsWatched.removeEventListener('click', drawWatchedFilmList);
  refsNavigation.buttonShowLIstQueue.removeEventListener('click', drawQueueFilmList);
  refsNavigation.buttonAddFilmToWatched.removeEventListener('click', toggleToWatched);
  refsNavigation.buttonAddFilmToQueue.removeEventListener('click', toggleToQueue);      
}
function activeLibraryPage () {
  refsNavigation.filmDetailPageSection.classList.add('hidden');
  refsNavigation.homePageSection.classList.add('hidden');
  refsNavigation.filmLibraryPageSection.classList.remove('hidden');
  drawQueueFilmList();
  refsNavigation.buttonFilmsWatched.addEventListener('click', drawWatchedFilmList);
  refsNavigation.buttonShowLIstQueue.addEventListener('click', drawQueueFilmList);
  refsNavigation.buttonAddFilmToWatched.removeEventListener('click', toggleToWatched);
  refsNavigation.buttonAddFilmToQueue.removeEventListener('click', toggleToQueue);
  refsNavigation.buttonNext.removeEventListener('click', plaginationNavigation);
  refsNavigation.buttonPrev.removeEventListener('click', plaginationNavigation);
}
function activeDetailsPage (movieSelectedById, checkFlag) {
  refsNavigation.homePageSection.classList.add('hidden');
  refsNavigation.filmLibraryPageSection.classList.add('hidden');
  refsNavigation.filmDetailPageSection.classList.remove('hidden');
  if(checkFlag){
    let queueAndWatchedFilmListFromLS = [...JSON.parse(localStorage.getItem('filmsQueue')), ...JSON.parse(localStorage.getItem('filmsWatched'))];
    variables.selectFilm = queueAndWatchedFilmListFromLS.find(el => el.id === movieSelectedById);
    } else {
    variables.selectFilm = variables.renderFilms.find(el => el.id === movieSelectedById);
  }
  showDetails(variables.selectFilm);
  refsNavigation.buttonAddFilmToQueue.addEventListener('click', toggleToQueue);
  refsNavigation.buttonAddFilmToWatched.addEventListener('click', toggleToWatched);
  refsNavigation.buttonShowLIstQueue.removeEventListener('click', drawQueueFilmList);
  refsNavigation.buttonFilmsWatched.removeEventListener('click', drawWatchedFilmList);
  refsNavigation.buttonNext.removeEventListener('click', plaginationNavigation);
  refsNavigation.buttonPrev.removeEventListener('click', plaginationNavigation);
}

refsNavigation.homeDom.addEventListener('click', activeHomePage);
refsNavigation.logoDom.addEventListener('click', activeHomePage);
refsNavigation.libraryDom.addEventListener('click', activeLibraryPage);

document.addEventListener('DOMContentLoaded', activeHomePage);
