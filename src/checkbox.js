import {_S} from "./vanila";

export class Checkbox {
        constructor(selector, callback) {
            this.state = {
                "tags" : ["all"],
            };
            this.update_value = this.update_value.bind(this);
            _S("input[type='checkbox']").each(
                checkbox => _S(checkbox).on('change', (event) => callback(this.update_value(event)))
            )
        }

        update_value (event){
            let values = [];
            let parent_element = event.target.closest(".sdl-checkbox-group");

            _S(parent_element).find("input[type='checkbox']").each(
                (checkbox) => {
                    if(checkbox.checked){
                        values.push(checkbox.value)
                    }
                }
            );
            if (values.length){
                this.state[parent_element.dataset.filter] = values;

            }else {
                this.state[parent_element.dataset.filter] = ["all"];
            }
            return this.state;
        }

}

