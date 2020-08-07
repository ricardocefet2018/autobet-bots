// change it as you like
const initialBet = 1; 
const roundsWithoutJokerToBet = 48;

// don't touch on this unless you know what you are doing
var btnJokerBet;
var valueBetInput;
var totalWagered;
var card;
var roundsWithoutJoker;
var counter;
var wagers = Array();
var lastCard;
var betting;

function bindElements() {
    btnJokerBet = document.querySelectorAll('.col_row .joker_btn .joker-bet')[0];
    btnPlus1K = document.querySelectorAll('.btns_hold .bet_btn')[0];
    btnDivideBy2 = document.querySelectorAll('.btns_hold .bet_btn')[2];
    roundsWithoutJoker = 0;
    totalAmount = 0;
    betting = false;
}

function getLastCard() {

    if(document.querySelectorAll('.history_cards .history_card span')[0].innerHTML == '<span class="icon icon-joker"></span>') {
        card = "Joker";
    } else {
        card = document.querySelectorAll('.history_cards .history_card span')[0].innerHTML;
    }

    return card;
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
    while((bet*24)<=(bet+total)){
      bet = bet + initialBet;
    }
    // console.log("sai do while");
    return bet;
}

setTimeout(function() {

    console.log("BOT STARTED!", "font-size: 30px");

    bindElements();

    counter = 0;

    lastCard = getLastCard();
    

    for (let i = 0; i < 200; i++) {
        if (i==0) {
            this.wagers.push({
                id:(i+1), 
                total: (initialBet), 
                bet: (initialBet), 
                ifWon: (initialBet*24), 
                profit: ((initialBet*24)-initialBet)
            });
        }else{
            const id = (i+1);
    
            let total = getTotal();
            const bet = getBet(total);
            total+=bet;
    
            const ifWon = bet*24;
            const profit = ifWon-total;
    
            const wager = {
                id: id,
                bet: bet,
                total: total,
                ifWon: ifWon,
                profit: profit
            };

          wagers.push(wager);
        }
    }

    console.log(wagers[0]);

    setInterval(function() {
        if (lastCard != getLastCard()) {
            lastCard = getLastCard();
            if (getLastCard() == "Joker") {
                if (betting) {
                    console.log("PROFIT: "+wagers[counter-1].profit);
                    betting = false;
                }
                roundsWithoutJoker = 0;
                counter = 0;
            }else{
                roundsWithoutJoker++;
                if (roundsWithoutJoker >= roundsWithoutJokerToBet) {
                    betting = true;
                    setTimeout(function(){
                        for (let i = 0; i < wagers[counter].bet; i++) {
                            btnPlus1K.click();
                        }
                        for (let i = 0; i < 10; i++) {
                            btnDivideBy2.click();
                        }
                        if (Number(document.querySelectorAll('.field_group .has-input')[0].value) == wagers[counter].bet) {
                            btnKABet.click();
                        }
                        console.log("bet number " + wagers[counter].id + " bet: " + wagers[counter].bet + " // total: " + wagers[counter].total);
                        counter++;
                    }, 6000);
                }else{
                    console.log("rounds without joker: "+roundsWithoutJoker);
                }
            }
        }
    }, 1000);

}, 1000);

