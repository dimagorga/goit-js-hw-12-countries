import './sass/main.scss';
import templateMarkup from './templates/country-template.hbs'


const inputRef = document.querySelector('.input-js')
const debounce = require('lodash.debounce');
const countryContainer = document.querySelector('.country-container')


inputRef.addEventListener('input', debounce(countrySerch, 1000))


function countrySerch(){
    console.log()
    fetch(`https://restcountries.eu/rest/v2/name/${inputRef.value}`)
    .then(response => {return response.json()})
    .then(countries =>  {
        const markup =  templateMarkup(countries)
        console.log(countries);
        countryContainer.innerHTML= markup
    })
   
}



