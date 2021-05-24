import refsNavigation from '../refsNavigation';
import { activeDetailsPage } from './navigation';

const libraryFilmList = document.querySelector('.library__filmList');

function createLibraryCardFunc(filmTitle, imgPath, movieId, voteAverage) {
  const item = document.createElement('li');
  item.classList.add('some_class');
  const img = document.createElement('img');
  img.classList.add('some_class');
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500${imgPath}`);
  img.setAttribute('id', movieId);
  const movieName = document.createElement('p');
  movieName.classList.add('some_class');
  movieName.textContent = filmTitle;
  const voteFilm = document.createElement('p');
  voteFilm.classList.add('library__vote');
  voteFilm.textContent = voteAverage;
  item.append(img, movieName, voteFilm);
  item.addEventListener('click', () => activeDetailsPage(movieId, true));
  return item;
}
function drawWatchedFilmList() {
  refsNavigation.buttonFilmsWatched.classList.add('library__btn--active');
  refsNavigation.buttonShowLIstQueue.classList.remove('library__btn--active');
  let fragment = document.createDocumentFragment();
  let local = JSON.parse(localStorage.getItem('filmsWatched'));
  if (local !== null) {
    libraryFilmList.innerHTML = '';
    local.forEach(el =>
      fragment.append(
        createLibraryCardFunc(
          el.title,
          el.backdrop_path,
          el.id,
          el.vote_average,
        ),
      ),
    );
    libraryFilmList.append(fragment);
  } else {
    libraryFilmList.innerHTML = '';
    const noMoviesListNotation = document.createElement('li');
    if (noMoviesListNotation.textContent === '') {
      noMoviesListNotation.textContent =
        'You do not have watched movies. Add them.';
      const fragment = document.createDocumentFragment();
      fragment.append(noMoviesListNotation);
      libraryFilmList.append(fragment);
    }
  }
}
function drawQueueFilmList() {
  refsNavigation.buttonFilmsWatched.classList.remove('library__btn--active');
  refsNavigation.buttonShowLIstQueue.classList.add('library__btn--active');
  let local = JSON.parse(localStorage.getItem('filmsQueue'));
  let fragment = document.createDocumentFragment();
  if (local !== null) {
    libraryFilmList.innerHTML = '';
    local.forEach(el =>
      fragment.append(
        createLibraryCardFunc(
          el.title,
          el.backdrop_path,
          el.id,
          el.vote_average,
        ),
      ),
    );
    libraryFilmList.append(fragment);
  } else {
    libraryFilmList.innerHTML = '';
    const noMoviesListNotation = document.createElement('li');
    if (noMoviesListNotation.textContent === '') {
      noMoviesListNotation.textContent =
        'You do not have to queue movies to watch. Add them.';
      const fragment = document.createDocumentFragment();
      fragment.append(noMoviesListNotation);
      libraryFilmList.append(fragment);
    }
  }
}
export { drawQueueFilmList, drawWatchedFilmList };
