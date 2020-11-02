import detailsPage from '../templates/details-page.hbs';
import refsNavigation from '../refsNavigation';

const selectFilm = {
    "adult": false,
    "backdrop_path": "/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg",
    "belongs_to_collection": null,
    "budget": 63000000,
    "genres": [{
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    }],
    "homepage": "http://www.foxmovies.com/movies/fight-club",
    "id": 550,
    "imdb_id": "tt0137523",
    "original_language": "en",
    "original_title": "Fight Club",
    "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    "popularity": 37.717,
    "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "production_companies": [],
    "production_countries": [],
    "release_date": "1999-10-15",
    "revenue": 100853753,
    "runtime": 139,
    "spoken_languages": [
        {
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "Mischief. Mayhem. Soap.",
    "title": "Fight Club",
    "video": false,
    "vote_average": 8.4,
    "vote_count": 20315
};

function monitorButtonStatusText() {

    const buttonQueue = document.querySelector('.js-btn-queue');
    const buttonWatched = document.querySelector('.js-btn-watched');

    const getlocalStorageFilmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));
    const getlocalStorageWatchedFilm = JSON.parse(localStorage.getItem('filmsWatched'));

    buttonQueue.addEventListener('click', toggleToQueue);
    buttonWatched.addEventListener('click', toggleToWatched);

    if (getlocalStorageFilmsQueue && getlocalStorageFilmsQueue.length && getlocalStorageFilmsQueue.find(movie => movie.id === selectFilm.id)) {
        buttonQueue.textContent = 'Delete to queue';
    } else {
        buttonQueue.textContent = 'Add to queue';
    };

    if (getlocalStorageWatchedFilm && getlocalStorageWatchedFilm.length && getlocalStorageWatchedFilm.find(movie => movie.id === selectFilm.id)) {
        buttonWatched.textContent = 'Delete to watched';
    } else {
        buttonWatched.textContent = 'Add to watched';
    };
};

function toggleToQueue() {
    let filmsQueueArray = [];
    const getlocalStorageFilmsQueueData = JSON.parse(localStorage.getItem('filmsQueue'));

    if (getlocalStorageFilmsQueueData) {
        filmsQueueArray.push(...getlocalStorageFilmsQueueData);
    };

    if (getlocalStorageFilmsQueueData && getlocalStorageFilmsQueueData.length && getlocalStorageFilmsQueueData.find(movie => movie.id === selectFilm.id)) {
        filmsQueueArray = filmsQueueArray.filter((movie => movie.id !== selectFilm.id));
    } else {
        filmsQueueArray.push(selectFilm);
    };

    localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArray));

    monitorButtonStatusText();
};

function toggleToWatched() {
    let filmsWatchedArray = [];
    const getlocalStorageWatchedFilm = JSON.parse(localStorage.getItem('filmsWatched'));

    if (getlocalStorageWatchedFilm) {
        filmsWatchedArray.push(...getlocalStorageWatchedFilm);
    };

    if (getlocalStorageWatchedFilm && getlocalStorageWatchedFilm.length && getlocalStorageWatchedFilm.find(movie => movie.id === selectFilm.id)) {
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

export { showDetails, toggleToQueue, toggleToWatched };
