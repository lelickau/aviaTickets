class FavoritUI {
    constructor() {
        this.favorite = [];
        this.btnFavotite = document.querySelector('.favorite');
        this.showFavorite = document.querySelector('.show__favorite');
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
        document.querySelectorAll('.favorite__item').forEach((item) => {
            item.addEventListener('click', (e) => {
                const attrElem = item.dataset.elemfavorite;
                const target = e.target;
                if(target.classList.contains('favorite__delete')){
                    this.deleteItemFavorite(attrElem);
                }
            });
        });
    }
    
    deleteItemFavorite(attrElem) {
        this.favorite.find((item, index) => {
            if (item.attrFavorite === attrElem) {
                this.favorite.splice(index, 1);
                localStorage.removeItem(attrElem);
                this.clearContainer();
                this.renderItemsFavorites();
                const deleteFavorite = document.querySelectorAll('.favorite__add')[+attrElem];
                deleteFavorite.classList.remove('favorite__icon--active');
                deleteFavorite.textContent = 'favorite_border';
            }
        });
    }

    renderFavorite(favorite, attrElem, currency) {
        this.clearContainer();
        favorite.attrFavorite = attrElem;
        favorite.currency = currency;
        this.favorite.push(favorite);
        localStorage.setItem(attrElem, JSON.stringify(favorite));

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
        <div class="tickets__empty-res-msg ">
            Не выбрано ни одного билета.
        </div>        
        `
    }

    static favoriteTemplate(item) {
        const {airline_logo, airline_name, origin_name, destination_name, departure_at, return_at, price, transfers, flight_number, attrFavorite, currency} = item;
        return `
        <div class="ticket favorite__item" data-elemfavorite="${attrFavorite}">
            <div class="ticket__card">
            <div class="ticket__airline">
                <img src="${airline_logo}" class="ticket__airline-img"/>
                <span class="ticket__airline-name">${airline_name}</span>
                <i class="small material-icons favorite__delete">delete_forever</i>
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

const favoriteUI = new FavoritUI();

export default favoriteUI;