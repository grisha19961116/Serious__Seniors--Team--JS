export  {drawQueueFilmList,drawWatchedFilmList} ;
import refsNavigation from '../refsNavigation';
import localStorage from '../localStorageSettings';
import libraryPageGalleryTpl from '../templates/library-gallery.hbs';
import {activeDetailsPage} from './navigation';
function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
    const renderFilmsList = libraryPageGalleryTpl(dataFromApi);
    refsNavigation.homepageList.innerHTML = renderFilmsList ;
    const homepageLi = document.querySelector('.homepage-list__li');
    homepageLi.addEventListener('click',((even) => {
      console.log(even,`event from createLibraryCardFunc in Romans section`);
      activeDetailsPage(movieId,true);
    }));
}
function drawQueueFilmList() {
    refsNavigation.buttonFilmsWatched.classList.remove('library__btn--active');
    refsNavigation.buttonShowLIstQueue.classList.add('library__btn--active');
    if(localStorage.getFilmsQueue === null){
        console.log(`localStorage is empty localStorage.getFilmsQueue === null`) 
        return;
    } else if(localStorage.getFilmsQueue.length === 0 || localStorage.getFilmsQueue === ''){
//    отрисовать заглушку “You do not have to queue movies to watch. Add them.”,
// и удаляет класс активной кнопки  у просмотренных фильмов и добавляет
// такой класс кнопке очереде просомотра;
        return;
    }
    createLibraryCardFunc()
}
function drawWatchedFilmList() {
        refsNavigation.buttonFilmsWatched.classList.add('library__btn--active');
        refsNavigation.buttonShowLIstQueue.classList.remove('library__btn--active');
        if(localStorage.getWatchedFilm === null){
            console.log(`localStorage is empty localStorage.getWatchedFilm === null`) 
            return;
        } else if(localStorage.getWatchedFilm.length === 0 && localStorage.getWatchedFilm.includes(0)){
//       отрисовать заглушку “You do not have watched movies. Add them.”,
//     и удаляет класс активной кнопки у кнопки очереди просомотра и добавляет такой класс кнопке просмотренных
//      фильмов.
        return;
    }
    createLibraryCardFunc()
}
