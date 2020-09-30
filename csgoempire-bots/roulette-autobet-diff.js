// change it as you like
const initialBet = 1;
const roundsWithoutCTorTRToBet = 3;

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

// this const defines how much loses before stop to bet (giant number to undefined)
const stopAfterNLoses = 1;

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
var counterBets;

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
    counterBets = 0;
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
            if (!betted) {
                betted = true;
                if ((getLastTenRolls()[9]).includes("ct")) {
                    roundsWithoutCT = 0;
                    roundsWithoutTR++;
                    if (roundsWithoutTR>roundsWithoutCTorTRToBet) {    
                        roundsWithoutTR = 1;
                        // counterTR = 0;
                        bettingOnTR = false;
                        // console.log("Stopped after " + stopAfterNLoses + " loses on TR!!!!!!!!")
                    }
                    if (bettingOnCT) {
                        console.log("PROFIT: $" + ((wagers[counterBets-1].profit)/(1000/(Math.pow(10, decimalCase)))));
                        bettingOnCT = false;
                        counterBets = 0;
                    }
                    console.log("%c Rounds without TR: "+roundsWithoutTR, "background-color: #DEAF10; color: #000");
                }else if((getLastTenRolls()[9]).includes("t")){
                    roundsWithoutTR = 0;
                    roundsWithoutCT++;
                    if (roundsWithoutCT > roundsWithoutCTorTRToBet) {
                        roundsWithoutCT = 1;
                        // counterCT = 0;
                        bettingOnCT = false;
                        // console.log("Stopped after " + stopAfterNLoses + " loses on CT!!!!!!!!")
                    }
                    if (bettingOnTR) {
                        console.log("PROFIT: $" + ((wagers[counterBets-1].profit)/(1000/(Math.pow(10, decimalCase)))));
                        bettingOnTR = false;
                        counterBets = 0;
                    }
                    console.log("%c Rounds without ct: "+roundsWithoutCT, "background-color: #2B8ADC; color: #000");
                }else{
                    roundsWithoutCT++;
                    roundsWithoutTR++;
                    console.log("%c Rounds without ct: "+roundsWithoutCT, "background-color: #2B8ADC; color: #000");
                    console.log("%c Rounds without TR: "+roundsWithoutTR, "background-color: #DEAF10; color: #000");
                }
                // if (roundsWithoutCT >= roundsWithoutCTorTRToBet) {
                    if (roundsWithoutCT == roundsWithoutCTorTRToBet) {
                        setTimeout(()=>{
                            bettingOnCT = true;
                            btnClearInput.click();
                            for (let i = 0; i < wagers[counterBets].bet; i++) {
                                btnPlusBet.click();
                            }
                            setTimeout(()=>{;
                                // btnBetOnCt.click();
                                console.log("Bet number " + wagers[counterBets].id + " on CT // bet: " + wagers[counterBets].bet + " // total: " + wagers[counterBets].total);
                                counterBets++;
                            },1000);
                        }, 5000);
                    }
                // }

                // if (roundsWithoutTR >= roundsWithoutCTorTRToBet) {
                    if (roundsWithoutTR == roundsWithoutCTorTRToBet) {
                        setTimeout(()=>{
                            bettingOnTR = true;
                            btnClearInput.click();
                            for (let i = 0; i < wagers[counterBets].bet; i++) {
                                btnPlusBet.click();
                            }
                            setTimeout(()=>{
                                // btnBetOnTr.click();
                                console.log("Bet number " + wagers[counterBets].id + " on TR // bet: " + wagers[counterBets].bet + " // total: " + wagers[counterBets].total);
                                counterBets++;
                            },1000);
                        }, 5000);
                    }
                // }
            }
        }else if(document.querySelectorAll('.wheel__marker')[0].outerHTML.includes("wheel__item--visible")){
            betted = false;
        }
    },1000);

},3000);