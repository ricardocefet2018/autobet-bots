// change it as you like
const initialBet = 1;
const roundsWithoutCTorTRToBet = 6;

/* decimal case defines the step of the bet
 * 1 = $0.01;
 * 2 = $0.10;
 * 3 = $1.00;
 * 4 = $10.00;
 * 5 = $100.00;
*/
const decimalCase = 1;

/*
 * E.g. if you put the decimalCase as 2 and the initalBet as 5
 * your fisrt bet will be $0.50 and the next will be $1,00
*/

// this const defines how much loses before stop to bet (0 to undefined)
const stopAfterNLoses = 3;

// don't touch on this unless you know what you are doing
var btnClearInput;
var btnPlusBet;
var btnBetOnCt;
var btnBetOnTr;
var lastTenRolls;
var wagers = Array();
var isRolling;
var roundsWithoutCT;
var roundsWithoutTR;
var betted;
var bettingOnCT;
var bettingOnTR;
var counterCT;
var counterTR;

function bindElements() {
    btnClearInput = document.querySelectorAll('.bet-input__control')[0];
    btnPlusBet = document.querySelectorAll('.bet-input__control')[decimalCase];
    btnBetOnCt = document.querySelectorAll('.bet-btn')[0];
    btnBetOnTr = document.querySelectorAll('.bet-btn')[2];
    roundsWithoutCT = 0;
    roundsWithoutTR = 0;
    bettingOnCT = false;
    bettingOnTR = false;
    betted = false;
    counterCT = 0;
    counterTR = 0
}

function getLastTenRolls() {
    
    var lastTenRolls = Array();

    for (let i = 0; i < 10; i++) {
        if(document.querySelectorAll('.previous-rolls-item')[i].innerHTML.includes("coin-ct")) {
            lastTenRolls[i] = "ct";
        }else if (document.querySelectorAll('.previous-rolls-item')[i].innerHTML.includes("coin-t")) {
            lastTenRolls[i] = "t";
        }else if (document.querySelectorAll('.previous-rolls-item')[i].innerHTML.includes("coin-bonus")) {
            lastTenRolls[i] = "dice";
        }else{
            lastTenRolls[i] = "jackpot";
        }
    }

    return lastTenRolls;
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
    while((bet*2)<=(bet+total)){
      bet = bet + initialBet;
    }
    return bet;
}

function getLastRoll(){

}

setTimeout(function () {
    bindElements();
    console.log("BOT STARTED");

    lastTenRolls = getLastTenRolls();
    isRolling = document.querySelectorAll('.wheel__marker')[0].outerHTML.includes("wheel__item--visible");

    for (let i = 0; i < 22; i++) {
        if (i==0) {
            this.wagers.push({
                id:(i+1), 
                total: (initialBet), 
                bet: (initialBet), 
                ifWon: (initialBet*2), 
                profit: ((initialBet*2)-initialBet)
            });
        }else{
            const id = (i+1);
    
            let total = getTotal();
            const bet = getBet(total);
            total+=bet;
    
            const ifWon = bet*2;
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

    setInterval(() => {
        if (!document.querySelectorAll('.wheel__marker')[0].outerHTML.includes("wheel__item--visible")) {
            // console.log("entra no não rolando");
            if (!betted) {
                // console.log("entra no não apostado ainda");
                betted = true;
                if ((getLastTenRolls()[9]).includes("ct")) {
                    roundsWithoutCT = 0;
                    roundsWithoutTR++;
                    if (bettingOnCT) {
                        console.log("PROFIT: $" + ((wagers[counterCT-1].profit)/(1000/(Math.pow(10, decimalCase)))));
                        bettingOnCT = false;
                    }
                    console.log("%c Rounds without TR: "+roundsWithoutTR, "background-color: #DEAF10; color: #000");
                }else if((getLastTenRolls()[9]).includes("t")){
                    roundsWithoutTR = 0;
                    roundsWithoutCT++;
                    if (bettingOnTR) {
                        console.log("PROFIT: $" + ((wagers[counterTR-1].profit)/(1000/(Math.pow(10, decimalCase)))));
                        bettingOnTR = false;
                    }
                    console.log("%c Rounds without ct: "+roundsWithoutCT, "background-color: #2B8ADC; color: #000");
                }else{
                    roundsWithoutCT++;
                    roundsWithoutTR++;
                    console.log("%c Rounds without ct: "+roundsWithoutCT, "background-color: #2B8ADC; color: #000");
                    console.log("%c Rounds without TR: "+roundsWithoutTR, "background-color: #DEAF10; color: #000");
                }

                if (roundsWithoutCT >= roundsWithoutCTorTRToBet) {
                    // console.log("entra no rounds without ct");
                    if (counterCT < stopAfterNLoses) {
                        // console.log("entra no if do stopAfterLoses do CT");
                        setTimeout(()=>{
                            bettingOnCT = true;
                            btnClearInput.click();
                            for (let i = 0; i < wagers[counterCT].bet; i++) {
                                btnPlusBet.click();
                            }
                            //btnBetOnCt.click();
                            // console.log("teria apostado no ct");
                            console.log("Bet number " + wagers[counterCT].id + " on CT // bet: " + wagers[counterCT].bet + " // total: " + wagers[counterCT].total);
                            counterCT++;
                        }, 8000);
                    }else{
                        roundsWithoutCT = 0;
                        counterCT = 0;
                        bettingOnCT = false;
                        console.log("Stopped after " + stopAfterNLoses + " loses on CT!!!!!!!!")
                    }
                }

                if (roundsWithoutTR >= roundsWithoutCTorTRToBet) {
                    // console.log("entra no rounds without tr");
                    if (counterTR < stopAfterNLoses) {
                        // console.log("entra no if do stopAfterLoses do TR");
                        setTimeout(()=>{
                            bettingOnTR = true;
                            btnClearInput.click();
                            for (let i = 0; i < wagers[counterTR].bet; i++) {
                                btnPlusBet.click();
                            }
                            //btnBetOnTr.click();
                            // console.log("teria apostado no tr");
                            console.log("Bet number " + wagers[counterTR].id + " on TR // bet: " + wagers[counterTR].bet + " // total: " + wagers[counterTR].total);
                            counterTR++;
                        }, 8000);
                    }else{
                        roundsWithoutTR = 0;
                        counterTR = 0;
                        bettingOnTR = false;
                        console.log("Stopped after " + stopAfterNLoses + " loses on TR!!!!!!!!")
                    }
                }
            }
        }else if(document.querySelectorAll('.wheel__marker')[0].outerHTML.includes("wheel__item--visible")){
            // console.log("entra no rolando");
            betted = false;
        }
    },1000);

},3000);


//checador se rodou
//document.querySelectorAll('.wheel__marker')[0].outerHTML.includes("wheel__item--visible");