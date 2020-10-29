const homeDom = document.querySelector('.home-link');
const libraryDom = document.querySelector('.library-link');

const filmLibraryPageSection = document.querySelector('.myFilmLibraryPage__section');
// const secondSection = document.querySelector('');
// const thirdSection = document.querySelector('');
const buttonShowLIstQueue = document.querySelector('.library__btn--queue');
const buttonFilmsWatched = document.querySelector('.library__btn--watch');
// const buttonAddFilm = document.querySelector('кнопка добавления фильмов в очередь просмотра');
// const buttonDeleteFilm = document.querySelector('кнопка удаления фильмов з очереди просмотра');
// const buttonAddFilmQueueToWatched = document.querySelector('кнопка добавления фильмов  из просмотренных со страницы detailsPage');
// const buttonDeleteFilmQueueFromWatched = document.querySelector('кнопка удаления фильмов  из просмотренных со страницы detailsPage');
const buttonPrev = document.querySelector('.button__prev');
const buttonNext = document.querySelector('.button__next');
let selectFilm = true;
const activeHomePage = () =>{
    console.log(`hello from navigation.js of activeHomePage function`);
//     показывает домашнюю страницу linkHomeDom робимо з нею
//     и прячет остальные filmLibraryPageSection secondSection thirdSection добавляючи класс через класліст адд, а также
//    вешает слушателей на кнопку вперед buttonNext и назад buttonPrev из плагинации и удаляет ненужных всех слушателей
//    (таких 4 во всем проекте не нужных на этой странице);
}
activeHomePage();
const activeLibraryPage = () => {
    console.log(`hello from navigation.js of activeLibraryPage function`);
//    показывает страницу с библиотекой и прячет остальные, робимо з нею libraryDom
//    запускает функцию отрисовки фильмов из очереди drawQueueFilmList (которую сделает пятый участник) 
//    и добавляет кнопке списка очереди фильмов эффект выбранной с помощью класса, а также вешает
//    слушателей на кнопки показа очереди фильмов buttonShowLIstQueue и просмотренных фильмов buttonFilmsWatched и удаляет ненужных всех
//    слушателей (таких 4 во всем проекте не нужных на этой странице);
}
activeLibraryPage();
console.log(`hello from navigation.js`);
const activeDetailsPage = (movieId,itsLibraryFilm) => {
    // - создаем функцию activeDetailsPage которая показывает страницу детальной отрисовки фильма
    //  и прячет остальные, функция принимает два параметра 
    // movieId и itsLibraryFilm (это bool) тоесть true or false
    if(movieId){
        // selectFilm = {`нужным объектом`};
        // запускаем функцию showDetails() (которую сделает 4й участник);
        //  вешаем слушателей на кнопки добавления/удаления фильмов в очередь просмотра
       //   и добавления/удаления фильмов из просмотренных со страницы detailsPage и удаляет
       //   ненужных всех слушателей (таких 4 во всем проекте не нужных на этой странице);
       // - вешаем слушателей на переход на домашнюю страницу и страницу библиотеки в хедере.
      // -  на логотип повесить запуск функции activeHomePage, чтобы при клике туда возвращаться.
    } else if(itsLibraryFilm){
        // selectFilm = {`нужным объектом`};
        // запускает функцию showDetails() (которую сделает 4й участник);
    }
    console.log(`hello from navigation.js of activeDetailsPage function`);
}

