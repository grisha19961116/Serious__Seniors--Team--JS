export { activeHomePage, activeLibraryPage, activeDetailsPage };
import refsNavigation from '../refsNavigation.js';
import { paginationNavigation } from './searchAndPaginationHomePage.js';
import { fetchPopularMoviesList } from './initialHomePages.js';
import variables from '../variables.js';
import { drawQueueFilmList } from './libraryPage.js';
import { drawWatchedFilmList } from './libraryPage.js';
import {
  showDetails,
  toggleToQueue,
  toggleToWatched,
} from './filmDetailPage.js';
refsNavigation.filmDetailPageSection.classList.add('hidden');
refsNavigation.filmLibraryPageSection.classList.add('hidden');

function activeHomePage(e) {
  const target = e.explicitOriginalTarget.id;
  if (target === 'logo') {
    refsNavigation.libraryDom.classList.add('navigation-link--active');
    refsNavigation.libraryDom.classList.remove('navigation-link--checked');
    refsNavigation.homeDom.classList.add('navigation-link--active');
    refsNavigation.homeDom.classList.remove('navigation-link--checked');
    refsNavigation.searchFormDom.reset();
    fetchPopularMoviesList();
  }
  if (target === 'home') {
    refsNavigation.libraryDom.classList.remove('navigation-link--checked');
    refsNavigation.libraryDom.classList.add('navigation-link--active');
    refsNavigation.homeDom.classList.remove('navigation-link--active');
    refsNavigation.homeDom.classList.add('navigation-link--checked');
  }

  refsNavigation.filmDetailPageSection.classList.add('hidden');
  refsNavigation.filmLibraryPageSection.classList.add('hidden');
  refsNavigation.homePageSection.classList.remove('hidden');

  refsNavigation.homePageBtn.addEventListener('click', paginationNavigation);

  refsNavigation.buttonFilmsWatched.removeEventListener(
    'click',
    drawWatchedFilmList,
  );
  refsNavigation.buttonShowLIstQueue.removeEventListener(
    'click',
    drawQueueFilmList,
  );
  refsNavigation.buttonAddFilmToWatched.removeEventListener(
    'click',
    toggleToWatched,
  );
  refsNavigation.buttonAddFilmToQueue.removeEventListener(
    'click',
    toggleToQueue,
  );
}
function activeLibraryPage(e) {
  const target = e.explicitOriginalTarget.id;
  if (target === 'library') {
    refsNavigation.homeDom.classList.remove('navigation-link--checked');
    refsNavigation.homeDom.classList.add('navigation-link--active');
    refsNavigation.libraryDom.classList.remove('navigation-link--active');
    refsNavigation.libraryDom.classList.add('navigation-link--checked');
  }
  refsNavigation.filmDetailPageSection.classList.add('hidden');
  refsNavigation.homePageSection.classList.add('hidden');
  refsNavigation.filmLibraryPageSection.classList.remove('hidden');
  drawQueueFilmList();
  refsNavigation.buttonFilmsWatched.addEventListener(
    'click',
    drawWatchedFilmList,
  );
  refsNavigation.buttonShowLIstQueue.addEventListener(
    'click',
    drawQueueFilmList,
  );
  refsNavigation.buttonAddFilmToWatched.removeEventListener(
    'click',
    toggleToWatched,
  );
  refsNavigation.buttonAddFilmToQueue.removeEventListener(
    'click',
    toggleToQueue,
  );
  refsNavigation.homePageBtn.removeEventListener('click', paginationNavigation);
}
function activeDetailsPage(movieSelectedById, checkFlag) {
  refsNavigation.homePageSection.classList.add('hidden');
  refsNavigation.filmLibraryPageSection.classList.add('hidden');
  refsNavigation.filmDetailPageSection.classList.remove('hidden');
  if (checkFlag) {
    let queueAndWatchedFilmListFromLS = [
      ...JSON.parse(localStorage.getItem('filmsQueue')),
      ...JSON.parse(localStorage.getItem('filmsWatched')),
    ];
    variables.selectFilm = queueAndWatchedFilmListFromLS.find(
      el => el.id === movieSelectedById,
    );
  } else {
    variables.selectFilm = variables.renderFilms.find(
      el => el.id === movieSelectedById,
    );
  }
  showDetails(variables.selectFilm);
  refsNavigation.buttonAddFilmToQueue.addEventListener('click', toggleToQueue);
  refsNavigation.buttonAddFilmToWatched.addEventListener(
    'click',
    toggleToWatched,
  );
  refsNavigation.buttonShowLIstQueue.removeEventListener(
    'click',
    drawQueueFilmList,
  );
  refsNavigation.buttonFilmsWatched.removeEventListener(
    'click',
    drawWatchedFilmList,
  );
  refsNavigation.homePageBtn.removeEventListener('click', paginationNavigation);
}

refsNavigation.homeDom.addEventListener('click', activeHomePage);
refsNavigation.logoDom.addEventListener('click', activeHomePage);
refsNavigation.libraryDom.addEventListener('click', activeLibraryPage);

document.addEventListener('DOMContentLoaded', activeHomePage);
