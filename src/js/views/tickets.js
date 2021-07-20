import currencyUI from './currency';
class TicketsUI {
    constructor(currency) {
        this.container = document.querySelector('.tickets-sections .row');
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    }

    renderTickets(tickets) {
        this.clearContainer();
        if (!tickets.length) {
            this.showEmptyMsg();
            return;
        }

        let fragment = '';
        let currency = this.getCurrencySymbol();

        tickets.forEach(ticket => {
            const template = TicketsUI.ticketTemplate(ticket, currency);
            fragment += template;
        });

        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    showEmptyMsg() {
        const template = TicketsUI.emptyMsgTemplate();
        this.container.insertAdjacentHTML('afterbegin', template);
    }

    static emptyMsgTemplate() {
        return `
        <div class="tickets-empty-res-msg">
            По вашему запросу билетов не найдено.
        </div>        
        `
    }

    static ticketTemplate(ticket, currency) {
        const {airline_logo, airline_name, origin_name, destination_name, departure_at, price, transfers, flight_number} = ticket;
        return `
        <div class="col s12 m6">
            <div class="card ticket-card">
            <div class="ticket-airline d-flex align-items-center">
                <img src="${airline_logo}" class="ticket-airline-img"/>
                <span class="ticket-airline-name">${airline_name}</span>
            </div>
            <div class="ticket-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                    <span class="ticket-city">${origin_name} </span>
                    <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                    <i class="medium material-icons">flight_land</i>
                    <span class="ticket-city">${destination_name}</span>
                </div>
            </div>
            <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${departure_at}</span>
                <span class="ticket-price ml-auto">${currency}${price}</span>
            </div>
            <div class="ticket-additional-info">
                <span class="ticket-transfers">Пересадок: ${transfers}</span>
                <span class="ticket-flight-number">Номер рейса: ${flight_number}</span>
            </div>
            </div>
        </div>
        `
    }
}

/* airline: "LO"
airline_logo: "http://pics.avs.io/200/200/LO.png"
airline_name: "LOT Polish Airlines"
departure_at: "19.Jul.2021 07:30"
destination: "LAX"
destination_name: "Лос-Анджелес"
expires_at: "2021-07-20T14:44:44Z"
flight_number: 678
origin: "MOW"
origin_name: "Москва"
price: 556
return_at: "01.Aug.2021 08:25"
transfers: 1 */

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;