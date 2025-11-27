import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Bank } from '../../models/grh/bank';
import { User } from '../../models/User';
import { BankService } from '../../services/grh/bank.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-employee-bank',
  templateUrl: '../../pages/grh/grhEmployeeBank.html',
  providers: [BankService, Constants]
})

export class GrhEmployeeBank implements OnInit, OnDestroy {

  public bank: Bank;
  public banks: Bank[];
  public selectedBank: Bank;

  public error: String = '';
  displayDialog: boolean;
  newBank: boolean;
  cols: any[];
  public user: User;

  DETAIL: string = Constants.DETAIL;
  LEVELS:  string = Constants.LEVELS;
  SUBJECT:  string = Constants.SUBJECT;
  NAME:  string = Constants.NAME;
  DESCRIPTION:  string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private bankService: BankService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnDestroy() {
    this.banks = null;
    this.error = null;
    this.selectedBank = null;
    this.bank = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'name', header: 'Nom', sortable: 'false', filter: 'true',  style:  {'width':'40%'}  },
        { field: 'code', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'10%'}  },
        { field: 'email', header: 'Email', sortable: 'true', filter: 'true', style:  {'width':'25%'}  },
        { field: 'phoneNumber', header: 'Numéro de Tel.', sortable: 'false', filter: 'true',  style:  {'width':'25%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newBank = true;
      this.bank = new Bank();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.banks = [];
    this.bankService.getAll()
      .subscribe((data: Bank[]) => this.banks = data,
      error => console.log(error),
      () => console.log('Get all Banks complete'));
  }

  save() {
    try {
      this.error = '';
      this.bankService.save(this.bank)
        .subscribe(result => {
          if (result.id > 0) {
            this.bank = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.bankService.delete(this.bank)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
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
    if (this.newBank)
      this.banks.push(this.bank);
    else
      this.banks[this.findSelectedIndex()] = this.bank;

    var onTheFly: Bank[] = [];
    onTheFly.push(...this.banks);
    this.banks = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.banks.splice(this.findSelectedIndex(), 1);
    var onTheFly: Bank[] = [];
    onTheFly.push(...this.banks);
    this.banks = onTheFly;
    this.resetData();
  }

  resetData() {
    this.bank = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newBank = false;
    this.bank = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Bank): Bank {
    let aBank = new Bank();
    for (let prop in e) {
      aBank[prop] = e[prop];
    }
    return aBank;
  }

  findSelectedIndex(): number {
    return this.banks.indexOf(this.selectedBank);
  }

}
