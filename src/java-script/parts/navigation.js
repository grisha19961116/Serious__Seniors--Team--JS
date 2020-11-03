export  { activeHomePage, activeLibraryPage, activeDetailsPage} ;
import refsNavigation from '../refsNavigation';
import {plaginationNavigation} from './searchAndPlaginationHomePage'
import variables from '../variables';
import localStorage from '../localStorageSettings';
import  {drawQueueFilmList} from './libraryPage';
import {drawWatchedFilmList} from './libraryPage';
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
    variables.selectFilm = queueAndWatchedFilmListFromLS.find(el => el === movieSelectedById);
    } else {
    variables.selectFilm = variables.renderFilms.find(el => el === movieSelectedById);
  }
  showDetails(variables.selectFilm);
  refsNavigation.buttonAddFilmToQueue.addEventListener('click', toggleToQueue);
  refsNavigation.buttonAddFilmToWatched.addEventListener('click', toggleToWatched);
  refsNavigation.buttonShowLIstQueue.removeEventListener('click', drawQueueFilmList);
  refsNavigation.buttonFilmsWatched.removeEventListener('click', drawWatchedFilmList);
  refsNavigation.buttonNext.removeEventListener('click', plaginationNavigation);
  refsNavigation.buttonPrev.removeEventListener('click', plaginationNavigation);
}
