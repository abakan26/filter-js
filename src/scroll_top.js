import {_S} from "./vanila";
import "./to-top.scss";

window.addEventListener("load",
    function () {
        document.getElementById("back-to-top")
            .addEventListener("click", function (event) {
                event.preventDefault();
                _S("#back-to-top").hide();
                _S(document.body).animate(function (progress, element) {
                    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    window.scrollTo(0, scrollTop*(1-progress));
                }, 3000);

                return false;
            });
        let show_to_top = false;
        window.addEventListener("scroll", function () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 0 && !show_to_top){
                _S("#back-to-top").show(500);
                show_to_top = true;
            }else if ( scrollTop <= 100 && show_to_top ){
                _S("#back-to-top").hide(500);
                show_to_top = false;
            }
        });
    });