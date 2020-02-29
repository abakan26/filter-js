export function calculate(amount, interest, term) {
    return parseInt( Number(amount)*(1 + Number(interest) * Number(term)/100) );
}

export class CalculatorController {
    constructor(props, callback) {
        this.settings = props.settings;
        this.callback = callback;
        this.name = props.container;
        this.max = this.settings.max;
        this.min = this.settings.min;
        this.step = this.settings.step;
        this.val  = this.settings.default;
        this.timer = 0;

        this.do_action_minus = this.do_action_minus.bind(this);
        this.do_action_plus = this.do_action_plus.bind(this);
        this.do_action_calculate = this.do_action_calculate.bind(this);

        this.container = document.querySelector(`[data-field='${props.container}']`);
        this.slide_line = this.container.querySelector("input[type='range']");
        this.view = this.container.querySelector("input[type='text']");
        this.btn_minus = this.container.querySelector("[data-action='minus']");
        this.btn_plus = this.container.querySelector("[data-action='plus']");
        this.set_initial_state()

    }

    set_initial_state() {
        this.slide_line.setAttribute("min", this.min);
        this.slide_line.setAttribute("max", this.max);
        this.slide_line.setAttribute("step", this.step);
        this.slide_line.setAttribute("value", this.val);
        this.display_view(this.val, false);
        this.add_listener();
    }

    do_action_calculate(event) {
        let newVal = event.target.value;
        let is_slide = event.target === this.slide_line;
        let is_change = event.type === "change";
        let cond = true;
        if (newVal > this.max || newVal < this.min) {
            cond = false;
        }
        if (this.val === Number(newVal)) {
            cond = false;
        }
        newVal = cond ? newVal : this.val;
        this.display_view(newVal, is_slide);
        this.callback(is_change, this.name);
        
    }

    display_view(value, is_slide) {
        this.val = value;
        if( !is_slide ) this.slide_line.value =  value;
        this.view.value =  value;        
    }

    add_listener() {
        this.btn_minus.addEventListener("click", this.do_action_minus);
        this.btn_plus.addEventListener("click", this.do_action_plus);
        this.slide_line.addEventListener("input", this.do_action_calculate);
        this.slide_line.addEventListener("change", this.do_action_calculate);
        this.view.addEventListener("change", this.do_action_calculate);
    }

    do_action_plus() {
        this.do_action_calculate({target:{value: this.val + this.step}})
    }

     do_action_minus() {
        this.do_action_calculate({target:{value: this.val - this.step}})
    }

    get_val(){
        return Number(this.val);
    }
}

