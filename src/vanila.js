class _Sdl {
    constructor(elements) {
        this.elements = elements;
    }

    on(event, callback) {
        this.elements.forEach(
            element => element.addEventListener(event, callback)
        );
        return this;
    }

    each(callback) {
        this.elements.forEach(item => callback(item));
        return this;
    }

    find(selector) {
        let elements = this.elements.reduce(
            (prev, currentItem, index, arr) => {
                return prev.concat(_S(currentItem.querySelectorAll(selector)).elements)
            },
            []
        );
        return new _Sdl(elements);
    }
    hide() {
        this.elements.each(
            element => element.style.display = 'none'
        );
        return this;
    }

    show() {
        this.elements.each(
            element => element.style.display = ''
        );
        return this;
    }
}

export function _S(selector) {
    let elements = [];
    if (typeof selector === "string") {
        document.querySelectorAll(selector)
            .forEach(elem => elements.push(elem));
    } else if (selector instanceof NodeList) {
        selector.forEach(elem => elements.push(elem));
    } else if (selector instanceof Element) {
        elements.push(selector)
    } else if (selector instanceof _Sdl) {
        elements = selector.elements
    }
    return new _Sdl(elements);
}
