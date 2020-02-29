export class Offer {
    constructor(props) {
        this.supportWebP = false;
        this.actual_offers = props.offers;
        this.template = props.template;

        this.other_offers = [];
        this.nextOffer = 0;
        this.step = 20;

        this.actualListTemplate = document.querySelector('#actual-list');
        this.otherListTemplate = document.querySelector('#other-list');
        this.render = this.render.bind(this);

        this.btn_more = document.getElementById("get_more");

        this.btn_more.addEventListener("click", this.render)
        this.checkWebpSupport();
    }

    get_actual_offer_left() {
        return this.actual_offers.length - this.nextOffer;
    }

    next_step(){
        return Math.min(this.get_actual_offer_left(), this.step);
    }

    importTemplate(element) {
        if (!element) {
            return undefined;
        }
        const content = ('content' in element) ? element.content : element.firstElementChild;
        return document.importNode(content, true);
    }

    checkWebpSupport() {
        let html = document.documentElement, WebP = new Image();
        WebP.onload = WebP.onerror = function () {
            this.supportWebP = (WebP.height === 2);
            if (this.supportWebP) {
                if (html.className.indexOf('no-webp') >= 0)
                    html.className = html.className.replace(/\bno-webp\b/, 'webp');
                else document.body.className += ' webp';
            }
        };
        WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    createOfferElement(element, offer) {
        const article = element.querySelector("article");
        const that = this;
        article.setAttribute('data-title', offer.title);
        Array.from(element.querySelectorAll('[data-key]')).forEach(function (offerKeyElement) {
            offerKeyElement.innerText = offer[offerKeyElement.getAttribute('data-key')];
        });
        Array.from(element.querySelectorAll('[data-rating-icon]')).forEach(function (ratingIconElement) {
            ratingIconElement.style.width = (offer.rating / 5 * 100) + "%";
        });
        Array.from(element.querySelectorAll('[data-link]')).forEach(function (dataLinkElement) {
            dataLinkElement.href = offer.link;
            dataLinkElement.alt = offer.title;
        });
        Array.from(element.querySelectorAll('img[data-logo]')).forEach(function (logoElement) {
            logoElement.setAttribute('data-src', that.supportWebP ? offer.logo.replace('png', 'webp') : offer.logo);
            logoElement.setAttribute('alt', offer.title);
        });

        /* “feature_text” START*/
        if (offer.feature_text) {
            const text_container = document.createElement("div");
            const text = document.createElement("span");
            text_container.classList.add("feature__text_container");
            text.classList.add("feature__text");
            article.classList.add("offer_with_feature");
            text.innerText = offer.feature_text;
            if (offer.feature_color) {
                text.style.background = offer.feature_color
            }

            text_container.appendChild(text);
            article.querySelector(".offer_logo").prepend(text_container)
        }
        /*“feature_text” END*/

        /*BorderColor START*/
        const border = document.createElement("div");
        border.classList.add("offer__border");
        if (offer.feature_color) {
            border.style.background = offer.feature_color
        }
        article.appendChild(border);
        /*BorderColor END*/
        article.__ll_offer = offer;

        return article;
    }

    draw(type, offer) {
        const that = this;
        const render_offers = offer.map(function (offer) {
            const template = that.importTemplate(that.template);
            return that.createOfferElement(template, offer);
        });
        const container = type === "actual"
            ? this.actualListTemplate
            : this.otherListTemplate;
        render_offers.forEach(
            offer => container.appendChild(offer)
        );
    }

    reset(){
        this.actualListTemplate.innerHTML = "";
        this.otherListTemplate.innerHTML = "";
        this.nextOffer = 0;
        this.btn_more.style.display = ""
    }

    change(actual, other){
        this.actual_offers = actual;
        this.other_offers = other;
        this.reset();
        this.render();
    }

    render() {

        if (this.get_actual_offer_left()){
            let current = this.nextOffer;
            this.nextOffer += this.next_step();
            let last = this.nextOffer;
            const nextOffers = this.actual_offers.slice(current, last);
            this.draw("actual", nextOffers);

            if (this.other_offers.length){

                document.querySelector(".unavailable").style.display = "";
                this.draw("other", this.other_offers);
            }else {
                document.querySelector(".unavailable").style.display = "none"
            }
            if(!this.get_actual_offer_left()){
                this.btn_more.style.display = "none"
            }
            lazyload(document.querySelectorAll('[data-logo]'));
            let event = new Event("renderof", {bubbles: false, cancelable: false});
            window.dispatchEvent(event);
            return true;
        }
        return false
    }

}