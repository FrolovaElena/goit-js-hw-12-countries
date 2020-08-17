import * as _debounce from 'lodash.debounce';
import countriesService from './services/fetchCountries';
import singleCountryTemplate from '../templates/singleCountryResult.hbs';
import multipleCountriesTemplate from '../templates/multipleCountriesResult.hbs';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  input: document.querySelector('input'),
  countryList: document.querySelector('#js-country-list'),
  articleWrapper: document.querySelector('#js-article-wrapper'),
};

const inputHandler = _debounce(() => {
  countriesService.searchQuery = refs.input.value;
  countriesService.fetchCountries().then(countries => renderMarkup(countries));
  clearMarkup();
}, 500);

refs.input.addEventListener('input', inputHandler);

function renderMarkup(countries) {
  if (countries.status) {
    clearMarkup();
    return;
  }

  if (countries.length === 1) {
    refs.articleWrapper.insertAdjacentHTML(
      'beforeend',
      singleCountryTemplate(countries),
    );
    clearInput();
    return;
  }

  if (countries.length > 10) {
    PNotify.error({
      title: 'Oops',
      text: `Something's gone wrong! Too much coincidences`,
    });

    clearInput();
    return;
  }

  refs.countryList.insertAdjacentHTML(
    'beforeend',
    multipleCountriesTemplate(countries),
  );

  clearInput();
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.articleWrapper.innerHTML = '';
}

function clearInput() {
  refs.input.value = '';
}
