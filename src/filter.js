class Filter
{
    constructor(){

    }
}
const offer = document.querySelectorAll(".offer");
const credit = offer[1].querySelectorAll("[data-key='credit_first']");


for (let a of offer){
    a.addEventListener('click', handlerClick)
}
function handlerClick(event) {
    console.log(this.style)
}

function _S(selector) {
    let  obj = {}
    return obj;
}

function _Shide(element) {
    element.style.display = 'none';
    return element;
}

function _Sshow() {
    element.style.display = '';
    return element;
}
Sfilter(offer);
function Sfilter(arr, cond) {
    for(let i of arr){
        console.log(i.querySelector(("[data-key='credit_first']")).innerText)

    }

}