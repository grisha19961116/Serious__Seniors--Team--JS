export default {showDetails};
import detailsPage from '../templates/details-page.hbs';
import refsNavigation from '../refsNavigation';
import localStorage from '../localStorageSettings';
import variables from '../variables';
function monitorButtonStatusText() {
    if(localStorage.getWatchedFilm === null){
        console.log(`localStorage is empty localStorage.getWatchedFilm === null console from monitorButtonStatusText() `);
        return;
    } else if(localStorage.getWatchedFilm.length === 0 && localStorage.getWatchedFilm  === ''){
        console.log(`you need get valid key from localStorage`);
        return;
} else if(localStorage.getWatchedFilm === 'active'){
    refsNavigation.buttonAddFilmToWatched.textContent = 'Remove from watched';
    refsNavigation.buttonAddFilmToWatched.classList.add('js-btn-watched--active');
} else if(localStorage.getWatchedFilm === 'inactive'){
    refsNavigation.buttonAddFilmToWatched.textContent = 'Add to watched';
    refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
}
if(localStorage.getFilmsQueue === null){
    console.log(`localStorage is empty localStorage.getWatchedFilm === null console from monitorButtonStatusText() `); 
    return;
} else if(localStorage.getFilmsQueue.length === 0 || localStorage.getFilmsQueue === ''){
    console.log(`get valid key from localStorage`);
} else if(localStorage.getFilmsQueue === 'active'){
    refsNavigation.buttonAddFilmToQueue.textContent = 'Remove from queue';
    refsNavigation.buttonAddFilmToQueue.classList.add('js-btn-queue--active');
} else if(localStorage.getFilmsQueue === 'inactive'){
    refsNavigation.buttonAddFilmToQueue.textContent = 'Add to queue';
    refsNavigation.buttonAddFilmToQueue.classList.remove('js-btn-queue--active');
}
};
export function toggleToQueue() { //будет добавлять или удалять фильмы из очереди просмотра
    let filmsQueueArray;
    console.log(variables.selectFilm,`select film in toggleToQueue() `)
    if(localStorage.getFilmsQueue === null){
        filmsQueueArray = [...variables.selectFilm]; 
    } else if (localStorage.getFilmsQueue !== null) {
        filmsQueueArray = [...localStorage.getFilmsQueue];
    };
    localStorage.setFilmsQueue(filmsQueueArray);
    console.log(filmsQueueArray,`array with dat for local storage films to queue which work with method array variables SelectFiLM`)
    console.log(localStorage.setFilmsQueue(filmsQueueArray),`toggleToQueue()`)
    monitorButtonStatusText(); 
};
export function toggleToWatched() { //будет добавлять или удалять фильмы из просмотренных
    let filmsWatchedArray;
    console.log(variables.selectFilm,`select film in toggleToWatched() `)
    if(localStorage.getWatchedFilm === null){
        filmsWatchedArray = [...variables.selectFilm]; 
    } else if (localStorage.getWatchedFilm !== null) {
        filmsWatchedArray = [...localStorage.getWatchedFilm];
    };
    localStorage.setWatchedFilm(filmsQueueArray);
    console.log(filmsQueueArray,`array with dat for local storage films to queue which work with method array variables SelectFiLM`)
    console.log(localStorage.setFilmsQueue(filmsQueueArray),`toggleToWatched()`)
    monitorButtonStatusText(); 
};

export function showDetails(selectedFilm) {
    console.log(selectedFilm,`get data from api from navigation.js`);
    //функция принимает параметром selectFilm(глобальная переменная
    // - объект, которая создана в задаче номер три)
    // const murkup = detailsPage(selectFilm);
    // sectionFilmDetailsPage.insertAdjacentHTML('beforeend', murkup); 
    // и рендерит всю разметку согласно макета
    // monitorButtonStatusText(); функция следит за состоянием(значок и текст в кнопке);

};



