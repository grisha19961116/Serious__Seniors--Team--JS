import apiService from '../apiService.js';
apiService.getFullRequest('london',2).catch((showExample) => {
        console.log(showExample);
});
const myLibrary = document.querySelector('.library-list');
const buttonWatch = document.querySelector('#js-buttonWatchedFilms');
const buttonQueue = document.querySelector('#js-buttonQueueFilms');
buttonWatch.addEventListener('click', event => {
  console.log('лог для проверки', event);
});
buttonQueue.addEventListener('click', event => {
  console.log('лог для проверки', event);
});

function createLibraryCardFunc(filmTitle, imgPath, movieId, voteAverage) {
  // создает li согласно макета, вешает на нее слушателем функцию activeDetailsPage
  // c параметрами movieId и флагом true
  // вся эта функция должна вернуть созданный li
  const item = document.createElement('li');

  const img = document.createElement('img');
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500${imgPath}`);

  const movieName = document.createElement('p');
  movieName.textContent = filmTitle;

  const voteFilm = document.createElement('p');
  voteFilm.textContent = voteAverage;

  item.append(img, movieName, voteFilm);
  item.addEventListener('click', () => activeDetailsPage(movieId, true));
  return item;
}

function drawWatchedFilmList() {
  buttonWatch.classList.add('library__btn--active');
  buttonQueue.classList.remove('library__btn--active');
  let fragment = document.createDocumentFragment();
  const local = JSON.parse(localStorage.getItem('filmsWatched'));
  local.foreach(el =>
    fragment.append(
      createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average),
    ),
  );
  // если значение local не пустое и не равно нулю длина массива то проходим по нему
  // и в созданный fragment в цикле запускаем функцию createLibraryCardFunc() которая создает нужные li
  myLibrary.append(fragment);
}

function drawQueueFilmList() {
  buttonWatch.classList.remove('library__btn--active');
  buttonQueue.classList.add('library__btn--active');  
  const local = JSON.parse(localStorage.getItem('filmsQueue'));
  let fragment = document.createDocumentFragment();
  local.foreach(el =>
    fragment.append(
      createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average),
    ),
  );
  // если значение local не пустое и не равно нулю длина массива то проходим по нему
  // и в созданный fragment в цикле запускаем функцию createLibraryCardFunc() которая создает нужные li
  myLibrary.append(fragment);
}
