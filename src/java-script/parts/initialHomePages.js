import homepageGalleryTpl from '../templates/homepage-gallery.hbs';
import refsNavigation from '../refsNavigation';
import {activeDetailsPage} from './navigation';
import variables from '../variables';
export function createCardFunc(renderFilms) {
  const renderFilmsList = homepageGalleryTpl(renderFilms);
  refsNavigation.homepageList.insertAdjacentHTML('beforeend', renderFilmsList);
  const homepageLi = document.querySelector('.homepage-list__li');
  homepageLi.addEventListener('click',((even) => {
    const idForSearching = Number(even.currentTarget.id);
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
}
fetchPopularMoviesList();

fetchGenres();



