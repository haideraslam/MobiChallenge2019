import { TransactionHistory } from './transaction-history';

export class AccountDetails {
    '$class' = '';
    address = '';
    balance = 0;
    cashBalance = 0;
    transactionHistory: TransactionHistory[] = [];
}
