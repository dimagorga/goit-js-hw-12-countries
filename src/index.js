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
const countryContainer = document.querySelector('.country-container')


inputRef.addEventListener('input', debounce(countrySerch, 500))


function countrySerch(){   
    clearInput()
    fetchCountries()
    .then(makeCountrySearcher)
    .catch(error => console.log(error))   
}

function makeCountrySearcher(countries){
    if(countries.length > 1 && countries.length <= 10){
        createCountryListMarkup(countries)
    }else if(countries.length > 10){
        createAlert(countries)
    }else{ 
        createCountryMarkup(countries)
    } 
}

function fetchCountries(){
    return fetch(`https://restcountries.eu/rest/v2/name/${inputRef.value}`)
    .then(response => {
        return response.json()
    })
}

function clearInput(){
    countryContainer.innerHTML = '';
}

function createCountryMarkup(countries){
    const countryMarkup =  templateCountryMarkup(...countries)   
    countryContainer.insertAdjacentHTML('beforeend', countryMarkup)
}

function createCountryListMarkup(countries){
    const manyCountriesMarkup = templateManyCountriesMurkup(countries)
    countryContainer.insertAdjacentHTML('beforeend', manyCountriesMarkup)
}

function createAlert(){
    return  alert({
        text: 'Too many matches found. Please enter a more specific query!'
      });
}



