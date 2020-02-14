import {Checkbox} from "./checkbox";
import {_S} from "./vanila";

class Filter {
    constructor() {
        this.update = this.update.bind(this);
        this.checkbox = new Checkbox("", this.update);

        this.is_loan_amount = this.is_loan_amount.bind(this);









    }
    update(state){
        console.log("update");
        console.log(state);
        _S(".offer").each(offer => this.is_loan_amount(offer, state))
    }
    is_loan_amount(offer, state) {
        let range, credit_first;

        if (state.loan_amount[0] !== "all"){
            credit_first = _S(offer).find("[data-key='credit_first']").innerText;
            range = credit_first.split("-");
        }
    }

    is_production_method(element) {

    }

    is_types_of_loans(element) {

    }

    is_city(element) {

    }

    is_loan_term(element) {

    }
    validate(element) {
        return this.is_loan_amount(element)
            && this.is_production_method(element)
            && this.is_types_of_loans(element)
            && this.is_loan_term(element)
            && this.is_city(element);
    }
}
new Filter();
const offer = document.querySelectorAll(".offer");
const credit = offer[1].querySelectorAll("[data-key='credit_first']");


for (let a of offer) {
    a.addEventListener('click', handlerClick)
}

function handlerClick(event) {
    //console.log(this.style)
}


function _Shide(element) {
    element.style.display = 'none';
    return element;
}

function _Sshow() {
    element.style.display = '';
    return element;
}

Sfilter(offer);

function Sfilter(arr, cond) {
    for (let i of arr) {
        //console.log(i.querySelector(("[data-key='credit_first']")).innerText)
    }
}







