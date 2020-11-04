import detailsPage from '../templates/details-page.hbs';
import refsNavigation from '../refsNavigation';
import 'material-design-icons/iconfont/material-icons.css';


function monitorButtonStatusText() {

    const buttonQueue = document.querySelector('.js-btn-queue');
    const buttonWatched = document.querySelector('.js-btn-watched');
    let getlocalStorageFilmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));
    let getlocalStorageWatchedFilm = JSON.parse(localStorage.getItem('filmsWatched'));

    buttonQueue.addEventListener('click', toggleToQueue);
    buttonWatched.addEventListener('click', toggleToWatched);

    if (getlocalStorageFilmsQueue && getlocalStorageFilmsQueue.find(movie => movie.id === selectFilm.id)) {
        buttonQueue.textContent = `<i class="material-icons">remove_from_queue</i> Delete from queue`;
    } else {
        buttonQueue.textContent = `<i class="material-icons">add_to_queue</i> Add to queue`;
    };
    if (getlocalStorageWatchedFilm && getlocalStorageWatchedFilm.find(movie => movie.id === selectFilm.id)) {
        buttonWatched.textContent = `<i class="material-icons">videocam_off</i> Delete from watched`;
    } else {
        buttonWatched.textContent = `<i class="material-icons">videocam</i> Add to watched`;
    };
};

function toggleToQueue() {

    let filmsQueueArray = [];
    let getlocalStorageFilmsQueueData = localStorage.getItem('filmsQueue');

    if (getlocalStorageFilmsQueueData !== null) {
        filmsQueueArray.push(...JSON.parse(getlocalStorageFilmsQueueData));
    };

    if (filmsQueueArray.find(movie => movie.id === selectFilm.id)) {
        filmsQueueArray = filmsQueueArray.filter((movie => movie.id !== selectFilm.id));
    } else {
        filmsQueueArray.push(selectFilm);
    };

    localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArray));

    monitorButtonStatusText();
};

function toggleToWatched() {

    let filmsWatchedArray = [];
    let getlocalStorageWatchedFilmData = localStorage.getItem('filmsWatched');

    if (getlocalStorageWatchedFilmData !== null) {
        filmsWatchedArray.push(...JSON.parse(getlocalStorageWatchedFilmData));
    };

    if (filmsWatchedArray.find(movie => movie.id === selectFilm.id)) {
        filmsWatchedArray = filmsWatchedArray.filter((movie => movie.id !== selectFilm.id));
    } else {
        filmsWatchedArray.push(selectFilm);
    };

    localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArray));

    monitorButtonStatusText();
};

function showDetails(selectFilm) {

    const murkup = detailsPage(selectFilm);

    refsNavigation.filmDetailPageSection.insertAdjacentHTML('beforeend', murkup);

    monitorButtonStatusText();
};

export { showDetails, toggleToQueue, toggleToWatched }