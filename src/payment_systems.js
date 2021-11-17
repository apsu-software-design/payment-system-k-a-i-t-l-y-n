"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSystemExecutor = exports.PaymentSystemContext = void 0;
var readlineSync = require("readline-sync");
//unimplemented class to make Factory Design work
var PaymentInformation = /** @class */ (function () {
    function PaymentInformation() {
    }
    return PaymentInformation;
}());
//class to build the appropriate payment object
var PaymentSystemContext = /** @class */ (function () {
    function PaymentSystemContext() {
    }
    PaymentSystemContext.prototype.getExecutor = function (name) {
        if (name == "credit card") {
            var creditCard = new CreditCardBuilder();
            creditCard.build();
            return creditCard.getExecutor();
        }
        if (name == "bank draft") {
            var bankDraft = new BankDraftBuilder();
            bankDraft.build();
            return bankDraft.getExecutor();
        }
        if (name == "online payment") {
            var onlinePayment = new OnlinePaymentBuilder();
            onlinePayment.build();
            return onlinePayment.getExecutor();
        }
        var offlinePayment = new OfflinePaymentBuilder();
        offlinePayment.build();
        return offlinePayment.getExecutor();
    };
    return PaymentSystemContext;
}());
exports.PaymentSystemContext = PaymentSystemContext;
//Factory Class 
var PaymentSystemExecutor = /** @class */ (function () {
    function PaymentSystemExecutor(getInformation, validCheck) {
        this.getInformation = getInformation;
        this.validCheck = validCheck;
    }
    PaymentSystemExecutor.prototype.execute = function () {
        var paymentInfo = this.getInformation();
        if (this.validCheck(paymentInfo)) {
            console.log("Your payment is being encrypted.");
            console.log("Your payment is being processed.");
        }
        else {
            console.log("Your payment is invalid.");
        }
    };
    return PaymentSystemExecutor;
}());
exports.PaymentSystemExecutor = PaymentSystemExecutor;
//this class extends from PaymentInformation class and 
//Credit Card: name, CC number, MM/DD
var CreditCardInformation = /** @class */ (function (_super) {
    __extends(CreditCardInformation, _super);
    function CreditCardInformation() {
        var _this = _super.call(this) || this;
        _this.name = "";
        _this.ccNumber = "";
        _this.expirationDate = "";
        return _this;
    }
    return CreditCardInformation;
}(PaymentInformation));
var CreditCardBuilder = /** @class */ (function () {
    function CreditCardBuilder() {
        //gets the CC information
        function getInformation() {
            console.log('Enter Credit Card Payment Details.');
            var creditCard = new CreditCardInformation();
            creditCard.name = readlineSync.question('  Name: ');
            creditCard.ccNumber = readlineSync.question('  Credit Card Number: ');
            creditCard.expirationDate = readlineSync.question('  Credit Card Expiration Date (MM/DD): ');
            return creditCard;
        }
        //checks the validity of the CC information
        function validCheck(creditCard) {
            return /^[\w.' ]+$/.test(creditCard.name) && /\d{15,16}/.test(creditCard.ccNumber) && /\d\d\/\d\d/.test(creditCard.expirationDate);
        }
        this.getInformation = getInformation;
        this.validCheck = validCheck;
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }
    CreditCardBuilder.prototype.build = function () {
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    };
    CreditCardBuilder.prototype.getExecutor = function () {
        return this.executor;
    };
    return CreditCardBuilder;
}());
//Bank draft: name, routing #, bank account #
var BankDraftInformation = /** @class */ (function (_super) {
    __extends(BankDraftInformation, _super);
    function BankDraftInformation() {
        var _this = _super.call(this) || this;
        _this.name = "";
        _this.routingNum = "";
        _this.bankAccountNum = "";
        return _this;
    }
    return BankDraftInformation;
}(PaymentInformation));
var BankDraftBuilder = /** @class */ (function () {
    function BankDraftBuilder() {
        //gets the bank draft information
        function getInformation() {
            console.log('Enter Bank Account Details.');
            var bankDraft = new BankDraftInformation();
            bankDraft.name = readlineSync.question('  Name: ');
            bankDraft.routingNum = readlineSync.question('  Bank Routing Number: ');
            bankDraft.bankAccountNum = readlineSync.question('  Bank Account Number: ');
            return bankDraft;
        }
        this.getInformation = getInformation;
        //checks the validity of the bank draft information
        function validCheck(bankDraft) {
            return /^[\w.' ]+$/.test(bankDraft.name) && /\d{9}/.test(bankDraft.routingNum) && /\d{6,12}/.test(bankDraft.bankAccountNum);
        }
        this.validCheck = validCheck;
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }
    BankDraftBuilder.prototype.build = function () {
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    };
    BankDraftBuilder.prototype.getExecutor = function () {
        return this.executor;
    };
    return BankDraftBuilder;
}());
//Online Payment System: email, password
var OnlinePaymentInformation = /** @class */ (function (_super) {
    __extends(OnlinePaymentInformation, _super);
    function OnlinePaymentInformation() {
        var _this = _super.call(this) || this;
        _this.email = "";
        _this.password = "";
        return _this;
    }
    return OnlinePaymentInformation;
}(PaymentInformation));
var OnlinePaymentBuilder = /** @class */ (function () {
    function OnlinePaymentBuilder() {
        //gets the online payment information
        function getInformation() {
            console.log('Enter Online Payment Details.');
            var onlinePayment = new OnlinePaymentInformation();
            onlinePayment.email = readlineSync.question('  Enter Your Email Address: ');
            onlinePayment.password = readlineSync.question('  Enter Your Payment Password: ');
            return onlinePayment;
        }
        this.getInformation = getInformation;
        //checks the validity of the online payment information
        function validCheck(onlinePayment) {
            return /^[\w@.]+$/.test(onlinePayment.email) && /\w+/.test(onlinePayment.password);
        }
        this.validCheck = validCheck;
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }
    OnlinePaymentBuilder.prototype.build = function () {
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    };
    OnlinePaymentBuilder.prototype.getExecutor = function () {
        return this.executor;
    };
    return OnlinePaymentBuilder;
}());
//Offline Payment System: name and billing address
var OfflinePaymentInformation = /** @class */ (function (_super) {
    __extends(OfflinePaymentInformation, _super);
    function OfflinePaymentInformation() {
        var _this = _super.call(this) || this;
        _this.name = "";
        _this.billingAddress = "";
        return _this;
    }
    return OfflinePaymentInformation;
}(PaymentInformation));
var OfflinePaymentBuilder = /** @class */ (function () {
    function OfflinePaymentBuilder() {
        //gets the offline payment information
        function getInformation() {
            console.log('Enter Offline Payment Details.');
            var offlinePayment = new OfflinePaymentInformation();
            offlinePayment.name = readlineSync.question('  Name: ');
            offlinePayment.billingAddress = readlineSync.question('  Enter Your Billing Address: ');
            return offlinePayment;
        }
        this.getInformation = getInformation;
        //checks the validity of the offline payment information
        function validCheck(offlinePayment) {
            return /^[\w.' ]+$/.test(offlinePayment.name) && /^[\w.' ]+$/.test(offlinePayment.billingAddress);
        }
        this.validCheck = validCheck;
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }
    OfflinePaymentBuilder.prototype.build = function () {
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    };
    OfflinePaymentBuilder.prototype.getExecutor = function () {
        return this.executor;
    };
    return OfflinePaymentBuilder;
}());
