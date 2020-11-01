export default {
    getWatchedFilm : JSON.parse(localStorage.getItem('filmsWatched')),
    getFilmsQueue : JSON.parse(localStorage.getItem('filmsQueue')),
    setFilmsQueue(filmsQueueArray){
        return localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArray))
    },
    setWatchedFilm(filmsWatchedArray){
        return localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArray));
    },

}