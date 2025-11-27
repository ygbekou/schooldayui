import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PaySlipAvantageValue } from '../../models/grh/paySlipAvantageValue';
import { PaySlip } from '../../models/grh/paySlip';
import { Periode } from '../../models/grh/periode';
import { Employee } from '../../models/grh/employee';
import { User } from '../../models/User';
import {PaySlipService } from '../../services/grh/paySlip.service';
import {EmployeeService } from '../../services/grh/employee.service';
import {CongeService} from '../../services/grh/conge.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-admin-generate-all-employee-conge-status',
  templateUrl: '../../pages/grh/adminGenerateAllEmployeeCongeStatus.html',
  providers: [PaySlipService, EmployeeService, Constants, CongeService]
})

export class AdminGenerateAllEmployeeCongeStatus implements OnInit, OnDestroy {

  public paySlip: PaySlip = new PaySlip();
  public paySlips: PaySlip[];
  public selectedPaySlip: PaySlip;
  public employee: Employee;

  public reportName: string;
  public printLabel:string= 'Générer l\'état';

  public error: String = '';
  displayDialog: boolean;
  newPaySlip: boolean;
  cols: any[];
  public user: User;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private paySlipService: PaySlipService,
    private employeeService: EmployeeService,
    private congeService: CongeService
    ) {
    this.employee = new Employee();
    this.employee.user = new User();
  }
  ngOnDestroy() {
  
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));

    if (this.user == null) {
      this.user = new User();
    }

    this.paySlip.periode = new Periode();
    this.paySlip.employee = new Employee();

  }

  public setEmployee(user: User) {
    this.employeeService.getByUser(user)
      .subscribe((data: Employee) => {

        this.employee = data;

        console.log(this.employee);

      },
        error => console.log(error),
        () => console.log('Get employee complete'));

  }

  public printAllEmployeeCongeStatus() {
    this.reportName=null;
    this.printLabel=Constants.GENERATION_ETAT;

    this.congeService.printAllEmployeeCongeStatus()
    .subscribe((data: string) => {
      this.reportName = data;
      this.printLabel=Constants.GENERER_ETAT;
    },
    error => console.log(error),
    () => console.log('Get print allEmployeeCongeHistory'));
  }

}
