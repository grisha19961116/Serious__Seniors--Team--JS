export  {activeHomePage,activeLibraryPage,activeDetailsPage} ;
import refsNavigation from '../refsNavigation';
import variables from '../variables';
import  {drawQueueFilmList} from './libraryPage';
import {drawWatchedFilmList} from './libraryPage';
console.log(drawQueueFilmList,drawWatchedFilmList,`romans functions`);
function activeHomePage () {
    refsNavigation.homeDom.addEventListener('click',((even) => {
        refsNavigation.filmDetailPageSection.classList.add('hidden');
        refsNavigation.filmLibraryPageSection.classList.add('hidden');
        refsNavigation.buttonNext.addEventListener('click',(() => {
            variables.pageNumber ++ ;
            refsNavigation.buttonNumber.textContent = variables.pageNumber;
        }));
        refsNavigation.buttonPrev.addEventListener('click',(() => {
            if(variables.pageNumber <= 1 ){
                return;
            }
            variables.pageNumber -- ;
            refsNavigation.buttonNumber.textContent = variables.pageNumber;
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
function activeDetailsPage (movieId,check) {
    refsNavigation.homePageSection.classList.add('hidden');
    refsNavigation.filmLibraryPageSection.classList.add('hidden');
    if(check){
        variables.selectFilm = [...movieId];
        console.log(variables.selectFilm,`data from ctiveDetailsPage and flag is true`);
        //запускает функцию showDetails(variables.selectFilm) (которую сделает 4й участник);
        // if boolean (true);
    } else {
        variables.selectFilm = [...movieId];
        console.log(variables.selectFilm,`data from activeDetailsPage and flag is false`)
        //запускает функцию showDetails(variables.selectFilm) (которую сделает 4й участник);
        // if boolean (false);
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

