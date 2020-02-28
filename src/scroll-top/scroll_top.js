import {_S} from "./vanila";
import "./to-top.scss";

window.addEventListener("load",
    function () {

    const btn_to_top = _S("#back-to-top");
    let animation_end = true;
        btn_to_top.on("click", function (event) {
            event.preventDefault();
            btn_to_top.hide();
            let start_position = window.pageYOffset || document.documentElement.scrollTop;
            let current_position = start_position;
            console.log("start_position", start_position)
            _S(document.body).animate(function (progress, element) {
                animation_end = false;

                let distance = current_position - start_position*(1-progress);
                window.scrollBy(0, -distance);
                current_position = window.pageYOffset || document.documentElement.scrollTop;
                console.log(distance);
                // if (progress == 1){
                //     //console.log(progress)
                //     animation_end = true;
                // }
            }, 3000);

            return false;
        });
        let show_to_top = false;
        window.addEventListener("scroll", function () {
            //console.log("animation_end",animation_end);

            // let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            //
            // if (scrollTop > 0 && !show_to_top){
            //     _S("#back-to-top").show(500);
            //     show_to_top = true;
            // }else if ( scrollTop <= 100 && show_to_top ){
            //     _S("#back-to-top").hide(500);
            //     show_to_top = false;
            // }
        });
    });