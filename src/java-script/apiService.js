export default {
  API_KEY: `api_key=f2c0383f553427336b1984c7194d50ac`,
  HTTP: `//api.themoviedb.org/3/search/multi?`,
  getFullRequest(searchWord, searchPage) {
    return fetch(
      `${this.HTTP}${this.API_KEY}&page=${searchPage}&query=${searchWord}`,
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      });
  },
};
