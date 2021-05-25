import detailsPage from '../templates/details-page.hbs';
import refsNavigation from '../refsNavigation.js';
import variables from '../variables.js';
import 'material-design-icons/iconfont/material-icons.css';

const buttonQueue = refsNavigation.buttonAddFilmToQueue;
const buttonWatched = refsNavigation.buttonAddFilmToWatched;

function monitorButtonStatusTextAndStyles() {
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
  if (buttonWatched.textContent === 'Add to watched') {
    buttonWatched.classList.add('btn__film-details--add');
    buttonWatched.classList.remove('btn__film-details--delete');
  }
  if (buttonWatched.textContent === 'Delete from watched') {
    buttonWatched.classList.add('btn__film-details--delete');
    buttonWatched.classList.remove('btn__film-details--add');
  }
  if (buttonQueue.textContent === 'Add to queue') {
    buttonQueue.classList.add('btn__film-details--add');
    buttonQueue.classList.remove('btn__film-details--delete');
  }
  if (buttonQueue.textContent === 'Delete from queue') {
    buttonQueue.classList.add('btn__film-details--delete');
    buttonQueue.classList.remove('btn__film-details--add');
  }
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
  monitorButtonStatusTextAndStyles();
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
  monitorButtonStatusTextAndStyles();
}

function showDetails(selectedFilm) {
  const {
    id,
    release_date,
    backdrop_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
  } = selectedFilm;
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f2c0383f553427336b1984c7194d50ac&language=en-US`,
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      const hbsLink = document.querySelector('.film-details-page-hbs');
      const murkup = detailsPage({
        release_date,
        title,
        backdrop_path,
        vote_average,
        vote_count,
        key: data.results[0].key,
        popularity,
        original_title,
        genres,
        overview,
      });
      hbsLink.innerHTML = murkup;
    });
  monitorButtonStatusTextAndStyles();
}
export { showDetails, toggleToQueue, toggleToWatched };
