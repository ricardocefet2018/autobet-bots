// change it as you like
const initialBet = 1; 
const roundsWithoutKAToBet = 8;

// don't touch on this unless you know what you are doing
var btnKABet;
var btnPlus1K;
var btnDivideBy2;
var totalWagered;
var card;
var roundsWithoutKA;
var counter;
var wagers = Array();
var lastFiveCards;
var betting;

function bindElements() {
    btnKABet = document.querySelectorAll('.col_row .hilo_half_btn_left .ka-bet')[0];
    btnPlus1K = document.querySelectorAll('.btns_hold .bet_btn')[0];
    btnDivideBy2 = document.querySelectorAll('.btns_hold .bet_btn')[2];
    roundsWithoutKA = 0;
    totalAmount = 0;
    betting = false;
    profit = 0;
}

function getLastCard() {

    if(document.querySelectorAll('.history_cards .history_card span')[0].innerHTML == '<span class="icon icon-joker"></span>') {
        card = "Joker";
    } else {
        card = document.querySelectorAll('.history_cards .history_card span')[0].innerHTML;
    }

    return card;
}

function getLastFiveCards() {
    
    let lastFiveCards = Array();

    for (let i = 0; i < 5; i++) {
        if(document.querySelectorAll('.history_cards .history_card span')[i].innerHTML == '<span class="icon icon-joker"></span>') {
            lastFiveCards[i] = "Joker";
        } else {
            lastFiveCards[i] = document.querySelectorAll('.history_cards .history_card span')[i].innerHTML;
        }
    }

    return lastFiveCards;
}

function getTotal(){
    let t = 0;
    wagers.forEach(element => {
      t+=element.bet;
    });
    return t;
}

function getBet(total){
    let bet = initialBet;
    while((bet*6)<=(bet+total)){
      bet = bet + initialBet;
    }
    return bet;
}

setTimeout(function() {

    console.log("BOT STARTED!");

    bindElements();

    counter = 0;

    lastFiveCards = getLastFiveCards();
    

    for (let i = 0; i < 50; i++) {
        if (i==0) {
            this.wagers.push({
                id:(i+1), 
                total: (initialBet), 
                bet: (initialBet), 
                ifWon: (initialBet*6), 
                profit: ((initialBet*6)-initialBet)
            });
        }else{
            const id = (i+1);
    
            let total = getTotal();
            const bet = getBet(total);
            total+=bet;
    
            const ifWon = bet*6;
            const profit = ifWon-total;
    
            const wager = {
                id,
                bet,
                total,
                ifWon,
                profit
            };

          wagers.push(wager);
        }
    }

    console.log(wagers);

    setInterval(function() {
        if (lastFiveCards[0] != getLastFiveCards()[0] || lastFiveCards[1] != getLastFiveCards()[1] || lastFiveCards[2] != getLastFiveCards()[2] || lastFiveCards[3] != getLastFiveCards()[3] || lastFiveCards[4] != getLastFiveCards()[4]) {
            lastFiveCards = getLastFiveCards();
            if (getLastCard() == "K" || getLastCard() == "A") {
                if (betting) {
                    console.log("PROFIT: " + wagers[counter-1].profit + "c");
                    betting = false;
                }
                roundsWithoutKA = 0;
                counter = 0;
            }else{
                roundsWithoutKA++;
                if (roundsWithoutKA >= roundsWithoutKAToBet) {
                    setTimeout(function(){
                        betting = true;
                        document.querySelectorAll('.field_group .clear_text')[0].click();
                        for (let i = 0; i < wagers[counter].bet; i++) {
                            btnPlus1K.click();
                        }
                        for (let i = 0; i < 10; i++) {
                            btnDivideBy2.click();
                        }
                        setTimeout(()=>{
                            if (Number(document.querySelectorAll('.field_group .has-input')[0].value) == wagers[counter].bet) {
                                btnKABet.click();
                                console.log("bet number " + wagers[counter].id + " bet: " + wagers[counter].bet + " // total: " + wagers[counter].total);
                                counter++;
                            }
                        },1000);
                    }, 5500);
                }else{
                    console.log("rounds without KA: "+roundsWithoutKA);
                }
            }
        }
    }, 1000);

}, 1000);

