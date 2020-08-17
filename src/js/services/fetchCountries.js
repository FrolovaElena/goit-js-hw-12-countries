const baseUrl = 'https://restcountries.eu/rest/v2/';

export default {
  query: '',
  fetchCountries() {
    const requestParameters = `name/${this.query}`;

    return fetch(baseUrl + requestParameters).then(response => response.json());
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },
};
