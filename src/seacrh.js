import {_S} from "./vanila";

window.addEventListener("load",
    function () {
        let currentFocus;
        let inp = document.getElementById("company-name");
        let arr = window.__ll_offers.map(e => e.title);
        function closeAllLists(elmnt) {
            let x = document.getElementsByClassName("sdl-autocomplete-items");
            for (let i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("sdl-autocomplete-active");
            }
        }

        function addActive(x) {

            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("sdl-autocomplete-active");
        }

        document.getElementById("company-name").addEventListener("input", function(e) {
            var a, b, i, val = this.value;

            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            a = document.createElement("div");
            a.setAttribute("id", this.id + "sdl-autocomplete-list");
            a.setAttribute("class", "sdl-autocomplete-items");
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

                    b = document.createElement("div");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function(e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });

        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "sdl-autocomplete-list");

            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode === 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                addActive(x);
            } else if (e.keyCode == 13) {

                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });
        document.getElementById("search-title").addEventListener("click", function (e) {
            if (inp.value ){
                let v = window.__ll_offers.filter(
                    r => inp.value === r.title
                );
                let iv = window.__ll_offers.filter(
                    r => inp.value !== r.title
                );
                _S("#actual-list").find(".offer").show();
                iv.forEach(
                    elem =>{_S("#actual-list").find(`.offer[data-title='${elem.title}']`).hide();
                    }
                );
            }else {
                _S("#actual-list").find(".offer").show();
            }

        });

    });