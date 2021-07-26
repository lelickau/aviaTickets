import currencyUI from './currency';
import favoriteUI from './favorite';
class TicketsUI {
    constructor(currency) {
        this.container = document.querySelector('.tickets-sections .row');
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
        this.foundTickets = {};
        this.favorite = [];
    }

    renderTickets(tickets) {
        this.clearContainer();
        if (!tickets.length) {
            this.showEmptyMsg();
            return;
        }

        let fragment = '';
        let currency = this.getCurrencySymbol();

        tickets.forEach((ticket, index) => {
            this.foundTickets[index] = ticket;
            const template = TicketsUI.ticketTemplate(ticket, index, currency);
            fragment += template;
        });
        //console.log(this.foundTickets);

        this.container.insertAdjacentHTML('afterbegin', fragment);

        document.querySelectorAll('.ticket').forEach((item, index) => {
            //console.log(item);
            
            item.addEventListener('click', (e) => {
                const target = e.target;
                const attrElem = item.dataset.favorit;
                console.log(attrElem);
                if (target.classList.contains('add-favorite')) {
                    const like = document.querySelectorAll('.add-favorite')[index];
                    like.classList.add('red-c');
                    favoriteUI.renderFavorite(this.foundTickets[index], attrElem);
                }
                
            })
        })
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

    static ticketTemplate(ticket, index, currency) {
        const {airline_logo, airline_name, origin_name, destination_name, departure_at, price, transfers, flight_number} = ticket;
        //console.log(ticket);
        return `
        <div class="col s12 m6 ticket" data-favorit="${index}">
            <div class="card ticket-card">
            <div class="ticket-airline d-flex aic jcsb">
                <img src="${airline_logo}" class="ticket-airline-img"/>
                <span class="ticket-airline-name">${airline_name}</span>
                <i class="small material-icons add-favorite">favorite_border</i>
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

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;