export  {drawQueueFilmList,drawWatchedFilmList} ;
import refsNavigation from '../refsNavigation';
import localStorage from '../localStorageSettings';
import variables from '../variables';
import libraryPageGalleryTpl from '../templates/library-gallery.hbs';
import {activeDetailsPage} from './navigation';

const libraryFilmList = document.querySelector('.library__filmList');

function createLibraryCardFunc() {
    // `масив(обектов)` принімає в параметри createLibraryCardFunc()  данні від Андрія
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
      // movieId (это масив с одним обектом) и флаг тру!!! передаєш вибраний кліком обєкт по айді!!!!
      activeDetailsPage(movieId,true);
    }));
}
function drawQueueFilmList() {    
    if(localStorage.getFilmsQueue === null){
        const noMoviesListNotation = document.createElement('li');
        noMoviesListNotation.textContent = ""        
        noMoviesListNotation.textContent = 'You do not have to queue movies to watch. Add them.'            
        const fragment = document.createDocumentFragment()
        fragment.append(noMoviesListNotation)
        libraryFilmList.append(fragment)
        refsNavigation.buttonFilmsWatched.classList.remove('library__btn--active');
        refsNavigation.buttonShowLIstQueue.classList.add('library__btn--active');
        // отрисовывает заглушку “You do not have watched movies. Add them.”, 
        // и удаляет класс активной кнопки у просмотренных фильмов и добавляет такой класс 
        // кнопке очереде просомотра.
        return;
    }
    createLibraryCardFunc();
}


function drawWatchedFilmList() {        
    if(localStorage.getWatchedFilm === null){
        const noMoviesListNotation = document.createElement('li');
        noMoviesListNotation.textContent = 'You do not have watched movies. Add them.'            
        const fragment = document.createDocumentFragment()
        fragment.append(noMoviesListNotation)
        libraryFilmList.append(fragment)
        refsNavigation.buttonShowLIstQueue.classList.remove('library__btn--active');
        refsNavigation.buttonFilmsWatched.classList.add('library__btn--active');
        // отрисовывает заглушку “You do not have watched movies. Add them.”, 
        // и удаляет класс активной кнопки у кнопки очереди просомотра и добавляет такой класс 
        // кнопке просмотренных фильмов.
        return;
        }
    createLibraryCardFunc()
}
