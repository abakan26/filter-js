export function _S(selector) {
    let element;
    if (typeof selector === "string") {
        element = document.querySelectorAll(selector)
    } else if (typeof selector === "object") {
        element = selector;
    }

    return {
        "element": element,
        "each": function (callback) {
            this.element.forEach(item => callback(item))
        },
        "on": function (event, callback) {
            this.element.addEventListener(event, callback)
        },
        "childrens"(name) {
            return _S(this.element.querySelectorAll(name))
        },
        "find" :function (name) {
            return this.element.querySelector(name)
        }
    };
}