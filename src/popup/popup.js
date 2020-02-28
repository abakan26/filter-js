import {_S} from "./vanila";

const popup = _S(".popup__overlay");
const popup_btn = _S(".popup__btn");
const popup_content = _S(".popup__content");
const popup_container =_S(".popup__container");

popup_btn.on('click', function (event) {
    popup_container.css('visibility', "visible");
    popup_btn.add("toggle-left");
    popup_content.remove("toggle-left");
    popup.remove("toggle-hidden");

});

popup_container.on("click", function(event) {

    if (event.target === this) {
        popup_container.css('visibility', "hidden");
        popup_btn.remove("toggle-left");
        popup_content.add("toggle-left");
        popup.add("toggle-hidden");
    }
});