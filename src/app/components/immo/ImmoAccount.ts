import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { AccountingAccount } from 'app/models/immo/AccountingAccount';
import { AccountingAccountService } from 'app/services/immo/accounting-account.service';
import { AccountDropdown } from '../dropdowns/immo/dropdown.account';

@Component({
  selector: 'app-immo-account',
  templateUrl: '../../pages/immo/immoAccount.html',
  providers: [AccountingAccountService,Constants]
})
export class ImmoAccount implements OnInit {

  public account: AccountingAccount;
  public accounts: AccountingAccount[];
  public selectedaccount: AccountingAccount;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newaccount: boolean;
  wait: boolean;

  cols: any[];
  public user: User;
  public accountingDropdown: AccountDropdown;

  DETAIL: string = Constants.DETAIL;
  SUBJECT: string = Constants.SUBJECT;
  NAME: string = Constants.NAME;
  DESCRIPTION: string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private accountService: AccountingAccountService,
    private changeDetectorRef: ChangeDetectorRef,
    private accountingDropdown1: AccountDropdown
    ) {
    this.accountingDropdown = accountingDropdown1;
  }
  ngOnDestroy() {
    this.accounts = null;
    this.error = null;
    this.selectedaccount = null;
    this.account = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.accounts = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'accountNumber', header: 'Numero de Compte', sortable: 'true', filter: 'true', style: { 'width': '25%' }, 'type' : 'Text'  },
      { field: 'name', header: 'Intitulé', sortable: 'false', filter: 'true', style: { 'width': '25%' }, 'type' : 'Text'  },
      { field: 'description', header: 'Description', sortable: 'false', filter: 'true', style: { 'width': '25%' }, 'type' : 'Raw'  },
      { field: 'parent.name', header: 'Compte parent', sortable: 'false', filter: 'true', style: { 'width': '25%' }, 'type' : 'Text'  }
    ];

    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newaccount = true;
    this.account = new AccountingAccount();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.accounts = [];
    this.accountService.getAll()
      .subscribe((data: AccountingAccount[]) => this.accounts = data,
        error => console.log(error),
        () => console.log('Get all account complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('account :' + this.account)
      this.wait = true;
      this.accountService.save(this.account)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.account = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
          this.wait = false;
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.accountService.delete(this.account)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
            this.accountingDropdown.getAll();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.newaccount)
      this.accounts.push(this.account);
    else
      this.accounts[this.findSelectedIndex()] = this.account;

    var onTheFly: AccountingAccount[] = [];
    onTheFly.push(...this.accounts);
    this.accounts = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.accounts.splice(this.findSelectedIndex(), 1);
    var onTheFly: AccountingAccount[] = [];
    onTheFly.push(...this.accounts);
    this.accounts = onTheFly;
    this.resetData();
  }

  resetData() {
    this.account = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newaccount = false;
    this.account = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: AccountingAccount): AccountingAccount {
    let aaccount = new AccountingAccount();
    for (let prop in e) {
      aaccount[prop] = e[prop];
    }
    return aaccount;
  }

  findSelectedIndex(): number {
    return this.accounts.indexOf(this.selectedaccount);
  }


}
