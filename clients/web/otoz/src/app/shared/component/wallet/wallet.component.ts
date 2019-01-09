import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { HttpService } from '../../services/http/http.service';
import { Routes } from 'src/app/routes';

import { AccountDetails, TransactionHistory, CookiesData, Contract, Vahicle } from '../../models';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  data: any;
  optionForChar = 'month';
  labelsForWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  labelsForMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  tokenDataForMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cashDataForMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  labelsForQuarter = ['January (Q1)', 'April (Q2)', 'July (Q3)', 'October (Q4)'];
  labelsForYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  accountDetails: AccountDetails = new AccountDetails();
  cards: Card[] = [];
  cookiesData: CookiesData = new CookiesData();
  selectedIndex = -1;

  constructor(
    private cookieService: CookieService,
    private httpService: HttpService
  ) {
    this.data = {
      labels: this.labelsForMonth,
      datasets: [
        {
          label: 'Cash',
          data: this.cashDataForMonth,
          fill: true,
          backgroundColor: ['rgba(79,76,199, 0.2)'],
          borderColor: '#4F4CC7'
        },
        {
          label: 'Tokens',
          data: this.tokenDataForMonth,
          fill: true,
          backgroundColor: ['rgba(86,86,86, 0.5)'],
          borderColor: '#565656'
        }
      ]
    };
  }

  ngOnInit() {
    this.cookiesData = JSON.parse(this.cookieService.get(this.cookiesData.cookieName));
    this.getFleetOwnerDetails(this.cookiesData.bpid);
  }

  getFleetOwnerDetails(id: string) {
    this.httpService.getWithCredentials(Routes.MULTI_USER + Routes.RENTER_DETAILS + id, true).subscribe((response) => {
      const res = JSON.parse(JSON.stringify(response));
      this.getFleetOwnerAccountDetails(res.account.split('#')[1]);
    });
  }

  getFleetOwnerAccountDetails = async (account: string) => {
    this.httpService.getWithCredentials(Routes.MULTI_USER + Routes.GET_ACCOUNT_DETAILS + account, true).subscribe((accountDetails) => {
      this.accountDetails = accountDetails as AccountDetails;
      this.accountDetails.transactionHistory.forEach((transactionHistory) => {
        // Insertion into Cards List
        this.insertIntoCardsList(transactionHistory);
        // graph related data
        if (transactionHistory.type === 'Debit') {
          const index = new Date(transactionHistory.timeStamp).toDateString().split(' ')[2];
          this.cashDataForMonth[parseInt(index, 0) - 1] += transactionHistory.amount;
        } else if (transactionHistory.type === 'Earn') {
          const index = new Date(transactionHistory.timeStamp).toDateString().split(' ')[2];
          this.tokenDataForMonth[parseInt(index, 0) - 1] += transactionHistory.amount;
        }
      });
      this.data = Object.assign({}, this.data);

      this.cards.forEach((card) => {
        if (card.contract) { this.updateCards(card); }
      });
    });
  }

  insertIntoCardsList = (transactionHistory: TransactionHistory) => {
    if (!transactionHistory.contract) {
      if (transactionHistory.category === 'Cash') {
        transactionHistory.cashAmount = transactionHistory.amount;
      } else {
        transactionHistory.tokenAmount = transactionHistory.amount;
      }
      const _transactionHistory = Object.assign(new TransactionHistory(), transactionHistory);
      _transactionHistory.listOfCommnets.push(transactionHistory.comments);
      this.cards.push({ contract: '', transactionHistory: _transactionHistory });
    } else {
      const index = this.cards.findIndex(obj => obj.contract === transactionHistory.contract);
      if (index === -1) {
        if (transactionHistory.category === 'Cash') {
          transactionHistory.cashAmount = transactionHistory.amount;
        } else {
          transactionHistory.tokenAmount = transactionHistory.amount;
        }
        const _transactionHistory = Object.assign(new TransactionHistory(), transactionHistory);
        _transactionHistory.listOfCommnets.push(transactionHistory.comments);
        this.cards.push({ contract: transactionHistory.contract, transactionHistory: _transactionHistory });

      } else {
        if (transactionHistory.category === 'Cash') {
          this.cards[index].transactionHistory.cashAmount = transactionHistory.amount;

        } else {
          this.cards[index].transactionHistory.tokenAmount = transactionHistory.amount;
        }
        this.cards[index].transactionHistory.listOfCommnets.push(transactionHistory.comments);
      }
    }
  }

  updateCards = async (card: Card): Promise<void> => {
    const index = this.cards.findIndex(obj => obj.contract === card.contract);
    if (index !== -1) {
      const contract = await this.getContractInformation(card.contract.split('#')[1]);
      const vahicle = await this.getCarInformation(contract.vehicle.split('#')[1]);
      this.cards[index].conatract = contract;
      this.cards[index].vahicle = vahicle;
    }
  }

  getContractInformation = async (contract: string): Promise<Contract> => {
    const response = await this.httpService.get(Routes.MULTI_USER + Routes.GET_CONTRACT_INFO + contract, true).toPromise();
    return response as Contract;
  }

  getCarInformation = async (vin: string): Promise<Vahicle> => {
    const response = await this.httpService.get(Routes.MULTI_USER + Routes.GET_CAR_INFORMATION + vin, true).toPromise();
    return response as Vahicle;
  }

  changeRowView(index, contract) {
    this.collapseAll();
    if (contract) {
      this.selectedIndex = index;
    }
  }

  collapseAll() {
    this.selectedIndex = -1;
  }
}

class Card {
  contract = '';
  conatract?: Contract = new Contract();
  vahicle?: Vahicle = new Vahicle();
  transactionHistory: TransactionHistory = new TransactionHistory();
}
