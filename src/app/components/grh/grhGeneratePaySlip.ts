import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PaySlipAvantageValue } from '../../models/grh/paySlipAvantageValue';
import { PaySlip } from '../../models/grh/paySlip';
import { Periode } from '../../models/grh/periode';
import { Employee } from '../../models/grh/employee';
import { User } from '../../models/User';
import {PaySlipService } from '../../services/grh/paySlip.service';
import {EmployeeService } from '../../services/grh/employee.service';
import {PaiementModeDropdown } from '../../components/dropdowns/grh/dropdown.paiementMode';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-generate-pay-slip',
  templateUrl: '../../pages/grh/grhGeneratePaySlip.html',
  providers: [PaySlipService, EmployeeService, PaiementModeDropdown, Constants]
})

export class GrhGeneratePaySlip implements OnInit, OnDestroy {

  public paySlip: PaySlip = new PaySlip();
  public paySlips: PaySlip[];
  public selectedPaySlip: PaySlip;
  public employee: Employee;

  paiementModeDropdown: PaiementModeDropdown;
  public reportName: string;
  public printLabel:string= 'Générer le bulletin';

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
    private pmDropdown: PaiementModeDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.paiementModeDropdown = pmDropdown;
    this.employee = new Employee();
    this.employee.user = new User();
  }
  ngOnDestroy() {
    this.paySlips = null;
    this.error = null;
    this.selectedPaySlip = null;
    this.paySlip = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));

    if (this.user == null) {
      this.user = new User();
    }

    this.paySlip.periode = new Periode();

  }

 public getPaySlips(): void {
    this.paySlips = [];

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

  public getAll(): void {
    this.paySlips = [];
    this.paySlipService.getAll()
      .subscribe((data: PaySlip[]) => {
        this.paySlips = data;
      },
      error => console.log(error),
      () => console.log('Get all PaySlips complete'));
  }

  save() {
    try {
      this.error = '';
      this.paySlipService.save(this.paySlip)
        .subscribe(result => {
          if (result.id > 0) {
            this.paySlip = result;
          }
          else {
            this.error = Constants.saveFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }

  }

  savePeriodPay() {
    try {
      this.error = '';
      this.employeeService.savePeriodPay(this.paySlip.periode)
      .subscribe((data: PaySlip[]) => {
        this.paySlips = data;
        console.log(this.paySlips);
      },
      error => console.log(error),
      () => console.log('Get all PaySlips complete'));
    }
    catch (e) {
      console.log(e);
    }

  }

  savePeriodPayByPaiementMode() {
    try {
      this.error = '';
      this.employeeService.savePeriodPayByPaiementMode(this.paySlip)
      .subscribe((data: PaySlip[]) => {
        this.paySlips = data;
        console.log(this.paySlips);
      },
      error => console.log(error),
      () => console.log('Get all PaySlips complete'));
    }
    catch (e) {
      console.log(e);
    }

  }

  delete() {
    try {
      this.error = '';
      this.paySlipService.delete(this.paySlip)
        .subscribe(result => {
          if (result) {

          }
          else {
            this.error = Constants.deleteFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  public printPaySlip() {
    this.reportName=null;
    this.paySlip.employee = this.employee;
    this.printLabel=Constants.GENERATION_ETAT;
    this.employeeService.printPaySlip(this.paySlip)
    .subscribe((data: string) => {
      this.reportName = data;
      this.printLabel=Constants.GENERER_ETAT;
    },
    error => console.log(error),
    () => console.log('Get print paySlip'));
  }

}
