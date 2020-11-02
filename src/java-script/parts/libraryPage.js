export  {drawQueueFilmList,drawWatchedFilmList} ;
import refsNavigation from '../refsNavigation';
import localStorage from '../localStorageSettings';
import variables from '../variables';
import libraryPageGalleryTpl from '../templates/library-gallery.hbs';
import {activeDetailsPage} from './navigation';

const libraryFilmList = document.querySelector('.library__filmList');
//функция сама примет данные из localStorage, классов для нее у меня пока нет они должны быть общими с createCards
function createLibraryCardFunc(filmTitle, imgPath, movieId, voteAverage) {
//создает li согласно макета, вешает на нее слушателем функцию activeDetailsPage 
//c параметрами movieId и флагом true вся эта функция возвращает созданный li
  const item = document.createElement('li');
  item.classList.add('some_class'); ///нужно добавить тот же класс на li, что и в функции createCards

  const img = document.createElement('img');
  img.classList.add('some_class');///нужно добавить тот же класс на img, что и в функции createCards  
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500${imgPath}`);
  
  const movieName = document.createElement('p');
  movieName.classList.add('some_class');///нужно добавить тот же класс на <P> с именем, что и в функции createCards
  movieName.textContent = filmTitle;
    
  const voteFilm = document.createElement('p');
  voteFilm.classList.add('library__vote');///нужно добавить тот же класс на <P> с именем, что и в функции createCards
  voteFilm.textContent = voteAverage;

  item.append(img, movieName, voteFilm);
  item.addEventListener('click', () => activeDetailsPage(movieId, true));
  return item;
}

function drawWatchedFilmList() {
// если значение local не пустое и не равно нулю длина массива то проходим по нему
// и в созданный fragment в цикле запускаем функцию createLibraryCardFunc() которая создает нужные li
    buttonWatch.classList.add('library__btn--active');
    buttonQueue.classList.remove('library__btn--active');
    let fragment = document.createDocumentFragment();
    const local = JSON.parse(localStorage.getItem('filmsWatched'));//можно заменить local на getWatchedFilm, но не уверен
    if(localStorage.getWatchedFilm !== null){ ///нужно добавить проверку на длинну масива
        local.foreach(el => fragment.append(
        createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average),
      ));
    myLibrary.append(fragment);
    }else{
        //это логика для заглушки, без модального окнна, но она еще не доработана.
        const noMoviesListNotation = document.createElement('li');
        noMoviesListNotation.textContent = 'You do not have watched movies. Add them.'            
        const fragment = document.createDocumentFragment()
        fragment.append(noMoviesListNotation)
        libraryFilmList.append(fragment)
    }    
  }
function drawQueueFilmList() {
// если значение local не пустое и не равно нулю длина массива то проходим по нему
// и в созданный fragment в цикле запускаем функцию createLibraryCardFunc() которая создает нужные li   
    buttonWatch.classList.remove('library__btn--active');
    buttonQueue.classList.add('library__btn--active');  
    const local = JSON.parse(localStorage.getItem('filmsQueue'));//можно заменить local на getWatchedFilm, но не уверен
    let fragment = document.createDocumentFragment();
    if(localStorage.getFilmsQueue !== null){
        local.foreach(el => fragment.append(
        createLibraryCardFunc(el.title, el.backdrop_path, el.id, el.vote_average),
      ));
    myLibrary.append(fragment);
    }else{
        //это логика для заглушки, без модального окнна, но она еще не доработана.
        const noMoviesListNotation = document.createElement('li');
        noMoviesListNotation.textContent = ""        
        noMoviesListNotation.textContent = 'You do not have to queue movies to watch. Add them.'            
        const fragment = document.createDocumentFragment()
        fragment.append(noMoviesListNotation)
        libraryFilmList.append(fragment)
    }
  }
// Дальше, то что сделал ты, я не удалял, возможно пригодится.//

// function createLibraryCardFunc() {
//     // `масив(обектов)` принімає в параметри createLibraryCardFunc()  данні від Андрія
//     const dataFromApi = variables.selectFilm;
//     refsNavigation.homepageList.innerHTML = renderFilmsList ;
//     const renderFilmsList = libraryPageGalleryTpl(variables.selectFilm);
//     const homepageLi = document.querySelector('.homepage-list__li');
//     // данні від Андрія , які користувач добавив через кнопки додати в чергу просмотрів і додати до списку (обєкт(масивів))
//     homepageLi.addEventListener('click',((even) => {
//     //   console.log(even,`event from createLibraryCardFunc in Romans section`);
//       const idForSearching = Number(even.currentTarget.id);
//       let movieId = [] ;
//       console.log(idForSearching);
//       dataFromApi.forEach(element => {
//         if(element.id === idForSearching ) {
//             movieId = [element];
//           return;
//         } 
//       });
//       // movieId (это масив с одним обектом) и флаг тру!!! передаєш вибраний кліком обєкт по айді!!!!
//       activeDetailsPage(movieId,true);
//     }));
// }
// function drawQueueFilmList() {    
//     if(localStorage.getFilmsQueue === null){
        
//         refsNavigation.buttonFilmsWatched.classList.remove('library__btn--active');
//         refsNavigation.buttonShowLIstQueue.classList.add('library__btn--active');
//         // отрисовывает заглушку “You do not have watched movies. Add them.”, 
//         // и удаляет класс активной кнопки у просмотренных фильмов и добавляет такой класс 
//         // кнопке очереде просомотра.
//         return;
//     }
//     createLibraryCardFunc();
// }


// function drawWatchedFilmList() {        
//     if(localStorage.getWatchedFilm === null){
//         refsNavigation.buttonShowLIstQueue.classList.remove('library__btn--active');
//         refsNavigation.buttonFilmsWatched.classList.add('library__btn--active');
//         // отрисовывает заглушку “You do not have watched movies. Add them.”, 
//         // и удаляет класс активной кнопки у кнопки очереди просомотра и добавляет такой класс 
//         // кнопке просмотренных фильмов.
//         return;
//         }
//     createLibraryCardFunc()
// }
