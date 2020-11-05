import refsNavigation from '../refsNavigation';
import { activeDetailsPage } from './navigation';

const libraryFilmList = document.querySelector('.library__filmList');

function createLibraryCardFunc(filmTitle, imgPath, movieId, voteAverage) {
  const item = document.createElement('li');
  item.classList.add('some_class'); ///нужно добавить тот же класс на li, что и в функции createCards
  const img = document.createElement('img');
  img.classList.add('some_class');///нужно добавить тот же класс на img, что и в функции createCards
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500${imgPath}`);
  img.setAttribute('id', movieId);
  const movieName = document.createElement('p');
  movieName.classList.add('some_class');///нужно добавить тот же класс на <P> с именем, что и в функции createCards
  movieName.textContent = filmTitle;
  const voteFilm = document.createElement('p');
  voteFilm.classList.add('library__vote');///нужно добавить тот же класс на <P> с именем, что и в функции createCards
  voteFilm.textContent = voteAverage;
  item.append(img, movieName, voteFilm);
  item.addEventListener('click', () => activeDetailsPage(movieId, true));
  return item;
}
function drawWatchedFilmList() {
// если значение local не пустое и не равно нулю длина массива то проходим по нему
// и в созданный fragment в цикле запускаем функцию createLibraryCardFunc() которая создает нужные li
  refsNavigation.buttonFilmsWatched.classList.add('library__btn--active');
  refsNavigation.buttonShowLIstQueue.classList.remove('library__btn--active');
  let fragment = document.createDocumentFragment();
  let local = JSON.parse(localStorage.getItem('filmsWatched'));//можно заменить local на getWatchedFilm, но не уверен
  if(local !== null){ ///нужно добавить проверку на длинну масива
    libraryFilmList.innerHTML = '';
    local.forEach(el => fragment.append(
      createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average),
    ));
    libraryFilmList.append(fragment);
  }else{
    libraryFilmList.innerHTML =""
    const noMoviesListNotation = document.createElement('li');
    if(noMoviesListNotation.textContent === ""){
      noMoviesListNotation.textContent = 'You do not have watched movies. Add them.'
      const fragment = document.createDocumentFragment()
      fragment.append(noMoviesListNotation)
      libraryFilmList.append(fragment)
    }
  }
}
function drawQueueFilmList() {
// если значение local не пустое и не равно нулю длина массива то проходим по нему
// и в созданный fragment в цикле запускаем функцию createLibraryCardFunc() которая создает нужные li
  refsNavigation.buttonFilmsWatched.classList.remove('library__btn--active');
  refsNavigation.buttonShowLIstQueue.classList.add('library__btn--active');
  let local = JSON.parse(localStorage.getItem('filmsQueue'));//можно заменить local на getWatchedFilm, но не уверен
  let fragment = document.createDocumentFragment();
  if(local !== null){
    libraryFilmList.innerHTML = '';
    local.forEach(el => fragment.append(
      createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average),
    ));
    libraryFilmList.append(fragment);
  }else{
    libraryFilmList.innerHTML =""
    const noMoviesListNotation = document.createElement('li');
    if(noMoviesListNotation.textContent === ""){
      noMoviesListNotation.textContent = 'You do not have to queue movies to watch. Add them.'
      const fragment = document.createDocumentFragment()
      fragment.append(noMoviesListNotation)
      libraryFilmList.append(fragment)
    }
  }
}
export  {drawQueueFilmList,drawWatchedFilmList};
