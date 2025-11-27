import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PaySlip } from '../../models/grh/paySlip';
import { Periode } from '../../models/grh/periode';
import { Employee } from '../../models/grh/employee';
import { User } from '../../models/User';
import {EmployeeService } from '../../services/grh/employee.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-grh-generate-report-recapitulatif-vir-salaire-employes',
  templateUrl: '../../pages/grh/grhGenerateReportRecapitulatifVirSalaireEmployes.html',
  providers: [EmployeeService, Constants]
})

export class GrhGenerateReportRecapitulatifVirSalaireEmployes implements OnInit, OnDestroy {

  public paySlip: PaySlip = new PaySlip();
  public selectedPaySlip: PaySlip;
  public employee: Employee;

  public reportName: string;
  public printLabel:string= 'Générer l\'état';

  public error: String = '';
  public user: User;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private employeeService: EmployeeService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.employee = new Employee();
    this.employee.user = new User();
  }
  ngOnDestroy() {
    this.error = null;
    this.selectedPaySlip = null;
    this.paySlip = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));

    if (this.user == null) {
      this.user = new User();
    }

    this.paySlip.periode = new Periode();

  }

  public initParameters() {
    this.paySlip = new PaySlip();
    this.paySlip.periode = new Periode();

    this.reportName=null;
    this.printLabel=Constants.GENERER_ETAT;
  }

  public printRecapitulatifVirementSalaireParEmployee() {
    this.reportName=null;
    this.printLabel=Constants.GENERATION_ETAT;

    this.employeeService.printRecapitulatifVirementSalaireParEmployee(this.paySlip.periode)
    .subscribe((data: string) => {
      this.reportName = data;
      this.printLabel=Constants.GENERER_ETAT;
    },
    error => console.log(error),
    () => console.log('Print RecapitulatifVirementSalaireParEmployee complete'));
  }

}
