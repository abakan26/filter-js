import {_S} from "../vanila";

export class Checkbox {
    constructor(filter_groups, callback) {
        this.state = this.get_object_state(filter_groups);
        this.update_value = this.update_value.bind(this);
        this.group = _S(filter_groups);
        this.group.find("input[type='checkbox']").each(
            checkbox => _S(checkbox).on('change', (event) => callback(this.update_value(event)))
        )
    }
    find(type, value){
        const checkboxGroup = this.group.find(`[data-filter-name=${type}]`);
        const chs = checkboxGroup.find("input[type='checkbox']");
        return chs.elements.filter( ch => ch.value === value)[0]
    }
    update_value(event) {

        let values = [];
        let parent_element = event.target.closest(".sdl-checkbox-group");

        _S(parent_element).find("input[type='checkbox']").each(
            (checkbox) => {
                if (checkbox.checked) {
                    values.push(checkbox.value)
                }
            }
        );

        if (values.length) {
            this.state[parent_element.dataset.filter].values = values;

        } else {
            this.state[parent_element.dataset.filter].values = ["all"];
        }
        return this.state;
    }

    get_object_state(selector) {
        let obj = {};
        _S(selector).find("[data-filter-group='checkbox']").
        find('input[type="checkbox"]').checked(false);
        _S(selector).find("[data-filter-group='checkbox']")
            .each( function (elem){
                obj[elem.dataset.filter] = {
                    "type" : elem.dataset.filterType,
                    "values" : ["all"],
                    "name" : elem.dataset.filterName
                }
            });
        return obj;
    }


}
//new Checkbox(".sdl-filter");
/*
* state = {
*   "city" : {"type" : "set", "values" : ["all"]}
* }
* */