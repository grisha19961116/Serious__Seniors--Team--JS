import homepageGalleryTpl from '../templates/homepage-gallery.hbs';
import refsNavigation from '../refsNavigation';
<<<<<<< HEAD
import {activeDetailsPage} from './navigation';
=======
import { activeDetailsPage } from './navigation';
import apiService from '../apiService';
>>>>>>> 5f0066b2a19bbb62cdfba99e8e8915d1639dc46a
import variables from '../variables';
export function createCardFunc(renderFilms) {
  const renderFilmsList = homepageGalleryTpl(renderFilms);
  refsNavigation.homepageList.insertAdjacentHTML('beforeend', renderFilmsList);
  const homepageLi = document.querySelector('.homepage-list__li');
  homepageLi.addEventListener('click', ((even) => {
    const idForSearching = Number(even.currentTarget.id);
<<<<<<< HEAD
    let forThrowDataSelect ;
    console.log(idForSearching);

    renderFilms.forEach(element => {
      if(element.id === idForSearching ) {
        forThrowDataSelect = element;
        return;
      }

    });
    console.log(forThrowDataSelect,`forThrowDataSelect ffffffffffffffffffff`);
    activeDetailsPage(forThrowDataSelect,false);
  }));
}
function fetchPopularMoviesList() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f2c0383f553427336b1984c7194d50ac&language=en-US&page=${variables.pageNumber}`)
  .then(res => {
    return res.json()
      })
      .then((data) => {
        console.log(data,`fetchPopularMoviesList`)
        if(data.results.length > 1){
          refsNavigation.homepageList.innerHTML = '';
        }
        variables.renderFilms = [...data.results];
        createCardFunc(variables.renderFilms);
    })
}

function fetchGenres() {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=f2c0383f553427336b1984c7194d50ac&language=en-US`)
    .then(res => res.json())
    .then(data => variables.genres = [...data.genres])
    .catch(err => console.log(err));
=======
    let forThrowDataSelect = [];
    console.log(idForSearching);
    dataFromApi.forEach(element => {
      if (element.id === idForSearching) {
        forThrowDataSelect = element;
        return;
      }
    });
    activeDetailsPage(forThrowDataSelect, false);
  }));
}
function fetchPopularMoviesList(searchWord) {
  const pageNumber = 1;
  let valueForm;
  if (searchWord === '') {
    valueForm = 'popular';
    return;
  } else {
    valueForm = searchWord;
  }
  variables.pageNumber = pageNumber;
  apiService.getFullRequest(valueForm, pageNumber).then((data) => {
    variables.renderFilms = [...data.results];// we are need 6 
    createCardFunc(variables.renderFilms);
  })
}
function fetchGenres(dataFromApi) {
  apiService.getFullRequest('discovery', 4).then((data) => {
    // забирает жанры и кладет их в переменную genres
    //  (она понадобится в работе следующим участникам); 
    // - запускаем функцию fetchPopularMoviesList и fetchGenres.
    //  variables.genres = [...data.results[перебрати весь масив і запушити тільки жанри]];
    console.log(data.results[9], `fetchGenres`);
  })
>>>>>>> 5f0066b2a19bbb62cdfba99e8e8915d1639dc46a
}
fetchPopularMoviesList();

fetchGenres();



