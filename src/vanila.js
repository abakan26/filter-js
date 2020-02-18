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

    add(classname) {
        this.each(e => e.classList.add(classname));
        return this;
    }

    remove(classname) {
        this.each(e => e.classList.remove(classname));
        return this;
    }

    toggle(classname) {
        this.each(e => e.classList.toggle(classname));
        return this;
    }

    checked(bool) {
        this.elements.forEach(item => item.checked = bool);
        return this;
    }

    hide() {
        this.each(
            element => element.style.display = 'none'
        );
        return this;
    }

    show() {
        this.each(
            element => element.style.display = ''
        );
        return this;
    }

    attr(name, value="") {
        if (value === "") {
            return this.elements[0].getAttribute(name);
        }
        this.elements[0].setAttribute(name, value);
        return this;
    }

    animate(callback) {
        this.each(
            elem => animation({
                timing: function (timeFraction) {
                    return timeFraction;
                },
                draw: function (progress) {
                    callback(progress, elem)
                },
                duration: 500
            })
        );

        function animation({timing, draw, duration}) {
            let start = performance.now();
            requestAnimationFrame(function animate(time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;
                let progress = timing(timeFraction);
                draw(progress);
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }

            });
        }

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
