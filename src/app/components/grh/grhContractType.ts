import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ContractType } from '../../models/grh/contractType';
import { User } from '../../models/User';
import {ContractTypeService } from '../../services/grh/contractType.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-contract-type',
  templateUrl: '../../pages/grh/grhContractType.html',
  providers: [ContractTypeService, /*LevelDropdown,*/ Constants]
})

export class GrhContractType implements OnInit, OnDestroy {

  public contractType: ContractType;
  public contractTypes: ContractType[];
  public selectedContractType: ContractType;

  public error: String = '';
  displayDialog: boolean;
  newContractType: boolean;
  cols: any[];
  public user: User;
  //public subjectDropdown: SubjectDropdown;

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
    private contractTypeService: ContractTypeService,
    //private sbjDropdon: SubjectDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.contractTypes = null;
    this.error = null;
    this.selectedContractType = null;
    this.contractType = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    //this.selectedSubjectLevel = new SubjectLevelView();
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'key', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'30%'}  },
        { field: 'wording', header: 'Libellé', sortable: 'false', filter: 'true',  style:  {'width':'40%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newContractType = true;
      this.contractType = new ContractType();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.contractTypes = [];
    this.contractTypeService.getAll()
      .subscribe((data: ContractType[]) => this.contractTypes = data,
      error => console.log(error),
      () => console.log('Get all ContractTypes complete'));
  }

  save() {
    try {
      this.error = '';
      this.contractTypeService.save(this.contractType)
        .subscribe(result => {
          if (result.id > 0) {
            this.contractType = result;
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
      this.contractTypeService.delete(this.contractType)
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
    if (this.newContractType)
      this.contractTypes.push(this.contractType);
    else
      this.contractTypes[this.findSelectedIndex()] = this.contractType;

    var onTheFly: ContractType[] = [];
    onTheFly.push(...this.contractTypes);
    this.contractTypes = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.contractTypes.splice(this.findSelectedIndex(), 1);
    var onTheFly: ContractType[] = [];
    onTheFly.push(...this.contractTypes);
    this.contractTypes = onTheFly;
    this.resetData();
  }

  resetData() {
    this.contractType = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newContractType = false;
    this.contractType = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: ContractType): ContractType {
    let aContractType = new ContractType();
    for (let prop in e) {
      aContractType[prop] = e[prop];
    }
    return aContractType;
  }

  findSelectedIndex(): number {
    return this.contractTypes.indexOf(this.selectedContractType);
  }

  /*
  public getAll(): void {
    this.contractTypes = [];
    this.contractTypeService.getAll()
      .subscribe((data: ContractType[]) => {
        this.contractTypes = data
      },
      error => console.log(error),
      () => console.log('Get all ContractTypes complete'));
  }

  save() {
    try {
      this.error = '';
      this.contractTypeService.save(this.contractType)
        .subscribe(result => {
          if (result.id > 0) {
            this.contractType = result;
            this.putInTable();
            console.log("OK");
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
            console.log("OK");
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
      this.contractTypeService.delete(this.contractType)
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
    if (this.newContractType)
    {
      this.contractTypes.push(this.contractType);
      console.log("ADD");
    }
    else
    {
      this.contractTypes[this.findSelectedIndex()] = this.contractType;
      console.log("UPDATE");
    }

    var onTheFly: ContractType[] = [];
    onTheFly.push(...this.contractTypes);
    this.contractTypes = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.contractTypes.splice(this.findSelectedIndex(), 1);
    var onTheFly: ContractType[] = [];
    onTheFly.push(...this.contractTypes);
    this.contractTypes = onTheFly;
    this.resetData();
  }

  resetData() {
    this.contractType = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user != null && this.user.role == 10) {
      this.newContractType = false;
      this.contractType = this.clone(evt.data);
      this.displayDialog = true;
    }
  }

  clone(e: ContractType): ContractType {
    let aTuition = new ContractType();
    for (let prop in e) {
      aTuition[prop] = e[prop];
    }
    return aTuition;
  }

  findSelectedIndex(): number {
    //return this.contractTypes.indexOf(this.selectedContractType);
    return this.contractTypes.indexOf(this.selectedContractType);
  }
  */

}
