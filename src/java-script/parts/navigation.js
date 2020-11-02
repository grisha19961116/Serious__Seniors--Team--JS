export  {activeHomePage,activeLibraryPage,activeDetailsPage} ;
import refsNavigation from '../refsNavigation';
import {plaginationNavigation} from './searchAndPlaginationHomePage'
import variables from '../variables';
import localStorage from '../localStorageSettings';
import  {drawQueueFilmList} from './libraryPage';
import {drawWatchedFilmList} from './libraryPage';
import {showDetails,toggleToQueue,toggleToWatched} from './filmDetailPage.js';
function activeHomePage () {
    refsNavigation.buttonFilmsWatched.removeEventListener('click', drawWatchedFilmList);
    refsNavigation.buttonShowLIstQueue.removeEventListener('click', drawQueueFilmList);
    refsNavigation.buttonAddFilmToWatched.removeEventListener('click', toggleToWatched);
    refsNavigation.buttonAddFilmToQueue.removeEventListener('click', toggleToQueue);
    refsNavigation.buttonNext.addEventListener('click',((even) => {plaginationNavigation(even)}));
    refsNavigation.buttonPrev.addEventListener('click',((even) => {plaginationNavigation(even)}));
};

refsNavigation.homeDom.addEventListener('click',(() => {
    refsNavigation.filmDetailPageSection.classList.add('hidden');
    refsNavigation.filmLibraryPageSection.classList.add('hidden');
    activeHomePage();
}));

refsNavigation.logoDom.addEventListener('click',(() => {
    refsNavigation.filmDetailPageSection.classList.add('hidden');
    refsNavigation.filmLibraryPageSection.classList.add('hidden');
    activeHomePage();
}));

function activeLibraryPage () {
    refsNavigation.filmDetailPageSection.classList.add('hidden');
    refsNavigation.homePageSection.classList.add('hidden');
    refsNavigation.filmLibraryPageSection.classList.remove('hidden');
    drawQueueFilmList();

    refsNavigation.libraryDom.addEventListener('click',((even) => {
    }));
    refsNavigation.buttonFilmsWatched.addEventListener('click',((even) => {
        drawWatchedFilmList();
    }));
    refsNavigation.buttonShowLIstQueue.addEventListener('click',(() => {
        drawQueueFilmList();
    }));
    refsNavigation.buttonAddFilmToWatched.removeEventListener('click', toggleToWatched);
    refsNavigation.buttonAddFilmToQueue.removeEventListener('click', toggleToQueue);
    refsNavigation.buttonNext.removeEventListener('click',plaginationNavigation);
    refsNavigation.buttonPrev.removeEventListener('click',plaginationNavigation);
    // удаляємо слухачів( тонгл то кю) , (тонгл то ватч), знімаю слухачів з некст і прев
}

function activeDetailsPage (movieSelectedById,checkFlag) {
 // - пишем функцию showDetails которая принимает параметром selectFilm 
// (глобальная переменная - объект, которая создана в задаче номер три)
//  и рендерит всю разметку согласно макета, в этой функции запускается функция
//   monitorButtonStatusText.
// * из DOM достукивается до нужных кнопок участник 3 и вешает функции  toggleToQueue 
//  и toggleToWatched слушателями на страницу деталей и удаляет там где не нужно.

    refsNavigation.homePageSection.classList.add('hidden');
    refsNavigation.filmLibraryPageSection.classList.add('hidden');
    if(checkFlag){

        const requestWatchedFilmsFromLocStor = localStorage.getItem('filmsWatched');
        let itIsFind = 0 ;
        if(requestWatchedFilmsFromLocStor === null){
            return;
        } 
        if(requestWatchedFilmsFromLocStor === []){
            return;
        } 
        requestWatchedFilmsFromLocStor.forEach(element => {
            if(element === movieSelectedById) {
                itIsFind = element;
              return;
            } 
          });
          variables.selectFilm = itIsFind;
        //get [arrayWatchedFilms] from localStor, from library(flag true)
        // and findBy(movieSelectedById) and find it in (get [arrayWatchedFilms] from local) 
       //  and inseart it in variables.selectFilm;;
        
    } else {
          // зсилаюсь на вар рендер філмс який запис при запросі першому
        variables.selectFilm = variables.renderFilm;
        variables.renderFilms.forEach(element => {
            if(element === movieSelectedById) {
                itIsFind = element;
              return;
            } 
          });
        // зсилаюсь на вар рендер філмс який запис при запросі першому
        // variables.selectFilm = variables.renderFilms and search 'movieSelectedById'
        //  in (variables.renderFilms);
       }

       showDetails(movieSelectedById);  /// variables.selectFilmпередаємо Андрійж {one }

    refsNavigation.buttonAddFilmToQueue.addEventListener('click',((even) => {
        refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
        refsNavigation.buttonAddFilmToWatched.textContent = 'Add to watched';
        if(!refsNavigation.buttonAddFilmToQueue.classList.contains('js-btn-queue--active')){
            refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
            refsNavigation.buttonAddFilmToQueue.classList.add('js-btn-queue--active');
            refsNavigation.buttonAddFilmToQueue.textContent = 'Remove from queue';
            return;
        } else if(refsNavigation.buttonAddFilmToQueue.classList.contains('js-btn-queue--active')) {
            refsNavigation.buttonAddFilmToQueue.classList.remove('js-btn-queue--active');
            refsNavigation.buttonAddFilmToQueue.textContent = 'Add to queue';
            refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
        } 
    }));
    refsNavigation.buttonAddFilmToWatched.addEventListener('click',((even) => {
        refsNavigation.buttonAddFilmToQueue.classList.remove('js-btn-queue--active');
        refsNavigation.buttonAddFilmToQueue.textContent = 'Add to queue';
        if(!refsNavigation.buttonAddFilmToWatched.classList.contains('js-btn-watched--active')){
            refsNavigation.buttonAddFilmToQueue.classList.remove('js-btn-queue--active');
            refsNavigation.buttonAddFilmToWatched.classList.add('js-btn-watched--active');
            refsNavigation.buttonAddFilmToWatched.textContent = 'Remove from watched';
            return;
        } else if(refsNavigation.buttonAddFilmToWatched.classList.contains('js-btn-watched--active')) {
            refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
            refsNavigation.buttonAddFilmToWatched.textContent = 'Add to watched';
            refsNavigation.buttonAddFilmToQueue.classList.remove('js-btn-queue--active');
        } 
    }));
     // - вешаем слушателей на переход на домашнюю страницу и страницу библиотеки в хедере.
     // - на логотип повесить запуск функции activeHomePage, чтобы при клике туда возвращаться.
}

function activeDetailsPage (movieSelectedById,checkFlag) {
    // - пишем функцию showDetails которая принимает параметром selectFilm 
    // (глобальная переменная - объект, которая создана в задаче номер три)
    //  и рендерит всю разметку согласно макета, в этой функции запускается функция
    refsNavigation.homePageSection.classList.add('hidden');
    refsNavigation.filmLibraryPageSection.classList.add('hidden');
    if(checkFlag){
        const requestWatchedFilmsFromLocStor = [];//get array from local, from library(flag true)
        // and findBy(movieSelectedById) and find it in (get array from local) and inseart it in variables.selectFilm;;
    } else {
         // зсилаюсь на вар рендер філмс який запис при запросі першому
         // variables.selectFilm = variables.renderFilms and search 'movieSelectedById' in (variables.renderFilms)
        }
        showDetails(movieSelectedById);  /// variables.selectFilmпередаємо Андрійж
        // refsNavigation.buttonAddFilmToQueue.addEventListener('click',((even) => {
        //     refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
        //     refsNavigation.buttonAddFilmToWatched.textContent = 'Add to watched';