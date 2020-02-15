import {Checkbox} from "./checkbox";
import {_S} from "./vanila";

class Filter {
    constructor(offers) {
        this.offers = offers;
        this.update = this.update.bind(this);
        this.checkbox = new Checkbox("", this.update);

        this.is_loan_amount = this.is_loan_amount.bind(this);

    }

    update(state) {
        let new_offers = this.offers.filter(offer => this.validate(offer, state));
        console.log(new_offers)
    }

    is_loan_amount(offer, state) {
        return offer.tags ? offer.tags.some( elem => state.tags.includes(elem) ) : false;
    }

    is_production_method(offer, state) {
        return offer.tags ? offer.tags.some( elem => state.tags.includes(elem) ) : false;
    }

    is_types_of_loans(offer, state) {
        return true;
    }

    is_city(offer, state) {
        return true;
    }

    is_loan_term(offer, state) {
        return true;
    }

    validate(offer, state) {
        return this.is_loan_amount(offer, state)
            && this.is_production_method(offer, state)
            && this.is_types_of_loans(offer, state)
            && this.is_loan_term(offer, state)
            && this.is_city(offer, state);
    }
}

new Filter(window.__ll_offers);
