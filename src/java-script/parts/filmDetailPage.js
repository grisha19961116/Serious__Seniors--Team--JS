import detailsPage from '../templates/details-page.hbs';

const btnQueue = document.querySelector('js-btn-queue');
const btnWatched = document.querySelector('js-btn-watched');
const sectionFilmDetailsPage = document.querySelector('.sectionFilmDetailsPage');

const localStoragefilmsQueue = localStorage.getItem('filmsQueue'); //читаем localStorage по ключу filmsQueue
const localStoragefilmsWatched = localStorage.getItem('filmsWatched'); //читаем localStorage по ключу filmsWatched

function monitorButtonStatusText() {

    if (localStoragefilmsQueue.find(movie => movie.id === selectFilm.id)) {
        btnQueue.textContent = "Delete from queue";
    }
    else {
        btnQueue.textContent = "Add to queue";
    };

    if (localStoragefilmsWatched.find(movie => movie.id === selectFilm.id)) {
        btnWatched.textContent = "Delete from watched";
    }
    else {
        btnWatched.textContent = "Add to watched";
    };

    // следит за состоянием(значок и текст в кнопке) читает  local storage по ключу filmsQueue и  filmsWatched 
    // и меняет текст и значки в кнопках: Delete from queue / Add to queue; Delete from watched / Add to watched.
};


function toggleToQueue() {
    let filmsQueueArray = [];

    if (localStoragefilmsQueue !== null) {
        filmsQueueArray.push(...JSON.parse(localStoragefilmsQueue));
    };

    if (filmsQueueArray.find(movie => movie.id === selectFilm.id)) {
        filmsQueueArray = filmsQueueArray.filter(movie => movie.id !== selectFilm.id);
    }
    else {
        filmsQueueArray.push(selectFilm);
    };

    localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArray));

    monitorButtonStatusText();

};

// будет добавлять или удалять фильмы из очереди просмотра), которая создает переменную массива в очереди,
// читает local storage по ключу filmsQueue если результат не пустой то пушит элементы в нашу переменную,
// !также функция вплотную работает с глобальной переменной selectFilm,
// и если selectFilm содержиться в нашей переменной то убираем его оттуда иначе добавляем selectFilm в нашу переменную,
// потом эта функция кладет нашу переменную в  local storage, запускает в конце себя функцию monitorButtonStatusText;


function toggleToWatched() {
    let filmsWatchedArray = [];

    if (localStoragefilmsWatched !== null) {
        filmsWatchedArray.push(...JSON.parse(localStoragefilmsWatched));
    };

    if (filmsWatchedArray.find(movie => movie.id === selectFilm.id)) {
        filmsWatchedArray = filmsWatchedArray.filter(movie => movie.id !== selectFilm.id);
    }
    else {
        filmsWatchedArray.push(selectFilm);
    };

    localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArray));

    monitorButtonStatusText();
};
// будет добавлять или удалять фильмы из просмотренных), суть ее работы один в один как toggleToQueue
// только работает с local storage по ключу filmsWatched.


function showDetails(selectFilm) {

    const murkup = detailsPage(selectFilm);

    sectionFilmDetailsPage.insertAdjacentHTML('beforeend', murkup);

    monitorButtonStatusText();
    // принимает параметром selectFilm(глобальная переменная - объект, которая создана в задаче номер три)
    // и рендерит всю разметку согласно макета
};


// * из DOM достукивается до нужных кнопок участник 3 и вешает функции  toggleToQueue
// и toggleToWatched слушателями на страницу деталей и удаляет там где не нужно.
