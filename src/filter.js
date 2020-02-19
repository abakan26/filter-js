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
        let valid_offers = this.offers.filter(offer => this.validate(offer, state));
        let in_valid_offers = this.offers.filter(offer => !this.validate(offer, state));

        in_valid_offers.forEach(
            elem => _S("#actual-list").find(`.offer[data-title='${elem.title}']`).animate(
                function (progress, elem) {
                    let op = 1 - progress;
                    elem.style.opacity = op.toString();
                    if (progress === 1){
                        elem.style.display = "none";
                    }

                }
            )
        );
        valid_offers.forEach(
            elem => _S("#actual-list").find(`.offer[data-title='${elem.title}']`).animate(
                function (progress, elem) {

                    elem.style.display = "";

                    let op = progress;
                    elem.style.opacity = op.toString();

                }
            )
        );
        valid_offers.forEach(
            elem => _S("#other-list").find(`.offer[data-title='${elem.title}']`).animate(
                function (progress, elem) {
                    let op = 1 - progress;
                    elem.style.opacity = op.toString();
                    if (progress === 1){
                        elem.style.display = "none";
                    }

                }
            )
        );
        in_valid_offers.forEach(
            elem => _S("#other-list").find(`.offer[data-title='${elem.title}']`).animate(
                function (progress, elem) {

                    elem.style.display = "";

                    let op = progress;
                    elem.style.opacity = op.toString();

                }
            )
        );

    }

    check(offer, filter) {

        if (filter.values.includes("all")) {
            return true;
        }
        let checked = false;
        if (filter.type === "set") {
            checked = offer[filter.name] ? offer[filter.name].some(elem => filter.values.includes(elem)) : false;
        } else if (filter.type === "range") {
            checked = this.include_range(offer[filter.name], filter.values);
        }

        return checked;
    }

    include_range(prerange, prevalues) {
        let range = prerange.split("-").map(elem => parseInt(elem));
        let values = prevalues.map(elem => parseInt(elem));
        return values.some(value => value >= range[0] && value <= range[1]);
    }


    validate(offer, state) {
        let valid = true;
        for (let filter in state) {
            if (state.hasOwnProperty(filter)) {
                if (!this.check(offer, state[filter])) {
                    valid = false;
                }
            }
        }
        return valid;
    }
}

window.addEventListener("load",
function () {
    const sdl__filter = new Filter(window.__ll_offers, ".sdl-filter");
    if (_S("[data-role='offers']").attr("data-tags")){
        let tags = _S("[data-role='offers']").attr("data-tags");
        const ch = _S(sdl__filter.checkbox.find("tags", tags));

        ch.checked(true);
        const e = {target: ch.elements[0]};
        sdl__filter.update(sdl__filter.checkbox.update_value(e));
    }else if (_S("[data-role='offers']").attr("data-credit-first")){
        const loan = _S("[data-role='offers']").attr("data-credit-first");
        const ch = _S(sdl__filter.checkbox.find("credit_first", loan));
        ch.checked(true);
        const e = {target: ch.elements[0]};

        sdl__filter.update(sdl__filter.checkbox.update_value(e));
    }
});