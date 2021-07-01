import fetchCountries from './js/fetchCountries.js';
import './sass/main.scss';
import templateCountryMarkup from './templates/country-template.hbs'
import templateManyCountriesMurkup from './templates/country-list.hbs'
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import { alert } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
defaultModules.set(PNotifyMobile, {});

const inputRef = document.querySelector('.input-js')
const debounce = require('lodash.debounce');
const countryContainer = document.querySelector('.country-container-js')


inputRef.addEventListener('input', debounce(countrySerch, 500))

function countrySerch(){   
    clearInput()
    fetchCountries(inputRef.value)
    .then(countriesRender)
    .catch(emptyInputAlert)
    .finally() 
}

function countriesRender(countries){
    if(countries.length > 1 && countries.length <= 10){
        createCountryListMarkup(countries)

    }else if(countries.length > 10){
        manyMatchesAlert()

    }else{ 
        createCountryMarkup(countries)
    } 
}

function clearInput(){
    countryContainer.innerHTML = ' ';
}

function createCountryMarkup(countries){
    const countryMarkup =  templateCountryMarkup(...countries)   
    countryContainer.insertAdjacentHTML('beforeend', countryMarkup)
}

function createCountryListMarkup(countries){
    const manyCountriesMarkup = templateManyCountriesMurkup(countries)
    countryContainer.insertAdjacentHTML('beforeend', manyCountriesMarkup)
}

function manyMatchesAlert(){
    return  alert({
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 2000
      });
}
function emptyInputAlert(){
    return  alert({
        text: 'Enter your country please!',
        delay: 5000
  });}
   
  





