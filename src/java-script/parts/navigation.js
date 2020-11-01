export  {activeHomePage,activeLibraryPage,activeDetailsPage} ;
import refsNavigation from '../refsNavigation';
import {plaginationNavigation} from './searchAndPlaginationHomePage'
import variables from '../variables';
import localStorage from '../localStorageSettings';
import  {drawQueueFilmList} from './libraryPage';
import {drawWatchedFilmList} from './libraryPage';
import {showDetails,toggleToQueue,toggleToWatched} from './filmDetailPage.js';
// console.log(plaginationNavigation,`function konstantins`)
console.log(drawQueueFilmList,drawWatchedFilmList,`romans functions`);
showDetails();
console.log(showDetails,`function showDetails is Andria Kikot`);
console.log(toggleToQueue,`toggleToQueue ffff`);
function activeHomePage () {
    refsNavigation.homeDom.addEventListener('click',(() => {
        refsNavigation.filmDetailPageSection.classList.add('hidden');
        refsNavigation.filmLibraryPageSection.classList.add('hidden');
        
        refsNavigation.buttonNext.addEventListener('click',((even) => {
            plaginationNavigation(even);
        }));
    }));
}
activeHomePage();
function activeLibraryPage () {
    console.log(`hello from navigation.js of activeLibraryPage function`);
    refsNavigation.libraryDom.addEventListener('click',((even) => {
        refsNavigation.filmDetailPageSection.classList.add('hidden');
        refsNavigation.homePageSection.classList.add('hidden');
        refsNavigation.filmLibraryPageSection.classList.remove('hidden');
        refsNavigation.buttonFilmsWatched.addEventListener('click',((even) => {
            drawWatchedFilmList();
        }));
        refsNavigation.buttonShowLIstQueue.addEventListener('click',(() => {
            drawQueueFilmList();
        }))
    }));
}
activeLibraryPage();
function activeDetailsPage (movieSelectedById,check) {
 // - пишем функцию showDetails которая принимает параметром selectFilm 
// (глобальная переменная - объект, которая создана в задаче номер три)
//  и рендерит всю разметку согласно макета, в этой функции запускается функция
//   monitorButtonStatusText.
// * из DOM достукивается до нужных кнопок участник 3 и вешает функции  toggleToQueue 
//  и toggleToWatched слушателями на страницу деталей и удаляет там где не нужно.

    refsNavigation.homePageSection.classList.add('hidden');
    refsNavigation.filmLibraryPageSection.classList.add('hidden');
    if(check){
        showDetails(movieSelectedById);
    } else {
        showDetails(movieSelectedById);
    }
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

