
import apiService from '../apiService.js';
apiService.getFullRequest('london',2).catch((showExample) => {
    console.log(showExample);
}) 
const buttonWatch = document.querySelector('#js-buttonWatchedFilms');
const buttonQueue = document.querySelector('#js-buttonQueueFilms');
buttonWatch.addEventListener('click', event =>{
    console.log(event);
})
buttonQueue.addEventListener('click', event =>{
    console.log(event);
})