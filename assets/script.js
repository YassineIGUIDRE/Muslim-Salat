// Define Global Varibales

const countries = document.querySelector('#selectCountry');
const cities = document.querySelector('#selectCity');
const salatList = document.querySelector('#salatList');

// Function for list countries

function listCountries() {
    fetch('https://countriesnow.space/api/v0.1/countries/')
        .then(response => response.json())
        .then(res => {
            for (data of res.data) {
                countries.innerHTML += `<option>${data.country}</option>`;
            }
        })
        .catch(err => console.warn(err));
    
    // Event on change select country

    countries.addEventListener('change', e => {
        salatList.innerText = '';
        cities.innerHTML = '<option selected disabled>Choose...</option>';
        let crySelected = e.target.value;
        listCites(crySelected);
    });
}

// Function for list cities

function listCites(crySelected) {
    fetch('https://countriesnow.space/api/v0.1/countries/')
        .then(response => response.json())
        .then(res => {
            let city = res.data.filter(c => {
                return c.country.includes(crySelected);
            })
            for (data of city[0].cities) {
                cities.innerHTML += `<option>${data}</option>`;
            }
        })
        .catch(err => console.warn(err));
        
    // Event on change selected country

    cities.addEventListener('change', e => {
        salatList.innerText = '';
        let citySelected = e.target.value;
        prayerTimes(crySelected, citySelected);
    });
}

// Function for list prayer times of country and city selected

function prayerTimes(crySelected, citySelected) {
    let date = new Date();

    fetch('http://api.aladhan.com/v1/calendarByCity?city=' + citySelected + '&country=' + crySelected + '&method=1&month=' + date.getMonth() + '&year=' + date.getFullYear())
        .then(response => response.json())
        .then(res => {
            salat = res.data[0].timings;
            salatList.innerText = '';
            salatList.innerHTML += '<tr><td> Fajr  : </td><td>' + salat.Fajr + '</td></tr>';
            salatList.innerHTML += '<tr><td> Duhr  : </td><td>' + salat.Dhuhr + '</td></tr>';
            salatList.innerHTML += '<tr><td> Asr  : </td><td>' + salat.Asr + '</td></tr>';
            salatList.innerHTML += '<tr><td> Maghrib  : </td><td>' + salat.Maghrib + '</td></tr>';
            salatList.innerHTML += '<tr><td> Isha  : </td><td>' + salat.Isha + '</td></tr>';
        })
        .catch(err => console.warn(err));
}

// Event on load page

window.onload(listCountries())