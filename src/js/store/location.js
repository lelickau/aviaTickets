import api from "../services/apiService";
import {formatDate} from '../helpers/date';

class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = {};
        this.lastSearch = {};
        this.airlines = {};
        this.formatDate = helpers.formatDate;
    }
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ]);
        const [countries, cities, airlines] = response;
        this.countries = this.serializeCountries(countries);;
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);
        console.log(this.airlines);
        return response;
    }

    getCityNameByCode(code) {
        return this.cities[code].name;
    }

    getAirlineCodeByKey(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByKey(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find((item) => {
            return item.full_name === key;
        });
        return city.code;
    }

    createShortCitiesList(cities) {
        //{ 'City, country' : null }
        // Object.entries => [key, value]
        return Object.entries(cities).reduce((acc, [, city]) => {
            acc[city.full_name] = null;
            return acc;
        }, {})
    }

    serializeCountries(countries) {
        //{'Country code' : { ... } }
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {})
    }

    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const country_name = this.countries[city.country_code].name;
            const city_name = city.name || city.name_translations.en;
            const full_name = `${city.name},${country_name}`;
            acc[city.code] = {
                ...city,
                country_name,
                full_name,
            };
            return acc;
        }, {})
    }

    serializeAirlines(airlines) {
        return airlines.reduce((acc, item) => {
            item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
            item.name = item.name || item.name_translations.en;
            acc[item.code] = item;
            return acc;

        }, {})
    }

    getCountryNameByCode(code) {
        return this.countries[code].name;
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        this.lastSearch = this.serializeTickets(response.data);
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map(ticket => {
            return {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByKey(ticket.airline),
                airline_name: this.getAirlineCodeByKey(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at, 'dd.MMM.yyy hh:mm'),
                return_at: this.formatDate(ticket.return_at, 'dd.MMM.yyy hh:mm'),
            }
        })
    }
}

const locations = new Locations(api, {formatDate});

export default locations;

/* {
    "success": true,
    "data": {
        "2021-07-19": {
            "origin": "MOW",
            "destination": "LAX",
            "price": 556,
            "airline": "LO",
            "flight_number": 678,
            "departure_at": "2021-07-19T20:30:00+03:00",
            "return_at": "2021-07-31T23:25:00-07:00",
            "transfers": 1,
            "expires_at": "2021-07-20T13:01:40Z"
        },
        "2021-07-20": {
            "origin": "MOW",
            "destination": "LAX",
            "price": 569,
            "airline": "SU",
            "flight_number": 2550,
            "departure_at": "2021-07-20T09:10:00+03:00",
            "return_at": "2021-07-27T13:55:00-07:00",
            "transfers": 1,
            "expires_at": "2021-07-20T13:01:40Z"
        }
    },
    "currency": "USD"
} */