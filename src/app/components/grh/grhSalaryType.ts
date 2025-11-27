import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SalaryType } from '../../models/grh/salaryType';
import { User } from '../../models/User';
import { SalaryTypeService } from '../../services/grh/salaryType.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-salary-type',
  templateUrl: '../../pages/grh/grhSalaryType.html',
  providers: [SalaryTypeService, /*LevelDropdown,*/ Constants]
})

export class GrhSalaryType implements OnInit, OnDestroy {

  public salaryType: SalaryType;
  public salaryTypes: SalaryType[];
  public selectedSalaryType: SalaryType;

  public error: String = '';
  displayDialog: boolean;
  newSalaryType: boolean;
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
    private salaryTypeService: SalaryTypeService,
    //private sbjDropdon: SubjectDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.salaryTypes = null;
    this.error = null;
    this.selectedSalaryType = null;
    this.salaryType = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
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
      this.newSalaryType = true;
      this.salaryType = new SalaryType();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.salaryTypes = [];
    this.salaryTypeService.getAll()
      .subscribe((data: SalaryType[]) => this.salaryTypes = data,
      error => console.log(error),
      () => console.log('Get all AvantageTypes complete'));
  }

  save() {
    try {
      this.error = '';
      this.salaryTypeService.save(this.salaryType)
        .subscribe(result => {
          if (result.id > 0) {
            this.salaryType = result;
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
      this.salaryTypeService.delete(this.salaryType)
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
    if (this.newSalaryType)
      this.salaryTypes.push(this.salaryType);
    else
      this.salaryTypes[this.findSelectedIndex()] = this.salaryType;

    var onTheFly: SalaryType[] = [];
    onTheFly.push(...this.salaryTypes);
    this.salaryTypes = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.salaryTypes.splice(this.findSelectedIndex(), 1);
    var onTheFly: SalaryType[] = [];
    onTheFly.push(...this.salaryTypes);
    this.salaryTypes = onTheFly;
    this.resetData();
  }

  resetData() {
    this.salaryType = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newSalaryType = false;
    this.salaryType = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: SalaryType): SalaryType {
    let aAvantageType = new SalaryType();
    for (let prop in e) {
      aAvantageType[prop] = e[prop];
    }
    return aAvantageType;
  }

  findSelectedIndex(): number {
    return this.salaryTypes.indexOf(this.selectedSalaryType);
  }

}
