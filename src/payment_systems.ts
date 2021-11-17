import readlineSync = require('readline-sync');

//unimplemented class to make Factory Design work
class PaymentInformation { 
}

//class to build the appropriate payment object
export class PaymentSystemContext {

    public getExecutor(name:string) : PaymentSystemExecutor {
        if(name == "credit card")
        {
            let creditCard = new CreditCardBuilder();
            creditCard.build();
            return creditCard.getExecutor();
        }
        if(name == "bank draft")
        {
            let bankDraft = new BankDraftBuilder();
            bankDraft.build();
            return bankDraft.getExecutor();
        }
        if(name == "online payment")
        {
            let onlinePayment = new OnlinePaymentBuilder();
            onlinePayment.build();
            return onlinePayment.getExecutor();
        }

        let offlinePayment = new OfflinePaymentBuilder();
        offlinePayment.build();
        return offlinePayment.getExecutor();
    }

}

//Factory Class 
export class PaymentSystemExecutor{
    private getInformation: () => PaymentInformation;
    private validCheck: (PaymentInformation) => boolean;

    public constructor(getInformation: () => PaymentInformation, validCheck: (pi:PaymentInformation) => boolean){
        this.getInformation = getInformation;
        this.validCheck = validCheck;
    }

    public execute(){
        let paymentInfo = this.getInformation();
        if (this.validCheck(paymentInfo)){
            console.log("Your payment is being encrypted.")
            console.log("Your payment is being processed.")
        }
        else{
            console.log("Your payment is invalid.")
        }
     }
}

//this class extends from PaymentInformation class and 
//Credit Card: name, CC number, MM/DD

class CreditCardInformation extends PaymentInformation{
    name: string;
    ccNumber: string;
    expirationDate: string;
    
    constructor()
    {
        super();
        this.name = "";
        this.ccNumber = "";
        this.expirationDate = "";
    }
}

class CreditCardBuilder{
    private getInformation: () => CreditCardInformation;
    private validCheck: (CreditCardInformation) => boolean;
    private executor: PaymentSystemExecutor;

    public constructor(){
        //gets the CC information
        function getInformation():CreditCardInformation{
            console.log('Enter Credit Card Payment Details.');
            let creditCard = new CreditCardInformation();
            creditCard.name = readlineSync.question('  Name: ');
            creditCard.ccNumber = readlineSync.question('  Credit Card Number: ');
            creditCard.expirationDate = readlineSync.question('  Credit Card Expiration Date (MM/DD): ');
            return creditCard;
        }

        //checks the validity of the CC information
        function validCheck(creditCard: CreditCardInformation) : boolean
        {
            return /^[\w.' ]+$/.test(creditCard.name) && /\d{15,16}/.test(creditCard.ccNumber) && /\d\d\/\d\d/.test(creditCard.expirationDate);
        }

        this.getInformation = getInformation;

        this.validCheck = validCheck;

        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }

    public build(){
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }

    public getExecutor(){
        return this.executor;
    }
}

//Bank draft: name, routing #, bank account #
class BankDraftInformation extends PaymentInformation {
    public name: string;
    public routingNum: string;
    public bankAccountNum: string;

    constructor(){
        super();
        this.name = "";
        this.routingNum = "";
        this.bankAccountNum = "";
    }
}

class BankDraftBuilder{
    private getInformation: () => BankDraftInformation;
    private validCheck: (BankDraftInformation) => boolean;
    private executor: PaymentSystemExecutor;

    public constructor(){
        //gets the bank draft information
        function getInformation() : BankDraftInformation{
            console.log('Enter Bank Account Details.');
            let bankDraft = new BankDraftInformation();
            bankDraft.name = readlineSync.question('  Name: ');
            bankDraft.routingNum = readlineSync.question('  Bank Routing Number: ');
            bankDraft.bankAccountNum= readlineSync.question('  Bank Account Number: ');
            return bankDraft
        }

        this.getInformation = getInformation;
        
        //checks the validity of the bank draft information
        function validCheck(bankDraft: BankDraftInformation) :boolean
        {
            return /^[\w.' ]+$/.test(bankDraft.name) && /\d{9}/.test(bankDraft.routingNum) && /\d{6,12}/.test(bankDraft.bankAccountNum);
        }
        
        this.validCheck = validCheck;
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }

    public build(){
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }

    public getExecutor(){
        return this.executor;    
    }
}

//Online Payment System: email, password
class OnlinePaymentInformation extends PaymentInformation{
    public email: string;
    public password: string;

    constructor (){
        super();
        this.email = "";
        this.password = "";
    }

}

class OnlinePaymentBuilder{
    private getInformation: () => OnlinePaymentInformation;
    private validCheck: (OnlinePaymentInformation) => boolean;
    private executor: PaymentSystemExecutor;

    public constructor(){
        //gets the online payment information
        function getInformation() : OnlinePaymentInformation{
            console.log('Enter Online Payment Details.');
            let onlinePayment = new OnlinePaymentInformation();
            onlinePayment.email= readlineSync.question('  Enter Your Email Address: ');
            onlinePayment.password = readlineSync.question('  Enter Your Payment Password: ');
            return onlinePayment;
        }

        this.getInformation = getInformation;

        //checks the validity of the online payment information
        function validCheck(onlinePayment:OnlinePaymentInformation) : boolean
        {
            return /^[\w@.]+$/.test(onlinePayment.email) && /\w+/.test(onlinePayment.password);
        }
        this.validCheck = validCheck;
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }

    public build(){
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }

    public getExecutor(){
        return this.executor;
    }
}

//Offline Payment System: name and billing address
class OfflinePaymentInformation extends PaymentInformation{
    public name: string;
    public billingAddress: string;

    constructor(){
        super();
        this.name = "";
        this.billingAddress = "";
    }
}

class OfflinePaymentBuilder{
    private getInformation: () => OfflinePaymentInformation;
    private validCheck: (OfflinePaymentInformation) => boolean;
    private executor: PaymentSystemExecutor;

    public constructor(){
        //gets the offline payment information
        function getInformation(): OfflinePaymentInformation{
            console.log('Enter Offline Payment Details.');
            let offlinePayment = new OfflinePaymentInformation();
            offlinePayment.name = readlineSync.question('  Name: ');
            offlinePayment.billingAddress = readlineSync.question('  Enter Your Billing Address: ');
            return offlinePayment;
        }
        this.getInformation = getInformation;
        //checks the validity of the offline payment information
        function validCheck(offlinePayment: OfflinePaymentInformation):boolean
        {
            return /^[\w.' ]+$/.test(offlinePayment.name) && /^[\w.' ]+$/.test(offlinePayment.billingAddress);
        }
        this.validCheck = validCheck;

       this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck);
    }

    public build(){
        this.executor = new PaymentSystemExecutor(this.getInformation, this.validCheck)
    }
    public getExecutor(){
        return this.executor;
    }
}