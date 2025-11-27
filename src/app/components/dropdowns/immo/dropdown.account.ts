import { Injectable, OnInit } from '@angular/core';
import { AccountingAccount } from 'app/models/immo/AccountingAccount';
import { AccountingAccountService } from 'app/services/immo/accounting-account.service';

@Injectable()
export class AccountDropdown {

  filteredAccounts: AccountingAccount[];
  accounts: AccountingAccount[] = [];

  constructor(
    private locationService: AccountingAccountService) {
    this.getAll();
  }

  filter(event) {
    this.filteredAccounts = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredAccounts = this.accounts;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.accounts.length; i++) {
          let a = this.accounts[i];
        if (a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: AccountingAccount[]) => {
      this.accounts = data;
      },
        error => console.log(error),
        () => console.log('Get All AccountingAccount Complete'));
  }

}
