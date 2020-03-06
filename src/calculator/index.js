import "./calculator-logics";
//import "./calc.scss";
import {calculate, CalculatorController} from "./calculator-logics";

window.addEventListener("load", function () {

    const params = new URLSearchParams(location.search);
    const default_amount = params.get("amount")
        ? Number(params.get("amount"))
        : 500;
    const amount = new CalculatorController({
        container: "amount",
        offer: window.__ll_offers,
        settings: {
            min: 250,
            max: 10000,
            step: 250,
            default: default_amount,
        }
    }, calculator_handler);
    const term = new CalculatorController({
        container: "term",
        offer: window.__ll_offers,
        settings: {
            min: 1,
            max: 30,
            step: 1,
            default: 10,
        }
    }, calculator_handler);

    var calc_timer = "";
    var first_timer = true;

    function calculator_handler(is_change, obj) {
        const loan_term = term.get_val();
        const loan_amount = amount.get_val();
        clearInterval(calc_timer);
        if (is_change) {
            first_timer = true;
            window.__ll_offers
                .forEach(function (offer) {
                    const return_amount = calculate(loan_amount, offer.rate_from, loan_term);
                    const m = return_amount - loan_amount;
                    document.querySelectorAll(`.offer[data-title='${offer.title}']`).forEach(
                        function (e) {
                            e.querySelector("[data-condition='returnAmount']").innerText = return_amount;
                            e.querySelector("[data-condition='amount']").innerText = loan_amount;
                            e.querySelector("[data-condition='interest']").innerText = m;
                        }
                    )
                })
        }else if(!first_timer){            
            calc_timer = setTimeout(function () {
                window.__ll_offers
                .forEach(function (offer) {
                    const return_amount = calculate(loan_amount, offer.rate_from, loan_term);
                    const m = return_amount - loan_amount;
                    document.querySelectorAll(`.offer[data-title='${offer.title}']`).forEach(
                        function (e) {
                            e.querySelector("[data-condition='returnAmount']").innerText = return_amount;
                            if (obj === "amount") {e.querySelector("[data-condition='amount']").innerText = loan_amount;}
                            e.querySelector("[data-condition='interest']").innerText = m;
                        }
                    )
                })
            }, 60)
        }
        first_timer = false;
        
    }
    calculator_handler(true, true);
   window.addEventListener("renderof", () => calculator_handler(true, true));
});


