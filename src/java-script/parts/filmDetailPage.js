import detailsPage from '../templates/details-page.hbs';

const btnQueue = document.querySelector('.js-btn-queue'); //кнопка добавления/удаления фильмов из очереди
const btnWatched = document.querySelector('.js-btn-watched'); //кнопка добавления/удаления фильмов из просмотренных
const sectionFilmDetailsPage = document.querySelector('.sectionFilmDetailsPage');  //секция для рендера в неё из темплейтов

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

    // функция следит за состоянием(значок и текст в кнопке) читает  local storage по ключу filmsQueue и  filmsWatched 
    // и меняет текст и значки в кнопках: Delete from queue / Add to queue; Delete from watched / Add to watched.
};


function toggleToQueue() { //будет добавлять или удалять фильмы из очереди просмотра
    let filmsQueueArray = []; //создает переменную массива в очереди

    if (localStoragefilmsQueue !== null) { //читает local storage по ключу filmsQueue если результат не пустой то пушит элементы в нашу переменную
        filmsQueueArray.push(...JSON.parse(localStoragefilmsQueue));
    };

    if (filmsQueueArray.find(movie => movie.id === selectFilm.id)) { //если selectFilm содержиться в нашей переменной то убираем его оттуда
        filmsQueueArray = filmsQueueArray.filter(movie => movie.id !== selectFilm.id);
    }
    else {
        filmsQueueArray.push(selectFilm); //иначе добавляем selectFilm в нашу переменную
    };

    localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArray)); //потом эта функция кладет нашу переменную в  local storage

    monitorButtonStatusText(); //функция следит за состоянием(значок и текст в кнопке)

};

function toggleToWatched() { //будет добавлять или удалять фильмы из просмотренных
    let filmsWatchedArray = [];

    if (localStoragefilmsWatched !== null) { //читает local storage по ключу filmsWatched если результат не пустой то пушит элементы в нашу переменную
        filmsWatchedArray.push(...JSON.parse(localStoragefilmsWatched));
    };

    if (filmsWatchedArray.find(movie => movie.id === selectFilm.id)) { //если selectFilm содержиться в нашей переменной то убираем его оттуда
        filmsWatchedArray = filmsWatchedArray.filter(movie => movie.id !== selectFilm.id);
    }
    else {
        filmsWatchedArray.push(selectFilm); //иначе добавляем selectFilm в нашу переменную
    };

    localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArray));

    monitorButtonStatusText(); //функция следит за состоянием(значок и текст в кнопке)
};


function showDetails(selectFilm) { //функция принимает параметром selectFilm(глобальная переменная - объект, которая создана в задаче номер три)

    const murkup = detailsPage(selectFilm);

    sectionFilmDetailsPage.insertAdjacentHTML('beforeend', murkup); // и рендерит всю разметку согласно макета

    monitorButtonStatusText(); //функция следит за состоянием(значок и текст в кнопке)

};


// * из DOM достукивается до нужных кнопок участник 3 и вешает функции  toggleToQueue
// и toggleToWatched слушателями на страницу деталей и удаляет там где не нужно.


export default { toggleToQueue, toggleToWatched, showDetails };