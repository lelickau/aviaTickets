import currencyUI from './currency';
import favoriteUI from './favorite';
class TicketsUI {
    constructor(currency) {
        this.container = document.querySelector('.tickets__section .tickets__box');
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

        this.container.insertAdjacentHTML('afterbegin', fragment);

        document.querySelectorAll('.ticket').forEach((item, index) => {

            //if (item.classList.contains(''))
            
            item.addEventListener('click', (e) => {
                const target = e.target;
                const attrElem = item.dataset.favorit;
                
                if (target.classList.contains('favorite__add')) {
                    const like = document.querySelectorAll('.favorite__add')[index];

                    if (item.querySelector('.favorite__icon--active')) {
                        like.classList.remove('favorite__icon--active');
                        favoriteUI.deleteItemFavorite(attrElem, null)
                    } else {
                        like.textContent = 'favorite';
                        like.classList.add('favorite__icon--active');
                        favoriteUI.renderFavorite(this.foundTickets[index], attrElem, currency);
                    }
                    
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
        <div class="tickets__empty-res-msg">
            По вашему запросу билетов не найдено.
        </div>        
        `
    }

    static ticketTemplate(ticket, index, currency) {
        const {airline_logo, airline_name, origin_name, destination_name, departure_at, return_at, price, transfers, flight_number} = ticket;
        return `
        <div class="ticket" data-favorit="${index}">
            <div class="ticket__card">
            <div class="ticket__airline">
                <img src="${airline_logo}" class="ticket__airline-img"/>
                <span class="ticket__airline-name">${airline_name}</span>
                <i class="small material-icons favorite__add">favorite_border</i>
            </div>
            <div class="ticket__destination">
                <div class="ticket__destination-from">
                    <i class="medium material-icons">flight_takeoff</i>
                    <span class="ticket__destination-city">${origin_name} </span>
                </div>
                <div class="ticket__destination-in">
                    <i class="medium material-icons">flight_land</i>
                    <span class="ticket__destination-city">${destination_name}</span>
                </div>
            </div>
            <div class="ticket__info">
                <span class="ticket__info-departure">${departure_at}</span>
                <span class="ticket__info-departure">${return_at}</span>
                <span class="ticket__info-price">${currency}${price}</span>
            </div>
            <div class="ticket__info">
                <span class="ticket__info-transfers">Пересадок: ${transfers}</span>
                <span class="ticket__info-number">Номер рейса: ${flight_number}</span>
            </div>
            </div>
        </div>
        `
    }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;