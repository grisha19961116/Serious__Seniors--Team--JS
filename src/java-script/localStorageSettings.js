export default {
    getWatchedFilm : JSON.parse(localStorage.getItem('filmsWatched')),
    getFilmsQueue : JSON.parse(localStorage.getItem('filmsQueue')),
}