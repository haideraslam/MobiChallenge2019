import { TransactionHistory } from '.';

export class AccountDetails {
    '$class' = '';
    address = '';
    balance = 0;
    cashBalance = 0;
    transactionHistory: TransactionHistory[] = [];
}
