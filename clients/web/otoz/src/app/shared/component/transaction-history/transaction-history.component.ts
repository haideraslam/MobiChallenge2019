import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  items: any = [];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get(environment.TRANSACTION_HISTORY).subscribe(x => {
      this.items = x;
      this.items = _.orderBy(this.items, ['transactionTimestamp'], ['desc']);
    });
  }

}
