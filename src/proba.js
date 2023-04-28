import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countrys from './fetchCountries';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-info');
const info = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    evt.preventDefault();

    const form = evt.target.value.trim();
    if (!form) {
        clearForm();
        return;
    }
    countrys.fetchCountries(form)
        .then(numberCountries)
        .catch(errorCetch)
}

function numberCountries(evt) {
    clearForm();
    // insertCountryFlag(evt);
    // insertCountry(evt);
    if (evt.length === 1) {
        clearForm();
        return insertCountry(evt);
    } else if (evt.length <= 10) {
        clearForm();
        insertCountryFlag(evt);
    } else {
        clearForm();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }

}


// прапор, назва, столиця, населення, мова


const createCoutrys = (i) => `
<div class="card-country">
    <h2 class="card-name">${i.name.official}</h2>
<p class="card-capital">${i.capital}</p>
<p class="card-population">население: ${i.population}</p>
<p class="card-languages">язык: ${Object.values(i.languages)}</p>
<img src="${i.flags.svg}" alt="${i.name}" width="150px" />
</div>
`;
const generateContent = (array) => array.reduce((acc, item) => acc + createCoutrys(item), "");

function insertCountry(array) {
    const result = generateContent(array);
    list.insertAdjacentHTML("beforeend", result)
}


//флаг и название
const createCoutrysFlag = (i) => `
<div class="card-country">
    <h2 class="card-name">${i.name.official}</h2>
    <img src="${i.flags.svg}" alt="${i.name}" width="50px" />
</div>
`;
const generateContentFlag = (array) => array.reduce((acc, item) => acc + createCoutrysFlag(item), "");

function insertCountryFlag(array) {
    const result = generateContentFlag(array);
    info.insertAdjacentHTML("beforeend", result)
}



function clearForm() {
    list.innerHTML = '';
    info.innerHTML = '';
}

function errorCetch() {
    Notiflix.Notify.failure("Oops, there is no country with that name")
}