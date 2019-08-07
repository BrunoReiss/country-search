$(document).ready(() => {
    $('#searchForm').on('submit', e => {
        let searchText = $('#searchText').val();
        getCountries(searchText);
        getCountryByCapital(searchText);
        e.preventDefault();
    });
});

function getCountries(searchText) {
    axios.get('https://restcountries.eu/rest/v2/name/' + searchText)
        .then(res => {
            //console.log(res.data)
            let countries = res.data;
            let output = '';
            $.each(countries, (index, country) => {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${country.flag}">
                        <h5>${country.name}</h5>
                        <a onclick="countrySelected('${country.callingCodes}')" class="btn btn-primary" href="#">Country Details</a>
                    </div>
                </div>
                `
            });
            $('#countries').html(output);
        })
        .catch(err => {
            console.log(err)
        })
};

function getCountryByCapital(searchText) {
    axios.get('https://restcountries.eu/rest/v2/capital/' + searchText)
        .then(res => {
            //console.log(res.data)
            let countries = res.data;
            let output = "";
            $.each(countries, (index, country) => {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${country.flag}">
                        <h5>${country.name}</h5>
                        <a onclick="countrySelected('${country.callingCodes}')" class="btn btn-primary" href="#">Country Details</a>
                    </div>
                </div>
                `
            });
            $('#countries').html(output);
        })
        .catch(err => {
            console.log(err)
        })
};

function countrySelected(callingCode) {
    sessionStorage.setItem('callingCode', callingCode);
    window.location = 'country.html';
    return false;
}