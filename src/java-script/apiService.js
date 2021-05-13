import variables from './variables';
export default {
    API_KEY :`api_key=f2c0383f553427336b1984c7194d50ac`,
    HTTP : `//api.themoviedb.org/3/search/multi?`,
    getFullRequest(searchWord,searchPage){
      return fetch(`${this.HTTP}${this.API_KEY}&page=${searchPage}&query=${searchWord}`)
  .then(res => {
    return res.json()
      })
      .then((data) => {
        return data;
    })
    },
  }
//     повертає проміс з масивом інформації по заданим словам и сторінці якій вказали,приклад використання нижче і 
//     дальше поїали що вам потрібно catch(і робимо своє завдання ),робимо в себе імпорт як указано і використовуємо як метод обєкта!!!
//     який приймає першим аргументом слово чи букву пошуку ,а іншим аргументом сторінку
//     думаю все зрозуміл:)
// }) 

// fullHTTP : `https://api.themoviedb.org/3/genre/movie/list?${this.API_KEY}&language=en-US`,
// getFullRequestGenre(){
//    fetch(`${this.fullHTTP}`)
//   .then(res => {
//     return res.json()
//       })
//       .then(data => variables.genres = [...data.genres])
//       .catch(err => console.log(err));
// },