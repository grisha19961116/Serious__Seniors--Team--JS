export {fetchPopularMoviesList, createCardFunc, fetchGenres};
import homepageGalleryTpl from '../templates/homepage-gallery.hbs';
import refsNavigation from '../refsNavigation.js';
import {activeDetailsPage} from './navigation.js';
import variables from '../variables.js';
function createCardFunc(renderFilms) {
  const renderFilmsList = homepageGalleryTpl(renderFilms);
  refsNavigation.homepageList.insertAdjacentHTML('beforeend', renderFilmsList);//ul
  // const homepageLi = document.querySelector('ul>.homepage-list__li');
  refsNavigation.homepageList.addEventListener('click',((even) => {
    console.log(even.target,`homepageLi`);
    if(even.target.tagName === "IMG"){
      const idForSearching = Number(even.target.id);
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
    }
  }));
}
function fetchPopularMoviesList() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f2c0383f553427336b1984c7194d50ac&language=en-US&page=${variables.pageNumber}`)
  .then(res => {
    return res.json()
      })
      .then((data) => {
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
}
fetchPopularMoviesList();
fetchGenres();