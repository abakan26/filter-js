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

    hide(duration = 300) {
        this.animate(
            function (progress, elem) {
                let op = 1 - progress;
                elem.style.opacity = op.toString();
                if (progress === 1){
                    elem.style.display = "none";
                }

            },
            duration
        );
        return this;
    }

    show(duration = 300) {
        this.animate(
            function (progress, elem) {
                elem.style.display = "";
                elem.style.opacity = progress.toString();
            },
            duration
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

    css(style, value=""){
        this.each(
            element => element.style[style] = value
        );
        return this;
    }

    animate(callback, duration= 500) {
        this.each(
            elem => animation({
                timing: function (timeFraction) {
                    return timeFraction;
                },
                draw: function (progress) {
                    switch (callback) {
                        case "fade_in":
                            fade_in(progress, elem);
                            console.log("a");
                            break;
                        case "fade_out":
                            fade_out(progress, elem);
                            console.log("b");
                            break;
                        default:
                            callback(progress, elem);
                            console.log("c");
                            break;
                    }

                },
                duration: duration
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
