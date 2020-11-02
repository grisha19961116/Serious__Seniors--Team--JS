export  {drawQueueFilmList,drawWatchedFilmList} ;
import refsNavigation from '../refsNavigation';
import localStorage from '../localStorageSettings';
import variables from '../variables';
import libraryPageGalleryTpl from '../templates/library-gallery.hbs';
import {activeDetailsPage} from './navigation';
function createLibraryCardFunc() {

    // `масив(обектов)` принімає в параметри createLibraryCardFunc()  данні від Андрія
    // [{id:33,name}{fffgf}{dfddfdf}]  [{one = id }].leght == 1 
    /// 
    const dataFromApi = variables.selectFilm;
    refsNavigation.homepageList.innerHTML = renderFilmsList ;
    const renderFilmsList = libraryPageGalleryTpl(variables.selectFilm);
    const homepageLi = document.querySelector('.homepage-list__li');
    // данні від Андрія , які користувач добавив через кнопки додати в чергу просмотрів і додати до списку (обєкт(масивів))
    homepageLi.addEventListener('click',((even) => {
    //   console.log(even,`event from createLibraryCardFunc in Romans section`);

      const idForSearching = Number(even.currentTarget.id);
      let movieId = [] ;
      console.log(idForSearching);
      dataFromApi.forEach(element => {
        if(element.id === idForSearching ) {
            movieId = [element];
          return;
        } 
      });
      //
      // movieId (это масив с одним обектом) и флаг тру!!! передаєш вибраний кліком обєкт по айді!!!!
      // movieId = [{one = id }]     [{one = id }]!!!это 
      activeDetailsPage(movieId,true);
    }));
    // [{id:33,name}{fffgf}{dfddfdf}] === [{one = id }];
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
    // data from local storage;
    createLibraryCardFunc(`data from local storage`);
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
