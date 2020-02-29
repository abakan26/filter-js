import {Checkbox} from "../chekbox/checkbox";
import {_S} from "../vanila";
import {Offer} from "../render/Offer";



window.addEventListener("load",

function () {

    class Filter {
        constructor(offers, filters, offerObj) {

            this.offers = offers;
            this.offerObj = offerObj;
            this.update = this.update.bind(this);
            this.checkbox = new Checkbox(filters, this.update);
            this.check = this.check.bind(this);
            this.last = 0;
            this.step = 20;

        }

        initial(){
            if (_S("[data-role='offers']").attr("data-tags")){
                let tags = _S("[data-role='offers']").attr("data-tags");
                const ch = _S(this.checkbox.find("tags", tags));
                ch.checked(true);
                const e = {target: ch.elements[0]};
                this.update(this.checkbox.update_value(e));

            }else if (_S("[data-role='offers']").attr("data-credit-first")){
                const loan = _S("[data-role='offers']").attr("data-credit-first");
                const ch = _S(this.checkbox.find("credit_first", loan));
                ch.checked(true);
                const e = {target: ch.elements[0]};

                this.update(this.checkbox.update_value(e));
            }else {
                this.offerObj.render();
            }
        }

        update(state = sdl__filter.checkbox.state) {

            let valid_offers = this.offers.filter(offer => this.validate(offer, state));
            let in_valid_offers = this.offers.filter(offer => !this.validate(offer, state));
            this.offerObj.change(valid_offers, in_valid_offers);
            // this.hide("#actual-list", in_valid_offers);
            // this.show("#actual-list", valid_offers);
            // this.hide("#other-list", valid_offers);
            // this.show("#other-list", in_valid_offers);
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

        show(list, offers){
            offers.forEach(function (elem) {
                _S(list).find(`.offer[data-title='${elem.title}']`)
                    .animate(fade_in)
            });
        }

        hide(list, offers){
            offers.forEach(function (elem) {
                _S(list).find(`.offer[data-title='${elem.title}']`)
                    .animate(fade_out)
            });
        }
    }

    function fade_in(progress, element) {
        element.style.display = "";
        element.style.opacity = progress.toString();
    }
    function fade_out(progress, element) {
        let op = 1 - progress;
        element.style.opacity = op.toString();
        if (progress === 1){
            element.style.display = "none";
        }
    }

    const of = new Offer({
        offers: window.__ll_offers,
        template: document.querySelector("[data-part='article']")
    });


    const sdl__filter = new Filter(window.__ll_offers, ".sdl-filter", of);
    sdl__filter.initial();


    document.getElementById("search-title").addEventListener("click", function (e) {
       const inp = document.getElementById("company-name");
        if (inp.value ){
            let v = window.__ll_offers.filter(
                r => inp.value === r.title
            );
            let iv = window.__ll_offers.filter(
                r => inp.value !== r.title
            );
            of.change(v, []);
        }else {
            sdl__filter.update()
        }

    });
});