const URI = 'http://localhost:8000';

export default {
  async fetchFilms() {
    try {
      let response = await fetch(URI + '/api/films');
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },
};
