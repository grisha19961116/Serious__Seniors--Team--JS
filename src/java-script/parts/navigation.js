import refsNavigation from '../refsNavigation'
console.log(refsNavigation.homeDom);
console.log(refsNavigation.libraryDom);
console.log(refsNavigation.filmDetailPageSection);
console.log(refsNavigation.homePageSection);
console.log(refsNavigation.filmLibraryPageSection);
console.log(refsNavigation.buttonShowLIstQueue);
console.log(refsNavigation.buttonFilmsWatched);
console.log(refsNavigation.buttonAddFilmToQueue);
console.log(refsNavigation.buttonAddFilmToWatched);
console.log(refsNavigation.buttonPrev);
console.log(refsNavigation.buttonNext);
// const buttonDeleteFilmFromQueue = document.querySelector('кнопка удаления фильмов з очереди просмотра');
// const buttonDeleteFilmFromWatched = document.querySelector('кнопка удаления фильмов  из просмотренных со страницы detailsPage');
let selectFilm = {some:`dataConnected with local storage`};   
// добавления/удаления фильмов в очередь просмотра и добавления/удаления фильмов из просмотренных
//  со страницы detailsPage; 
// - создаем глобальную переменную selectFilm; 
// - в main.scss создаем класс чтобы прятать секции (потом его добавляем или удаляем нужной секции);
//  - создаем функцию activeHomePage которая показывает домашнюю страницу и прячет остальные,
//   а также вешает слушателей на кнопку вперед и назад из плагинации и удаляет ненужных всех 
//   слушателей (таких 4 во всем проекте не нужных на этой странице); 
// - создаем функцию activeLibraryPage которая показывает страницу с библиотекой и прячет остальные,
//  запускает функцию отрисовки фильмов из очереди drawQueueFilmList (которую сделает пятый участник) 
//  и добавляет кнопке списка очереди фильмов эффект выбранной с помощью класса, а также вешает слушателей 
//  на кнопки показа очереди фильмов и просмотренных фильмов и удаляет ненужных всех слушателей 
//  (таких 4 во всем проекте не нужных на этой странице); 
// - создаем функцию activeDetailsPage которая показывает страницу детальной отрисовки фильма и
//  прячет остальные, функция принимает два параметра movieId и itsLibraryFilm (это bool), 
//  и в зависимости от того это выбранный фильм с домашней страницы или из библиотеки, 
//  заполняет глобальную переменную selectFilm нужным объектом и запускает функцию  showDetails
//   c параметром selectFilm который они заполнили одними или другими данными (которую сделает 4й участник),
//    вешает слушателей на кнопки добавления/удаления фильмов в очередь просмотра и добавления/удаления фильмов 
//    из просмотренных со страницы detailsPage
//     и удаляет ненужных всех слушателей (таких 4 во всем проекте не нужных на этой странице); 
// - вешаем слушателей на переход на домашнюю страницу и страницу библиотеки в хедере.
// - на логотип повесить запуск функции activeHomePage, чтобы при клике туда возвращаться.

const activeHomePage = () =>{
    console.log(`hello from navigation.js of activeHomePage function`);

    refsNavigation.homeDom.addEventListener('click',((even) => {

        refsNavigation.filmDetailPageSection.classList.add('hidden');
        refsNavigation.filmLibraryPageSection.classList.add('hidden');

        refsNavigation.buttonNext.addEventListener('click',(() => {

        }));

        refsNavigation.buttonPrev.addEventListener('click',(() => {

        }));

        console.log(even)
    }));
//  и удаляет ненужных всех слушателей  (таких 4 во всем проекте не нужных на этой странице);
}
activeHomePage();
const activeLibraryPage = () => {
    console.log(`hello from navigation.js of activeLibraryPage function`);
    refsNavigation.libraryDom.addEventListener('click',((even) => {
        //    показывает страницу с библиотекой и прячет остальные
        refsNavigation.filmDetailPageSection.classList.remove('hidden');
        refsNavigation.filmLibraryPageSection.classList.add('hidden');

    }))

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

