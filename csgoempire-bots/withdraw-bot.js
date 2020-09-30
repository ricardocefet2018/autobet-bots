// Value of the skin that you want
const skinMinValue = 11;
const skinMaxValue = 13;
// Exact or part of the skin name that you want ("" to undefined)
const skinName = "Phantom Disruptor";
//dont change it
var clicked = false;

setInterval(() => {
    if (document.querySelectorAll('.item__inner .px-1')[0] && !clicked) {
        if (Number((document.querySelectorAll('.item__inner .px-1')[0].innerText).replace(',','.')) < skinMaxValue && Number((document.querySelectorAll('.item__inner .px-1')[0].innerText).replace(',','.')) > skinMinValue) {
            if (document.querySelectorAll('.item__inner div .px-2')[1].innerText.includes(skinName)) {
                document.querySelectorAll('.item')[0].click();
                document.querySelectorAll('.capitalize')[0].click();
                clicked = true;
            }
        }
    }
}, 200);