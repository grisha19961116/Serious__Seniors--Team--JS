import refsNavigation from '../refsNavigation';
import variables from '../variables';
console.log(variables.selectFilm);
function activeHomePage () {
    console.log(`hello from navigation.js of activeHomePage function`);

    refsNavigation.homeDom.addEventListener('click',((even) => {
        // и удаляет ненужных всех слушателей   (таких 4 во всем проекте не нужных на этой странице); 
        refsNavigation.filmDetailPageSection.classList.add('hidden');
        refsNavigation.filmLibraryPageSection.classList.add('hidden');

        refsNavigation.buttonNext.addEventListener('click',(() => {
            variables.pageNumber ++ ;
            refsNavigation.buttonNumber.textContent = variables.pageNumber;
            console.log(refsNavigation.buttonNumber)
            console.log(variables.pageNumber,`page number`);
        }));

        refsNavigation.buttonPrev.addEventListener('click',(() => {
            if(variables.pageNumber <= 1 ){
                return;
            }
            variables.pageNumber -- ;
            refsNavigation.buttonNumber.textContent = variables.pageNumber;
        }));

        console.log(even)
    }));
//  и удаляет ненужных всех слушателей  (таких 4 во всем проекте не нужных на этой странице);
}
activeHomePage();

function activeLibraryPage () {
    console.log(`hello from navigation.js of activeLibraryPage function`);
    refsNavigation.libraryDom.addEventListener('click',((even) => {
    // запускает функцию отрисовки фильмов из очереди drawQueueFilmList (которую сделает пятый участник);
        refsNavigation.filmDetailPageSection.classList.add('hidden');
        refsNavigation.homePageSection.classList.add('hidden');
        refsNavigation.filmLibraryPageSection.classList.remove('hidden');

        refsNavigation.buttonFilmsWatched.addEventListener('click',((even) => {
                refsNavigation.buttonFilmsWatched.classList.add('library__btn--active');
                refsNavigation.buttonShowLIstQueue.classList.remove('library__btn--active');
          //  и удаляет ненужных всех слушателей (таких 4 во всем проекте не нужных на этой странице);

        }));
        refsNavigation.buttonShowLIstQueue.addEventListener('click',(() => {
            refsNavigation.buttonFilmsWatched.classList.remove('library__btn--active');
            refsNavigation.buttonShowLIstQueue.classList.add('library__btn--active');
            //  и удаляет ненужных всех слушателей (таких 4 во всем проекте не нужных на этой странице);
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
export  {activeHomePage,activeLibraryPage,activeDetailsPage} ;
