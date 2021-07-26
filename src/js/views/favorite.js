class FavoritUI {
    constructor() {
        this.favorite = [];
        this.btnFavotite = document.querySelector('.favorite');
        this.showFavorite = document.querySelector('.show-favorite');
    }

    renderItemsFavorites() {
        this.clearContainer();
        let fragment = '';
        this.favorite.forEach((item) => {
            const template = FavoritUI.favoriteTemplate(item);
            fragment += template;
        });
        this.showFavorite.insertAdjacentHTML('afterbegin', fragment);
        //delete ticket
        document.querySelectorAll('.favorite-item').forEach((item, index) => {
            item.addEventListener('click', (e) => {
                const attrElem = item.dataset.elemfavorite;
                const target = e.target;
                this.deleteItemFavorite(attrElem, index, target);
            });
        })
    }
    
    deleteItemFavorite(attrElem, index, target) {
        if(target.classList.contains('delete-favorite')) {
            this.favorite.splice(index, 1);
            this.clearContainer();
            this.renderItemsFavorites();
            document.querySelectorAll('.add-favorite')[+attrElem].classList.remove('red-c');
        }
        console.log(this.favorite);     
    }

    renderFavorite(favorite, attrElem) {
        this.clearContainer();
        favorite.attrFavorite = attrElem;
        this.favorite.push(favorite);
        console.log(this.favorite);
        if (!this.favorite.length) {
            this.showEmptyMsg();
            return;
        }
        this.renderItemsFavorites();
    }

    clearContainer() {
        this.showFavorite.innerHTML = '';
    }

    showEmptyMsg() {
        const template = FavoritUI.emptyMsgTemplate();
        this.showFavorite.insertAdjacentHTML('afterbegin', template);
    }

    static emptyMsgTemplate() {
        return `
        <div class="tickets-empty-res-msg">
            Не выбрано ни одного билета.
        </div>        
        `
    }

    static favoriteTemplate(item) {
        const {airline_logo, airline_name, origin_name, destination_name, departure_at, price, transfers, flight_number, attrFavorite} = item;
        return `
        <div class="col s12 m6 d-none favorite-item" data-elemfavorite="${attrFavorite}">
            <div class="card ticket-card">
            <div class="ticket-airline d-flex aic jcsb">
                <img src="${airline_logo}" class="ticket-airline-img"/>
                <span class="ticket-airline-name">${airline_name}</span>
                <i class="small material-icons delete-favorite">delete_forever</i>
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
                <span class="ticket-price ml-auto">${price}</span>
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

const favoriteUI = new FavoritUI();

export default favoriteUI;