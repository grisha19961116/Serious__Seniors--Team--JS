<<<<<<< HEAD
export  { activeHomePage, activeLibraryPage, activeDetailsPage} ;
=======
export { activeHomePage, activeLibraryPage, activeDetailsPage };
>>>>>>> 5f0066b2a19bbb62cdfba99e8e8915d1639dc46a
import refsNavigation from '../refsNavigation';
import { plaginationNavigation } from './searchAndPlaginationHomePage'
import variables from '../variables';
import localStorage from '../localStorageSettings';
<<<<<<< HEAD
import  {drawQueueFilmList} from './libraryPage';
import {drawWatchedFilmList} from './libraryPage';
import {showDetails,toggleToQueue,toggleToWatched} from './filmDetailPage.js';
refsNavigation.filmDetailPageSection.classList.add('hidden');
refsNavigation.filmLibraryPageSection.classList.add('hidden');
function activeHomePage () {
  refsNavigation.filmDetailPageSection.classList.add('hidden');
  refsNavigation.filmLibraryPageSection.classList.add('hidden');
  refsNavigation.homePageSection.classList.remove('hidden');
  refsNavigation.buttonNext.addEventListener('click',plaginationNavigation);
  refsNavigation.buttonPrev.addEventListener('click',plaginationNavigation);
  refsNavigation.buttonFilmsWatched.removeEventListener('click', drawWatchedFilmList);
  refsNavigation.buttonShowLIstQueue.removeEventListener('click', drawQueueFilmList);
  refsNavigation.buttonAddFilmToWatched.removeEventListener('click', toggleToWatched);
  refsNavigation.buttonAddFilmToQueue.removeEventListener('click', toggleToQueue);
}
function activeLibraryPage () {
  refsNavigation.filmDetailPageSection.classList.add('hidden');
  refsNavigation.homePageSection.classList.add('hidden');
  refsNavigation.filmLibraryPageSection.classList.remove('hidden');
  drawQueueFilmList();
  refsNavigation.buttonFilmsWatched.addEventListener('click', drawWatchedFilmList);
  refsNavigation.buttonShowLIstQueue.addEventListener('click', drawQueueFilmList);
  refsNavigation.buttonAddFilmToWatched.removeEventListener('click', toggleToWatched);
  refsNavigation.buttonAddFilmToQueue.removeEventListener('click', toggleToQueue);
  refsNavigation.buttonNext.removeEventListener('click', plaginationNavigation);
  refsNavigation.buttonPrev.removeEventListener('click', plaginationNavigation);
}
function activeDetailsPage (movieSelectedById, checkFlag) {
  refsNavigation.homePageSection.classList.add('hidden');
  refsNavigation.filmLibraryPageSection.classList.add('hidden');
  refsNavigation.filmDetailPageSection.classList.remove('hidden');
  if(checkFlag){
    let queueAndWatchedFilmListFromLS = [...JSON.parse(localStorage.getItem('filmsQueue')), ...JSON.parse(localStorage.getItem('filmsWatched'))];
    variables.selectFilm = queueAndWatchedFilmListFromLS.find(el => el === movieSelectedById);
    } else {
    variables.selectFilm = variables.renderFilms.find(el => el === movieSelectedById);
  }
  showDetails(variables.selectFilm);
  refsNavigation.buttonAddFilmToQueue.addEventListener('click', toggleToQueue);
  refsNavigation.buttonAddFilmToWatched.addEventListener('click', toggleToWatched);
  refsNavigation.buttonShowLIstQueue.removeEventListener('click', drawQueueFilmList);
  refsNavigation.buttonFilmsWatched.removeEventListener('click', drawWatchedFilmList);
  refsNavigation.buttonNext.removeEventListener('click', plaginationNavigation);
  refsNavigation.buttonPrev.removeEventListener('click', plaginationNavigation);
=======
import { drawQueueFilmList } from './libraryPage';
import { drawWatchedFilmList } from './libraryPage';
import { showDetails, toggleToQueue, toggleToWatched } from './filmDetailPage.js';
// console.log(plaginationNavigation,`function konstantins`)
console.log(drawQueueFilmList, drawWatchedFilmList, `romans functions`);
console.log(showDetails, `function showDetails is Andria Kikot`);
console.log(toggleToQueue, `toggleToQueue ffff`);
function activeHomePage() {
    refsNavigation.homeDom.addEventListener('click', (() => {
        refsNavigation.filmDetailPageSection.classList.add('hidden');
        refsNavigation.filmLibraryPageSection.classList.add('hidden');

        refsNavigation.buttonNext.addEventListener('click', ((even) => {
            plaginationNavigation(even);
        }));
    }));
}
activeHomePage();
function activeLibraryPage() {
    console.log(`hello from navigation.js of activeLibraryPage function`);
    refsNavigation.libraryDom.addEventListener('click', ((even) => {
        refsNavigation.filmDetailPageSection.classList.add('hidden');
        refsNavigation.homePageSection.classList.add('hidden');
        refsNavigation.filmLibraryPageSection.classList.remove('hidden');
        refsNavigation.buttonFilmsWatched.addEventListener('click', ((even) => {
            drawWatchedFilmList();
        }));
        refsNavigation.buttonShowLIstQueue.addEventListener('click', (() => {
            drawQueueFilmList();
        }))
    }));
}
activeLibraryPage();
function activeDetailsPage(movieSelectedById, check) {
    // - пишем функцию showDetails которая принимает параметром selectFilm 
    // (глобальная переменная - объект, которая создана в задаче номер три)
    //  и рендерит всю разметку согласно макета, в этой функции запускается функция
    //   monitorButtonStatusText.
    // * из DOM достукивается до нужных кнопок участник 3 и вешает функции  toggleToQueue 
    //  и toggleToWatched слушателями на страницу деталей и удаляет там где не нужно.

    refsNavigation.homePageSection.classList.add('hidden');
    refsNavigation.filmLibraryPageSection.classList.add('hidden');
    if (check) {
        showDetails(movieSelectedById);
    } else {
        showDetails(movieSelectedById);
    }
    refsNavigation.buttonAddFilmToQueue.addEventListener('click', ((even) => {
        refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
        refsNavigation.buttonAddFilmToWatched.textContent = 'Add to watched';
        if (!refsNavigation.buttonAddFilmToQueue.classList.contains('js-btn-queue--active')) {
            refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
            refsNavigation.buttonAddFilmToQueue.classList.add('js-btn-queue--active');
            refsNavigation.buttonAddFilmToQueue.textContent = 'Remove from queue';
            return;
        } else if (refsNavigation.buttonAddFilmToQueue.classList.contains('js-btn-queue--active')) {
            refsNavigation.buttonAddFilmToQueue.classList.remove('js-btn-queue--active');
            refsNavigation.buttonAddFilmToQueue.textContent = 'Add to queue';
            refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
        }
    }));
    refsNavigation.buttonAddFilmToWatched.addEventListener('click', ((even) => {
        refsNavigation.buttonAddFilmToQueue.classList.remove('js-btn-queue--active');
        refsNavigation.buttonAddFilmToQueue.textContent = 'Add to queue';
        if (!refsNavigation.buttonAddFilmToWatched.classList.contains('js-btn-watched--active')) {
            refsNavigation.buttonAddFilmToQueue.classList.remove('js-btn-queue--active');
            refsNavigation.buttonAddFilmToWatched.classList.add('js-btn-watched--active');
            refsNavigation.buttonAddFilmToWatched.textContent = 'Remove from watched';
            return;
        } else if (refsNavigation.buttonAddFilmToWatched.classList.contains('js-btn-watched--active')) {
            refsNavigation.buttonAddFilmToWatched.classList.remove('js-btn-watched--active');
            refsNavigation.buttonAddFilmToWatched.textContent = 'Add to watched';
            refsNavigation.buttonAddFilmToQueue.classList.remove('js-btn-queue--active');
        }
    }));
    // - вешаем слушателей на переход на домашнюю страницу и страницу библиотеки в хедере.
    // - на логотип повесить запуск функции activeHomePage, чтобы при клике туда возвращаться.
>>>>>>> 5f0066b2a19bbb62cdfba99e8e8915d1639dc46a
}
