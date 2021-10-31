"use strict";
//User Interface for The Payment System
//@author James Church
exports.__esModule = true;
exports.start = void 0;
var readlineSync = require("readline-sync"); //for easier repeated prompts
var payment_systems_1 = require("./payment_systems");
/**
 * Function to run the UI
 */
function start() {
    showMainMenu(new payment_systems_1.PaymentSystemContext());
}
exports.start = start;
/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(psc) {
    while (true) { //run until we exit
        console.log("Welcome to the Payment System! You wish to purchase an item for $5. Pick an option:\n  1. Use a credit card.\n  2. Use a bank draft.\n  3. Use an online payment system.\n  4. Use an offline payment system.\n  5. Quit.");
        var response = readlineSync.question('> ');
        if (response === '5' || response.slice(0, 2).toLowerCase() === ':q') {
            break; //stop looping, thus leaving method
        }
        switch (response) { //handle each response
            case '1':
                showCreditCardPaymentMenu(psc);
                break;
            case '2':
                showBankDraftPaymentMenu(psc);
                break;
            case '3':
                showOnlinePaymentMenu(psc);
                break;
            case '4':
                showOfflinePaymentMenu(psc);
                break;
            default: console.log('Invalid option!');
        }
        console.log(''); //extra empty line for revisiting
    }
}
function showCreditCardPaymentMenu(psc) {
    psc.getExecutor("credit card").execute();
}
function showBankDraftPaymentMenu(psc) {
    psc.getExecutor("bank draft").execute();
}
function showOnlinePaymentMenu(psc) {
    psc.getExecutor("online payment").execute();
}
function showOfflinePaymentMenu(psc) {
    psc.getExecutor("offline payment").execute();
}
