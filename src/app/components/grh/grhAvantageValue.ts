import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AvantageValue } from '../../models/grh/avantageValue';
import { User } from '../../models/User';
import { Employee } from '../../models/grh/employee';
import { PayDetail } from '../../models/grh/payDetail';
import { EmployeeService } from '../../services/grh/employee.service';
import { AvantageValueService } from '../../services/grh/avantageValue.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AvantageDropdown } from '../dropdowns/grh/dropdown.avantage';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-avantage-value',
  templateUrl: '../../pages/grh/grhAvantageValue.html',
  providers: [AvantageValueService, EmployeeService, AvantageDropdown, Constants]
})

export class GRHAvantageValue implements OnInit, OnDestroy {

  public avantageValue: AvantageValue;
  public avantageValues: AvantageValue[];
  public selectedAvantageValue: AvantageValue;
  public employee: Employee;

  public error: String = '';
  displayDialog: boolean;
  newAvantageValue: boolean;
  cols: any[];
  public user: User;
  public avantageDropdown: AvantageDropdown;

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
    private avantageValueService: AvantageValueService,
    private employeeService: EmployeeService,
    private aDropdon: AvantageDropdown,
    private changeDetectorRef: ChangeDetectorRef
    )
  {
    this.avantageDropdown = aDropdon;
    this.employee = new Employee();
    this.employee.user = new User();
  }

  ngOnDestroy() {
    this.avantageValues = null;
    this.error = null;
    this.selectedAvantageValue = null;
    this.avantageValue = null;
    this.cols = null;
  }

  ngOnInit() {
      this.user = JSON.parse(atob(Cookie.get('user')));
      //this.selectedSubjectLevel = new SubjectLevelView();
      if (this.user == null) {
        this.user = new User();
      }
      this.cols = [
        { field: 'avantage.wording', header: 'Avantage', sortable: 'true', filter: 'true', style:  {'width':'40%'}  },
        { field: 'amount', header: 'Montant', sortable: 'false', filter: 'true',  style:  {'width':'30%'}  }
      ];
  }

 public getAvantageTypes(): void {
    this.avantageValues = [];
    /*
    this.courseTopicService.getSubjectLevels()
      .subscribe((data: SubjectLevelView[]) => {
        this.subjectLevels = data
      },
      error => console.log(error),
      () => console.log('Get all subjectLevels complete'));
      */
  }

  setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data;
        //this.employee.user = user;

        console.log(this.employee);

        if(this.employee != null) {
            this.getAvantagesValueByEmployee();
            //this.getAll();
        }
      },
        error => console.log(error),
        () => console.log('Get employee complete'));

  }

  public getAvantagesValueByEmployee() {
    this.avantageValues = [];
    this.avantageValueService.getByEmployee(this.employee)
      .subscribe((data: AvantageValue[]) => {

        this.avantageValues = data

      },
        error => console.log(error),
        () => console.log('Get avantageValues complete'));
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newAvantageValue = true;
      this.avantageValue = new AvantageValue();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.avantageValues = [];
    this.avantageValueService.getAll()
      .subscribe((data: AvantageValue[]) => this.avantageValues = data,
      error => console.log(error),
      () => console.log('Get all AvantageValues complete'));
  }

  save() {
    this.avantageValue.payDetail = new PayDetail();
    this.avantageValue.payDetail.employee = this.employee;

    try {
      this.error = '';
      this.avantageValueService.save(this.avantageValue)
        .subscribe(result => {
          if (result.id > 0) {
            this.avantageValue = result;
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
      this.avantageValueService.delete(this.avantageValue)
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
    if (this.newAvantageValue)
      this.avantageValues.push(this.avantageValue);
    else
      this.avantageValues[this.findSelectedIndex()] = this.avantageValue;

    var onTheFly: AvantageValue[] = [];
    onTheFly.push(...this.avantageValues);
    this.avantageValues = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.avantageValues.splice(this.findSelectedIndex(), 1);
    var onTheFly: AvantageValue[] = [];
    onTheFly.push(...this.avantageValues);
    this.avantageValues = onTheFly;
    this.resetData();
  }

  resetData() {
    this.avantageValue = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newAvantageValue = false;
    this.avantageValue = this.clone(evt.data);
    this.displayDialog = true;
    console.log(this.avantageValue);
  }

  clone(e: AvantageValue): AvantageValue {
    let aAvantageValue = new AvantageValue();
    for (let prop in e) {
      aAvantageValue[prop] = e[prop];
    }
    return aAvantageValue;
  }

  findSelectedIndex(): number {
    return this.avantageValues.indexOf(this.selectedAvantageValue);
  }

}
