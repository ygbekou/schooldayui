import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Avantage } from '../../models/grh/avantage';
import { User } from '../../models/User';
import { AvantageService } from '../../services/grh/avantage.service';
import {LetterService} from '../../services/grh/letter.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AvantageTypeDropdown } from '../dropdowns/dropdown.avantageType';
import {SocietyBankDropdown} from '../dropdowns/grh/dropdown.societyBank';
import { DataTableModule, DialogModule } from 'primeng/primeng';
import { AccountNumber } from 'app/models/grh/accountNumber';

@Component({
  selector: 'app-grh-account-number',
  templateUrl: '../../pages/grh/grhAccountNumber.html',
  providers: [SocietyBankDropdown, Constants]
})

export class GrhAccountNumber implements OnInit, OnDestroy {

  public accountNumber: AccountNumber = new AccountNumber();
  public accountNumbers: AccountNumber[]
  public selectedAccountNumber: AccountNumber;

  public error: String = '';
  displayDialog: boolean;
  newAccoutNumber: boolean;

  cols: any[];
  public user: User;
  public societyBankDropdown: SocietyBankDropdown;

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
    private letterService: LetterService,
    private sbDropDown: SocietyBankDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.societyBankDropdown = sbDropDown;
  }
  ngOnDestroy() {
    this.accountNumbers = null;
    this.error = null;
    this.selectedAccountNumber = null;
    this.accountNumber = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    //this.selectedSubjectLevel = new SubjectLevelView();
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'societyBank.name', header: 'Banque', sortable: 'true', filter: 'true', style:  {'width':'30%'}  },
        { field: 'number', header: 'Numero', sortable: 'true', filter: 'true', style:  {'width':'50%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newAccoutNumber = true;
      this.accountNumber = new AccountNumber();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.accountNumbers = [];
    this.letterService.getAllAccounNumber()
      .subscribe((data: AccountNumber[]) => this.accountNumbers = data,
      error => console.log(error),
      () => console.log('Get all accountNumbers complete'));
  }

  save() {
    try {
      this.error = '';
      this.letterService.saveAccountNumber(this.accountNumber)
        .subscribe(result => {
          if (result.id > 0) {
            this.accountNumber = result;
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
      this.letterService.deleteAccountNumber(this.accountNumber)
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
    if (this.newAccoutNumber)
      this.accountNumbers.push(this.accountNumber);
    else
      this.accountNumbers[this.findSelectedIndex()] = this.accountNumber;

    var onTheFly: AccountNumber[] = [];
    onTheFly.push(...this.accountNumbers);
    this.accountNumbers = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.accountNumbers.splice(this.findSelectedIndex(), 1);
    var onTheFly: AccountNumber[] = [];
    onTheFly.push(...this.accountNumbers);
    this.accountNumbers = onTheFly;
    this.resetData();
  }

  resetData() {
    this.accountNumber = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newAccoutNumber = false;
    this.accountNumber = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: AccountNumber): AccountNumber {
    let aAccountNumber = new AccountNumber();
    for (let prop in e) {
      aAccountNumber[prop] = e[prop];
    }
    return aAccountNumber;
  }

  findSelectedIndex(): number {
    return this.accountNumbers.indexOf(this.selectedAccountNumber);
  }
}
