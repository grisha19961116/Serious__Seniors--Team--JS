import detailsPage from '../templates/details-page.hbs';
import variables from '../variables.js';
import 'material-design-icons/iconfont/material-icons.css';

function monitorButtonStatusText() {
  const buttonQueue = document.querySelector('.js-btn-queue');
  const buttonWatched = document.querySelector('.js-btn-watched');
  let localStorageFilmsQueue = localStorage.getItem('filmsQueue');
  localStorageFilmsQueue === null
    ? (buttonQueue.textContent = 'Add to queue')
    : JSON.parse(localStorageFilmsQueue).find(
        el => el.id === variables.selectFilm.id,
      )
    ? (buttonQueue.textContent = 'Delete from queue')
    : (buttonQueue.textContent = 'Add to queue');
  let localStorageFilmsWatched = localStorage.getItem('filmsWatched');
  localStorageFilmsWatched === null
    ? (buttonWatched.textContent = 'Add to watched')
    : JSON.parse(localStorageFilmsWatched).find(
        el => el.id === variables.selectFilm.id,
      )
    ? (buttonWatched.textContent = 'Delete from watched')
    : (buttonWatched.textContent = 'Add to watched');
}

function toggleToQueue() {
  let filmQueueLocalStorage =
    JSON.parse(localStorage.getItem('filmsQueue')) || [];
  if (filmQueueLocalStorage.find(el => el.id === variables.selectFilm.id)) {
    filmQueueLocalStorage = filmQueueLocalStorage.filter(
      el => el.id !== variables.selectFilm.id,
    );
  } else {
    filmQueueLocalStorage.push(variables.selectFilm);
  }
  localStorage.setItem('filmsQueue', JSON.stringify(filmQueueLocalStorage));
  monitorButtonStatusText();
}
function toggleToWatched() {
  let filmsWatchedLocalStorage =
    JSON.parse(localStorage.getItem('filmsWatched')) || [];
  if (filmsWatchedLocalStorage.find(el => el.id === variables.selectFilm.id)) {
    filmsWatchedLocalStorage = filmsWatchedLocalStorage.filter(
      el => el.id !== variables.selectFilm.id,
    );
  } else {
    filmsWatchedLocalStorage.push(variables.selectFilm);
  }
  localStorage.setItem(
    'filmsWatched',
    JSON.stringify(filmsWatchedLocalStorage),
  );
  monitorButtonStatusText();
}

function showDetails(selectFilm) {
  const hbsLink = document.querySelector('.film-details-page-hbs');
  const murkup = detailsPage(selectFilm);
  hbsLink.innerHTML = murkup;
  monitorButtonStatusText();
}
export { showDetails, toggleToQueue, toggleToWatched };
