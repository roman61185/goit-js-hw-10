function fetchCountries(countryId) {
    return fetch(`https://restcountries.com/v3.1/name/${countryId}`)
        .then(response => {
            if (!response.ok) {
                Notiflix.Notify.failure("Oops, there is no country with that name")
            }
            return response.json();
        });
}

export default { fetchCountries }

//return fetch(`https://restcountries.com/v3.1/name/${countryId}?fields=name,capital,population,flags,languages`)