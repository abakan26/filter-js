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


new Filter(window.__ll_offers, ".sdl-filter");

const popup = document.querySelector(".popup__overlay");
_S(".sdl-filter-btn").on('click', function (event) {
    _S(".sdl-filter-btn").add("toggle-left");
   _S(".sdl-filter-container").remove("toggle-left");
    popup.classList.remove("toggle-hidden");

});

popup.addEventListener("click", function(event) {
    if (event.target == this) {
        _S(".sdl-filter-btn").remove("toggle-left");
        _S(".sdl-filter-container").add("toggle-left");
        popup.classList.add("toggle-hidden");
    }
});

let currentFocus;
let inp = document.getElementById("company-name");
let arr = window.__ll_offers.map(e => e.title);
function closeAllLists(elmnt) {
    let x = document.getElementsByClassName("sdl-autocomplete-items");
    for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("sdl-autocomplete-active");
    }
}

function addActive(x) {

    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("sdl-autocomplete-active");
}

document.getElementById("company-name").addEventListener("input", function(e) {
    var a, b, i, val = this.value;

    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    a = document.createElement("div");
    a.setAttribute("id", this.id + "sdl-autocomplete-list");
    a.setAttribute("class", "sdl-autocomplete-items");
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

            b = document.createElement("div");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
        }
    }
});

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "sdl-autocomplete-list");

    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode === 40) {
        currentFocus++;
        addActive(x);
    } else if (e.keyCode == 38) {
        addActive(x);
    } else if (e.keyCode == 13) {

        e.preventDefault();
        if (currentFocus > -1) {
            if (x) x[currentFocus].click();
        }
    }
});
document.getElementById("search-title").addEventListener("click", function (e) {
    if (inp.value ){
        let v = window.__ll_offers.filter(
            r => inp.value === r.title
        );
        let iv = window.__ll_offers.filter(
            r => inp.value !== r.title
        );
        _S("#actual-list").find(".offer").show();
        iv.forEach(
            elem =>{_S("#actual-list").find(`.offer[data-title='${elem.title}']`).hide();
            }
        );
    }else {
        _S("#actual-list").find(".offer").show();
    }

    // v.forEach(
    //     elem =>_S("#actual-list").find(`.offer[data-title='${elem.title}']`).show()
    // );
    // v.forEach(
    //     elem =>_S("#other-list").find(`.offer[data-title='${elem.title}']`).hide()
    // )
});

});