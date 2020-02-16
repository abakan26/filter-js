import {Checkbox} from "./checkbox";
import {_S} from "./vanila";

class Filter {
    constructor(offers, filters) {
        this.offers = offers;
        this.update = this.update.bind(this);
        this.checkbox = new Checkbox(filters, this.update);

        this.check = this.check.bind(this);

    }

    update(state) {
        let new_offers = this.offers.filter(offer => this.validate(offer, state));
        console.log(new_offers)
    }

    check(offer, filter) {

        if( filter.values.includes("all") ){
            return true;
        }
        let checked = false;
        if (filter.type === "set"){
            checked = offer[filter.name] ? offer[filter.name].some( elem => filter.values.includes(elem) ) : false;
        } else if (filter.type === "range"){
            checked = this.include_range(offer[filter.name], filter.values);
        }

        return checked;
    }

    include_range(prerange, prevalues){
        let range = prerange.split("-").map( elem => parseInt(elem) );
        let values = prevalues.map( elem => parseInt(elem) );
        return values.some( value => value >= range[0] && value <= range[1]);
    }


    validate(offer, state) {
        let valid = true;
        for (let filter in state){
            if ( state.hasOwnProperty(filter) ) {
                if ( ! this.check(offer, state[filter]) ){
                    valid = false;
                }
            }
        }
        return valid;
    }
}

new Filter(window.__ll_offers, ".sdl-filter");
